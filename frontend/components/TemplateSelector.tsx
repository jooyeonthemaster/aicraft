'use client';

/**
 * ✨ Luxury Template Selector - Rolex-Inspired
 * 5가지 요식업 컨셉 선택 UI
 * 프로덕션 레벨 디자인
 */

import { IndustryType, UITheme } from '@/types/templates';
import { industryMetadata } from '@/lib/templates';
import ThemePreview from './ThemePreview';

interface TemplateSelectorProps {
  selectedIndustry?: IndustryType;
  selectedTheme?: UITheme;
  onIndustrySelect: (industry: IndustryType) => void;
  onThemeSelect: (theme: UITheme) => void;
  showThemeSelection?: boolean;
}

const themeData: Record<UITheme, { name: string; description: string; gradient: string }> = {
  modern: { 
    name: '모던', 
    description: '세련되고 트렌디한 디자인',
    gradient: 'from-teal-500 to-cyan-500'
  },
  classic: { 
    name: '클래식', 
    description: '전통적이고 고급스러운 느낌',
    gradient: 'from-amber-600 to-orange-600'
  },
  minimal: { 
    name: '미니멀', 
    description: '깔끔하고 심플한 스타일',
    gradient: 'from-slate-700 to-slate-900'
  }
};

export default function TemplateSelector({
  selectedIndustry,
  selectedTheme,
  onIndustrySelect,
  onThemeSelect,
  showThemeSelection = false
}: TemplateSelectorProps) {
  const industries: IndustryType[] = [
    'fine-dining',
    'casual-dining',
    'cafe-brunch',
    'fast-casual',
    'ethnic-dining'
  ];
  
  const themes: UITheme[] = ['modern', 'classic', 'minimal'];

  return (
    <div className="animate-fadeIn">
      {/* ✨ Industry Selection */}
      {!showThemeSelection && (
      <div>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            템플릿 선택
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            5가지 요식업 컨셉 중 비즈니스에 가장 적합한 스타일을 선택하세요
          </p>
        </div>

        {/* Industry Cards Grid - 5개 한 줄 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {industries.map((industry) => {
            const metadata = industryMetadata[industry];
            const isSelected = selectedIndustry === industry;

            return (
              <button
                key={industry}
                onClick={() => onIndustrySelect(industry)}
                className={`
                  group relative p-6 rounded-xl text-center transition-all duration-300
                  border-2 transform hover:scale-105 hover:-translate-y-2
                  ${isSelected 
                    ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-2xl scale-105' 
                    : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-xl'
                  }
                `}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-scaleIn">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4
                  transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-xl scale-110' 
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-teal-100 group-hover:to-teal-200'
                  }
                `}>
                  <span className={`text-3xl ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {metadata.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className={`text-lg font-bold ${isSelected ? 'text-teal-900' : 'text-slate-900'}`}>
                    {metadata.title}
                  </h3>
                  <p className={`text-xs font-semibold ${isSelected ? 'text-teal-600' : 'text-slate-500'}`}>
                    {metadata.subtitle}
                  </p>
                  <p className={`text-xs leading-relaxed min-h-[40px] ${isSelected ? 'text-teal-700' : 'text-slate-600'}`}>
                    {metadata.description}
                  </p>

                  {/* Use Cases - Compact */}
                  <div className="flex flex-wrap gap-1.5 pt-2 justify-center">
                    {metadata.useCases.slice(0, 2).map((useCase, i) => (
                      <span
                        key={i}
                        className={`
                          text-[10px] px-2 py-1 rounded-full font-medium transition-colors
                          ${isSelected 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600'
                          }
                        `}
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`
                  absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300
                  ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      )}

      {/* ✨ Theme Selection */}
      {showThemeSelection && selectedIndustry && (
        <div className="animate-fadeIn">
          {/* Selected Industry Summary */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-teal-600 mb-0.5">선택된 컨셉</p>
                <p className="text-lg font-bold text-teal-900">
                  {industryMetadata[selectedIndustry].icon} {industryMetadata[selectedIndustry].title}
                </p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
              UI 테마 선택
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {industryMetadata[selectedIndustry].title} 앱의 분위기와 스타일을 결정할 테마를 선택하세요
            </p>
          </div>

          {/* Theme Cards Grid - 3개 넓게 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {themes.map((theme) => {
              const themeInfo = themeData[theme];
              const isSelected = selectedTheme === theme;

              return (
                <button
                  key={theme}
                  onClick={() => onThemeSelect(theme)}
                  className={`
                    group relative p-8 rounded-2xl text-center transition-all duration-300
                    border-2 transform hover:scale-105 hover:-translate-y-2
                    ${isSelected 
                      ? 'border-teal-500 bg-white shadow-2xl scale-105' 
                      : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-xl'
                    }
                  `}
                >
                  {/* Selection Check */}
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-scaleIn">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Theme Preview - 실제 테마 스타일 임베드 */}
                  <div className="mb-6">
                    <ThemePreview theme={theme} isSelected={isSelected} />
                  </div>

                  {/* Theme Info */}
                  <h4 className={`text-2xl font-bold mb-3 ${isSelected ? 'text-teal-900' : 'text-slate-900'}`}>
                    {themeInfo.name}
                  </h4>
                  <p className={`text-sm ${isSelected ? 'text-teal-600' : 'text-slate-500'}`}>
                    {themeInfo.description}
                  </p>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 text-sm font-bold rounded-full inline-block">
                      ✓ 선택됨
                    </div>
                  )}
                </button>
              );
          })}
        </div>
        </div>
      )}
    </div>
  );
}
