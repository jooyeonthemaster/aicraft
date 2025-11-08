'use client';

/**
 * ✨ Luxury Loading Screen - Rolex-Inspired
 * 프로덕션 레벨의 고급스러운 로딩 화면
 * - 다양한 메시지 로테이션
 * - 서비스 소개
 * - 프로그레스 인디케이터
 */

import { useState, useEffect } from 'react';

interface LuxuryLoadingScreenProps {
  isLoading: boolean;
  message?: string;
}

const loadingMessages = [
  {
    icon: '🎨',
    title: 'AI가 디자인을 구상하고 있어요',
    subtitle: 'Gemini Pro가 최적의 UI/UX를 설계중입니다'
  },
  {
    icon: '⚡',
    title: '코드를 생성하고 있어요',
    subtitle: '64,000 토큰의 최고 품질 코드를 작성중입니다'
  },
  {
    icon: '🎯',
    title: '템플릿을 최적화하고 있어요',
    subtitle: '업종 특화 로직을 적용중입니다'
  },
  {
    icon: '💎',
    title: '고급스러운 스타일을 적용중이에요',
    subtitle: 'Rolex-inspired 디자인 시스템을 구현중입니다'
  },
  {
    icon: '🚀',
    title: '마지막 마무리 작업중이에요',
    subtitle: '곧 완성됩니다!'
  }
];

const serviceIntros = [
  '💡 lunus는 AI 기반 노코드 앱 빌더입니다',
  '🎨 5가지 요식업 컨셉과 3가지 테마를 제공합니다',
  '💬 채팅으로 무제한 코드 수정이 가능합니다',
  '📚 모든 변경사항은 자동으로 버전 관리됩니다',
  '⚡ 평균 2-3분이면 프로덕션 레벨의 앱이 완성됩니다',
  '🌟 최대 5분까지 소요될 수 있습니다'
];

export default function LuxuryLoadingScreen({ isLoading, message }: LuxuryLoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentIntroIndex, setCurrentIntroIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentMessageIndex(0);
      setCurrentIntroIndex(0);
      setProgress(0);
      return;
    }

    // 메시지 로테이션 (5초마다)
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 5000);

    // 서비스 소개 로테이션 (3초마다)
    const introInterval = setInterval(() => {
      setCurrentIntroIndex((prev) => (prev + 1) % serviceIntros.length);
    }, 3000);

    // 프로그레스 시뮬레이션 (부드럽게)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95; // 95%에서 멈춤 (실제 완료 시 100%로)
        return prev + Math.random() * 2;
      });
    }, 200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(introInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const currentMessage = loadingMessages[currentMessageIndex];
  const currentIntro = serviceIntros[currentIntroIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary-teal) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-8 text-center">
        {/* Logo */}
        <div className="mb-8 animate-scaleIn">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-xl mb-4">
            <span className="text-4xl">🌙</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">lunus</h1>
          <p className="text-sm text-slate-500 mt-1">AI Restaurant App Builder</p>
        </div>

        {/* Elegant Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
            <span className="text-4xl">
              {currentMessage.icon}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{Math.round(progress)}% 완료</p>
        </div>

        {/* Main Message */}
        <div className="mb-8 min-h-[80px]">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 animate-fadeIn">
            {message || currentMessage.title}
          </h2>
          <p className="text-slate-600 animate-fadeIn">
            {currentMessage.subtitle}
          </p>
        </div>

        {/* Service Intro Carousel */}
        <div className="relative h-12 overflow-hidden">
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
            key={currentIntroIndex}
          >
            <p className="text-sm text-slate-500 animate-slideIn">
              {currentIntro}
            </p>
          </div>
        </div>

        {/* Time Estimate */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span>⏱️</span>
              <span>평균 2-3분 소요</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>최대 5분</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🎯</span>
              <span>최고 품질 보장</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-teal-500 opacity-20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-teal-500 opacity-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-teal-500 opacity-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-teal-500 opacity-20" />
    </div>
  );
}

