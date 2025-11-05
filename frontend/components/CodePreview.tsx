'use client';

import { Sandpack } from '@codesandbox/sandpack-react';
import { useState } from 'react';

interface CodePreviewProps {
  code: string;
  proxyUrl: string;
}

export default function CodePreview({ code, proxyUrl }: CodePreviewProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  // Inject proxy URL into the code
  const proxyHelperCode = `
// AI Proxy Helper - 일해라컴퍼니
const AI_PROXY_URL = '${proxyUrl}';

export async function chatWithAI(message) {
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
`;

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
      <div className="flex items-center justify-center h-full bg-gray-950 text-gray-400">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <p>왼쪽에서 앱을 생성하면 여기에 실시간으로 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Header with Deploy Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">실시간 프리뷰</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            {isDeploying ? '배포 중...' : '🚀 배포하기'}
          </button>
          {deployedUrl && (
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔗 열기
            </a>
          )}
        </div>
      </div>

      {/* Sandpack Preview */}
      <div className="flex-1 overflow-hidden">
        <Sandpack
          template="react"
          theme="dark"
          files={{
            '/App.js': code,
            '/proxy.js': proxyHelperCode
          }}
          options={{
            showNavigator: true,
            showTabs: true,
            showLineNumbers: true,
            editorHeight: '100%',
            externalResources: [
              'https://cdn.tailwindcss.com'
            ]
          }}
          customSetup={{
            dependencies: {
              'react': '^18.0.0',
              'react-dom': '^18.0.0'
            }
          }}
        />
      </div>
    </div>
  );
}
