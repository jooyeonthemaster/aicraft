'use client';

/**
 * 코드 수정 채팅 인터페이스
 * AI와 대화하며 반복적으로 코드를 개선
 */

import { useState, useRef, useEffect } from 'react';
import { RefinementMessage } from '@/types/templates';

interface RefinementChatProps {
  onRefineRequest: (message: string) => void;
  messages: RefinementMessage[];
  isRefining: boolean;
}

export default function RefinementChat({
  onRefineRequest,
  messages,
  isRefining
}: RefinementChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 전송
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isRefining) return;

    onRefineRequest(input.trim());
    setInput('');
  };

  // 빠른 명령어
  const quickCommands = [
    { label: '색상 변경', command: '주 색상을 더 밝게 바꿔줘' },
    { label: '폰트 크게', command: '폰트 크기를 전체적으로 20% 크게 해줘' },
    { label: '애니메이션', command: '카드가 나타날 때 부드러운 페이드인 효과 넣어줘' },
    { label: '버튼 개선', command: '버튼을 더 눈에 띄게 만들어줘' },
    { label: '레이아웃', command: '레이아웃을 2열로 변경해줘' },
    { label: '반응형', command: '모바일에서 더 잘 보이게 최적화해줘' }
  ];

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <span className="text-2xl mr-2">💬</span>
          AI 코드 수정
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          대화하며 앱을 계속 개선하세요
        </p>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-sm text-gray-600 mb-4">
              AI와 대화하며 앱을 개선하세요
            </p>
            
            {/* 빠른 명령어 */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 mb-2">빠른 명령어:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickCommands.map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(cmd.command)}
                    className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900 border border-gray-200'
              }`}
            >
              {/* 아이콘 */}
              <div className={`text-xs mb-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.role === 'user' ? '👤 You' : '🤖 AI'}
              </div>
              
              {/* 메시지 */}
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {/* 시간 */}
              <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                {new Date(message.timestamp).toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}

        {/* 로딩 */}
        {isRefining && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200" />
                </div>
                <span className="text-sm text-gray-600">코드 수정 중...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 빠른 명령어 (메시지가 있을 때만) */}
          {messages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {quickCommands.slice(0, 3).map((cmd, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInput(cmd.command)}
                  className="px-2 py-1 text-xs bg-white border border-gray-300 hover:border-purple-400 rounded-md text-gray-700 transition-colors"
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          )}

          {/* 입력창 */}
          <div className="flex space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="예: 버튼을 더 크게 만들어줘"
              rows={2}
              disabled={isRefining}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || isRefining}
              className={`px-4 rounded-xl font-semibold transition-all ${
                input.trim() && !isRefining
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isRefining ? '⏳' : '전송'}
            </button>
          </div>

          {/* 안내 */}
          <p className="text-xs text-gray-500 text-center">
            💡 Shift + Enter로 줄바꿈, Enter로 전송
          </p>
        </form>
      </div>

      {/* 애니메이션 */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}


