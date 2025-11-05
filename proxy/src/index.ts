/**
 * AI Proxy Server for 일해라컴퍼니
 *
 * This Cloudflare Worker acts as a proxy between deployed apps and Claude API.
 * - Hides API keys from client-side code
 * - Implements rate limiting
 * - Provides usage analytics
 */

interface Env {
  ANTHROPIC_KEY: string;
  RATE_LIMIT?: KVNamespace;
}

interface ChatRequest {
  message: string;
  model?: string;
  max_tokens?: number;
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
          version: '1.0.0',
          endpoints: {
            '/chat': 'POST - Chat with Claude AI',
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

    return new Response('Not found', {
      status: 404,
      headers: CORS_HEADERS
    });
  }
};

async function handleChat(request: Request, env: Env): Promise<Response> {
  try {
    // Check API key
    if (!env.ANTHROPIC_KEY) {
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
    const { message, model = 'claude-sonnet-4-20250514', max_tokens = 1024 } = body;

    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Call Claude API
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await anthropicResponse.json();

    return Response.json(data, { headers: CORS_HEADERS });
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
