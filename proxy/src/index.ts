/**
 * AI Proxy Server for 일해라컴퍼니
 *
 * This Cloudflare Worker acts as a proxy between deployed apps and Gemini API.
 * - Hides API keys from client-side code
 * - Implements rate limiting
 * - Provides usage analytics
 */

interface Env {
  GEMINI_KEY: string;
  RATE_LIMIT?: KVNamespace;
  DEPLOYMENTS: KVNamespace;
}

interface ChatRequest {
  message: string;
  model?: string;
  max_tokens?: number;
}

interface DeployRequest {
  code: string;
  projectId?: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const RATE_LIMIT_PER_HOUR = 10; // Free tier: 10 requests per hour per IP

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/' || url.pathname === '/health') {
      return Response.json(
        {
          status: 'ok',
          service: 'ai-proxy',
          ai: 'Gemini',
          version: '1.0.0',
          apiKeyConfigured: !!env.GEMINI_KEY,
          apiKeyLength: env.GEMINI_KEY?.length || 0,
          endpoints: {
            '/chat': 'POST - Chat with Gemini AI',
            '/health': 'GET - Health check'
          }
        },
        { headers: CORS_HEADERS }
      );
    }

    // Chat endpoint
    if (url.pathname === '/chat' && request.method === 'POST') {
      return handleChat(request, env);
    }

    // Deploy endpoint
    if (url.pathname === '/deploy' && request.method === 'POST') {
      return handleDeploy(request, env);
    }

    // Deployed app endpoint
    if (url.pathname.startsWith('/deployed/') && request.method === 'GET') {
      const projectId = url.pathname.split('/deployed/')[1];
      return handleGetDeployment(projectId, env);
    }

    return new Response('Not found', {
      status: 404,
      headers: CORS_HEADERS
    });
  }
};

/**
 * 배포 엔드포인트 - HTML 코드를 KV에 저장
 */
async function handleDeploy(request: Request, env: Env): Promise<Response> {
  try {
    const body: DeployRequest = await request.json();
    const { code } = body;

    if (!code) {
      return Response.json(
        { error: '코드가 필요합니다' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Generate unique project ID
    const projectId = generateId(10);

    // Create complete HTML with proxy helper
    const proxyUrl = new URL(request.url).origin;

    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated App - lunus</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel" data-type="module">
    const { useState, useEffect, useRef } = React;

    // AI Proxy helper
    const AI_PROXY_URL = '${proxyUrl}';

    async function chatWithAI(message) {
      try {
        const response = await fetch(AI_PROXY_URL + '/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            model: 'gemini-2.5-flash',
            max_tokens: 1024
          })
        });

        if (!response.ok) {
          throw new Error('API 요청 실패');
        }

        return await response.json();
      } catch (error) {
        console.error('AI API Error:', error);
        throw error;
      }
    }

    // User's generated code
    ${code}

    // Render
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;

    // Store in Cloudflare KV
    await env.DEPLOYMENTS.put(projectId, html, {
      metadata: {
        createdAt: new Date().toISOString(),
        size: html.length
      }
    });

    // Return deployment info
    const deploymentUrl = `${proxyUrl}/deployed/${projectId}`;

    return Response.json(
      {
        success: true,
        url: deploymentUrl,
        projectId,
        createdAt: new Date().toISOString()
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Deploy error:', error);
    return Response.json(
      {
        error: '배포 중 오류가 발생했습니다',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

/**
 * 배포된 앱 조회 엔드포인트 - KV에서 HTML 가져오기
 */
async function handleGetDeployment(projectId: string, env: Env): Promise<Response> {
  try {
    if (!projectId) {
      return new Response('Project ID is required', {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    // Get from KV
    const html = await env.DEPLOYMENTS.get(projectId);

    if (!html) {
      return new Response(`
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Not Found</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-xl text-gray-400 mb-2">배포된 앱을 찾을 수 없습니다</p>
    <p class="text-sm text-gray-500">프로젝트 ID: ${projectId}</p>
  </div>
</body>
</html>`, {
        status: 404,
        headers: {
          'Content-Type': 'text/html',
          ...CORS_HEADERS
        }
      });
    }

    // Return the stored HTML
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=31536000',
        ...CORS_HEADERS
      }
    });
  } catch (error) {
    console.error('Get deployment error:', error);
    return new Response('Internal server error', {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

/**
 * Generate random ID (nanoid alternative for Workers)
 */
function generateId(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  try {
    // Check API key
    if (!env.GEMINI_KEY) {
      return Response.json(
        { error: 'API key not configured' },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Rate limiting (optional - requires KV namespace)
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (env.RATE_LIMIT) {
      const rateLimitKey = `rate:${clientIP}`;
      const currentCount = await env.RATE_LIMIT.get(rateLimitKey);
      const count = currentCount ? parseInt(currentCount) : 0;

      if (count >= RATE_LIMIT_PER_HOUR) {
        return Response.json(
          {
            error: 'Rate limit exceeded',
            message: '시연 한도를 초과했습니다. 1시간 후 다시 시도해주세요.',
            limit: RATE_LIMIT_PER_HOUR,
            resetIn: 3600
          },
          { status: 429, headers: CORS_HEADERS }
        );
      }

      // Increment counter
      await env.RATE_LIMIT.put(
        rateLimitKey,
        (count + 1).toString(),
        { expirationTtl: 3600 } // 1 hour
      );
    }

    // Parse request
    const body: ChatRequest = await request.json();
    let { message, model = 'gemini-2.5-flash', max_tokens = 32000 } = body;

    // 시연용 최대 토큰 설정 (기본값 32000)
    // 최소 6000 tokens to avoid Gemini 2.5 thinking mode issues
    if (max_tokens < 6000) {
      max_tokens = 6000;
    }
    
    // 최대 32000으로 제한 (Flash 모델)
    if (max_tokens > 32000) {
      max_tokens = 32000;
    }

    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Call Gemini API using REST
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: max_tokens,
          responseMimeType: "application/json",
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await geminiResponse.json();

    // Transform Gemini response to Claude-like format for compatibility
    const transformed = {
      id: 'msg_' + Date.now(),
      type: 'message',
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated'
        }
      ],
      model: model,
      usage: {
        input_tokens: data.usageMetadata?.promptTokenCount || 0,
        output_tokens: data.usageMetadata?.candidatesTokenCount || 0
      }
    };

    return Response.json(transformed, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
