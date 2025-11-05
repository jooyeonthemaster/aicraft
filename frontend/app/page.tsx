'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import CodePreview from '@/components/CodePreview';

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState('');
  const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL || 'http://localhost:8787';

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">AI Builder Platform</h1>
          <p className="text-blue-100 mt-1">일해라컴퍼니 - AI로 AI 앱 만들기</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chat Interface */}
        <div className="w-1/3 border-r border-gray-700">
          <ChatInterface onCodeGenerated={setGeneratedCode} />
        </div>

        {/* Right: Code Preview */}
        <div className="flex-1">
          <CodePreview code={generatedCode} proxyUrl={proxyUrl} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center p-4 border-t border-gray-700">
        <p className="text-sm">
          Powered by Claude AI • No API keys required • Deploy in seconds
        </p>
      </footer>
    </div>
  );
}
