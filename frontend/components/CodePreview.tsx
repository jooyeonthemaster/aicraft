'use client';

import { SandpackProvider, SandpackPreview, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { useState } from 'react';

interface CodePreviewProps {
  code: string;
  proxyUrl: string;
}

export default function CodePreview({ code, proxyUrl }: CodePreviewProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 코드 다운로드
  const handleDownloadCode = () => {
    const blob = new Blob([completeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-app-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Inject proxy URL into the code (global function, no export)
  const proxyHelperCode = `// AI Proxy Helper - 일해라컴퍼니
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
}`;

  // Create complete HTML with Tailwind CDN, React, and user code
  const completeHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${proxyHelperCode}

    ${code}

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setDeployedUrl(data.url);
      alert(`배포 완료!\n\nURL: ${data.url}\n\n클립보드에 복사되었습니다.`);
      navigator.clipboard.writeText(data.url);
    } catch (error) {
      console.error('Deployment error:', error);
      alert(`배포 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (!code) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-gray-950 text-gray-400">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <p>앱을 생성하면 여기에 실시간으로 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 전체화면 모드 */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="h-full flex flex-col">
            {/* 전체화면 헤더 */}
            <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">실시간 프리뷰 (전체화면)</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {showCode ? '📱 프리뷰만' : '💻 코드 보기'}
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  ✕ 닫기
                </button>
              </div>
            </div>

            {/* 전체화면 프리뷰 */}
            <div className="flex-1">
              <SandpackProvider
                template="static"
                theme="dark"
                files={{
                  '/index.html': completeHtml
                }}
                options={{
                  autorun: true,
                  autoReload: true,
                  recompileMode: 'immediate'
                }}
              >
                <div className="flex h-full">
                  {showCode && (
                    <div className="w-1/2 h-full">
                      <SandpackCodeEditor showLineNumbers showTabs style={{ height: '100%' }} />
                    </div>
                  )}
                  <div className={showCode ? "w-1/2 h-full" : "w-full h-full"}>
                    <SandpackPreview
                      showNavigator={false}
                      showOpenInCodeSandbox={true}
                      showRefreshButton={true}
                      style={{ height: '100%' }}
                    />
                  </div>
                </div>
              </SandpackProvider>
            </div>
          </div>
        </div>
      )}

      {/* 일반 모드 */}
      <div className="flex flex-col bg-gray-950 rounded-xl overflow-hidden border border-gray-700">
        {/* Header with Deploy Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">실시간 프리뷰</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              🖥️ 전체화면
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              {showCode ? '📱 프리뷰' : '💻 코드'}
            </button>
            <button
              onClick={handleDownloadCode}
              className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              💾 다운로드
            </button>
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isDeploying ? '배포 중...' : '🚀 배포'}
            </button>
            {deployedUrl && (
              <a
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                🔗 열기
              </a>
            )}
          </div>
        </div>

        {/* Sandpack Preview - 높이 증가 */}
        <div className="min-h-[700px]">
          <SandpackProvider
            template="static"
            theme="dark"
            files={{
              '/index.html': completeHtml
            }}
            options={{
              autorun: true,
              autoReload: true,
              recompileMode: 'immediate'
            }}
          >
            <div className="flex" style={{ height: '700px' }}>
              {showCode && (
                <div className="w-1/2 h-full">
                  <SandpackCodeEditor showLineNumbers showTabs style={{ height: '100%' }} />
                </div>
              )}
              <div className={showCode ? "w-1/2 h-full" : "w-full h-full"}>
                <SandpackPreview
                  showNavigator={false}
                  showOpenInCodeSandbox={true}
                  showRefreshButton={true}
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </SandpackProvider>
        </div>
      </div>
    </>
  );
}
