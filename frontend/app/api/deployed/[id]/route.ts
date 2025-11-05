import { NextResponse } from 'next/server';

// This would typically fetch from R2/S3 in production
// For now, we'll redirect to the deploy endpoint
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In production, fetch from R2/S3
  // For demo, return a simple message
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Deployed App - ${id}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">배포된 앱</h1>
    <p class="text-gray-400 mb-2">프로젝트 ID: ${id}</p>
    <p class="text-sm text-gray-500">
      프로덕션 환경에서는 Cloudflare R2나 S3에서 실제 앱을 제공합니다.
    </p>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
