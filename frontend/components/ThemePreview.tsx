'use client';

/**
 * ✨ Theme Preview Component - Production Level
 * 실제 앱 UI를 축소판으로 정교하게 렌더링
 */

import { UITheme } from '@/types/templates';

interface ThemePreviewProps {
  theme: UITheme;
  isSelected: boolean;
}

export default function ThemePreview({ theme, isSelected }: ThemePreviewProps) {
  // 테마별 완전한 스타일 시스템
  const themeStyles = {
    modern: {
      // 배경 & 표면
      pageBg: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDFA 100%)',
      headerBg: 'linear-gradient(90deg, #14B8A6 0%, #06B6D4 100%)',
      cardBg: '#FFFFFF',
      surfaceBg: '#F8FAFC',
      
      // 색상
      primary: '#14B8A6',
      primaryDark: '#0D9488',
      secondary: '#06B6D4',
      text: '#1E293B',
      textLight: '#64748B',
      border: '#E2E8F0',
      
      // 버튼
      buttonBg: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
      buttonText: '#FFFFFF',
      buttonShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
      
      // 카드
      cardShadow: '0 4px 6px rgba(20, 184, 166, 0.08)',
      cardBorder: '1px solid #E2E8F0',
      cardRadius: '0.75rem',
      
      // 타이포그래피
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontWeight: '600',
      
      // 기타
      accentColor: '#5EEAD4',
      highlightBg: 'rgba(20, 184, 166, 0.1)'
    },
    classic: {
      // 배경 & 표면
      pageBg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
      headerBg: 'linear-gradient(90deg, #92400E 0%, #B45309 100%)',
      cardBg: '#FFFAF0',
      surfaceBg: '#FEF3C7',
      
      // 색상
      primary: '#92400E',
      primaryDark: '#78350F',
      secondary: '#D97706',
      text: '#78350F',
      textLight: '#92400E',
      border: '#FDE68A',
      
      // 버튼
      buttonBg: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      buttonText: '#FFFFFF',
      buttonShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
      
      // 카드
      cardShadow: '0 2px 8px rgba(146, 64, 14, 0.12)',
      cardBorder: '2px solid #FDE68A',
      cardRadius: '0.5rem',
      
      // 타이포그래피
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: '600',
      
      // 기타
      accentColor: '#FBBF24',
      highlightBg: 'rgba(217, 119, 6, 0.1)'
    },
    minimal: {
      // 배경 & 표면
      pageBg: '#FFFFFF',
      headerBg: '#0F172A',
      cardBg: '#FFFFFF',
      surfaceBg: '#FAFAFA',
      
      // 색상
      primary: '#0F172A',
      primaryDark: '#1E293B',
      secondary: '#64748B',
      text: '#0F172A',
      textLight: '#64748B',
      border: '#E2E8F0',
      
      // 버튼
      buttonBg: '#0F172A',
      buttonText: '#FFFFFF',
      buttonShadow: '0 2px 4px rgba(15, 23, 42, 0.2)',
      
      // 카드
      cardShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      cardBorder: '1px solid #E2E8F0',
      cardRadius: '0.5rem',
      
      // 타이포그래피
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontWeight: '500',
      
      // 기타
      accentColor: '#94A3B8',
      highlightBg: 'rgba(15, 23, 42, 0.05)'
    }
  };

  const s = themeStyles[theme];

  return (
    <div 
      className="w-full h-40 rounded-xl overflow-hidden relative border-2"
      style={{
        background: s.pageBg,
        borderColor: isSelected ? s.primary : 'transparent',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? s.buttonShadow : 'none'
      }}
    >
      {/* 실제 앱 UI 축소판 */}
      <div className="w-full h-full flex flex-col" style={{ fontFamily: s.fontFamily }}>
        
        {/* Mini Header - 실제 앱 헤더 */}
        <div 
          className="px-3 py-2 flex items-center justify-between"
          style={{ 
            background: s.headerBg,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div className="flex items-center space-x-1.5">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <span className="text-[10px]">🍽️</span>
            </div>
            <div>
              <div 
                className="text-[9px] font-bold"
                style={{ color: s.buttonText, fontWeight: s.fontWeight }}
              >
                Restaurant AI
              </div>
            </div>
          </div>
          <div 
            className="text-[7px] px-1.5 py-0.5 rounded-full font-semibold"
            style={{ 
              background: 'rgba(255,255,255,0.2)',
              color: s.buttonText
            }}
          >
            AI
          </div>
        </div>

        {/* Mini Content Area */}
        <div className="flex-1 p-2 space-y-1.5">
          
          {/* Input Section */}
          <div 
            className="rounded p-2"
            style={{ 
              background: s.cardBg,
              boxShadow: s.cardShadow,
              border: s.cardBorder,
              borderRadius: s.cardRadius
            }}
          >
            <div 
              className="text-[7px] mb-1 font-semibold"
              style={{ color: s.text, fontWeight: s.fontWeight }}
            >
              선호도 입력
            </div>
            <div 
              className="rounded px-2 py-1 text-[6px]"
              style={{ 
                border: `1px solid ${s.border}`,
                color: s.textLight,
                background: s.surfaceBg,
                borderRadius: `calc(${s.cardRadius} - 0.1rem)`
              }}
            >
              알러지, 예산...
            </div>
          </div>

          {/* Action Button - div로 변경 (중첩 button 방지) */}
          <div 
            className="w-full py-1.5 text-[8px] font-bold rounded text-center cursor-pointer"
            style={{ 
              background: s.buttonBg,
              color: s.buttonText,
              boxShadow: s.buttonShadow,
              borderRadius: s.cardRadius,
              fontWeight: s.fontWeight
            }}
          >
            AI 추천받기
          </div>

          {/* Result Cards - 2개 미니 카드 */}
          <div className="flex space-x-1.5">
            {[
              { name: '메뉴 A', price: '12,000원' },
              { name: '메뉴 B', price: '15,000원' }
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 rounded p-1.5 transition-transform hover:scale-105"
                style={{
                  background: s.cardBg,
                  boxShadow: s.cardShadow,
                  border: s.cardBorder,
                  borderRadius: s.cardRadius
                }}
              >
                {/* Mini Image */}
                <div 
                  className="w-full h-8 rounded mb-1"
                  style={{ 
                    background: s.highlightBg,
                    borderRadius: `calc(${s.cardRadius} - 0.15rem)`
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[10px] opacity-50">🍽️</span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div 
                  className="text-[7px] font-bold mb-0.5"
                  style={{ color: s.text, fontWeight: s.fontWeight }}
                >
                  {item.name}
                </div>
                <div 
                  className="text-[6px]"
                  style={{ color: s.textLight }}
                >
                  {item.price}
                </div>
                
                {/* Mini Badge */}
                <div 
                  className="inline-block text-[5px] px-1 py-0.5 rounded-full mt-1"
                  style={{ 
                    background: s.highlightBg,
                    color: s.primary
                  }}
                >
                  추천
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Footer */}
        <div 
          className="px-2 py-1 text-center border-t"
          style={{ 
            borderColor: s.border,
            background: s.surfaceBg
          }}
        >
          <div 
            className="text-[6px]"
            style={{ color: s.textLight }}
          >
            Powered by AI
          </div>
        </div>
      </div>

      {/* Selection Overlay */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-teal-500 rounded-xl pointer-events-none">
          <div className="absolute top-2 right-2">
            <div className="px-2 py-0.5 bg-teal-500 text-white text-[8px] font-bold rounded-full shadow-lg">
              LIVE PREVIEW
            </div>
          </div>
        </div>
      )}

      {/* Hover Overlay (미선택 시 약간 어둡게) */}
      <div 
        className={`absolute inset-0 bg-black/5 backdrop-blur-[0.5px] transition-opacity duration-300 pointer-events-none ${
          isSelected ? 'opacity-0' : 'opacity-100 hover:opacity-0'
        }`}
      />
    </div>
  );
}
