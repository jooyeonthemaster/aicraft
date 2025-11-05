import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// Simple in-memory storage for demo purposes
// In production, use R2, S3, or similar
const deployments = new Map<string, string>();

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: '코드가 필요합니다' },
        { status: 400 }
      );
    }

    // Generate unique ID
    const projectId = nanoid(10);

    // Create complete HTML with proxy helper
    const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL || 'http://localhost:8787';

    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated App - 일해라컴퍼니</title>
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

    // Proxy helper
    const AI_PROXY_URL = '${proxyUrl}';

    async function chatWithAI(message) {
      try {
        const response = await fetch(AI_PROXY_URL + '/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            model: 'claude-sonnet-4-20250514',
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

    // Store deployment (in production, upload to R2/S3)
    deployments.set(projectId, html);

    // In production, this would be your actual deployment URL
    // For now, we'll serve it through a local endpoint
    const deploymentUrl = `${request.headers.get('origin')}/api/deployed/${projectId}`;

    return NextResponse.json({
      url: deploymentUrl,
      projectId
    });
  } catch (error) {
    console.error('Deploy API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '배포 중 오류가 발생했습니다'
      },
      { status: 500 }
    );
  }
}

// Serve deployed apps
export async function GET(request: Request) {
  const url = new URL(request.url);
  const projectId = url.pathname.split('/').pop();

  if (!projectId || !deployments.has(projectId)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const html = deployments.get(projectId)!;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=31536000'
    }
  });
}
