import { NextResponse } from 'next/server';

/**
 * 배포 API - Cloudflare Workers를 통해 KV에 저장
 * 
 * 기존: in-memory Map (서버 재시작 시 소실)
 * 새로운: Cloudflare KV (영구 저장)
 */
export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: '코드가 필요합니다' },
        { status: 400 }
      );
    }

    // Cloudflare Workers proxy URL
    const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL || 'http://127.0.0.1:8787';

    // Call Cloudflare Workers deploy endpoint
    const response = await fetch(`${proxyUrl}/deploy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '배포 실패');
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      url: result.url,
      projectId: result.projectId,
      createdAt: result.createdAt
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
