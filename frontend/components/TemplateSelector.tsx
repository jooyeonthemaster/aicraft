'use client';

/**
 * 템플릿 선택 컴포넌트
 * 5가지 업종 템플릿을 선택할 수 있는 UI
 */

import { IndustryType, UITheme } from '@/types/templates';
import { industryMetadata } from '@/lib/templates';

interface TemplateSelectorProps {
  selectedIndustry?: IndustryType;
  selectedTheme?: UITheme;
  onIndustrySelect: (industry: IndustryType) => void;
  onThemeSelect: (theme: UITheme) => void;
}

const themeData: Record<UITheme, { name: string; description: string }> = {
  modern: { name: '모던', description: '세련되고 트렌디한 디자인' },
  classic: { name: '클래식', description: '전통적이고 고급스러운 느낌' },
  minimal: { name: '미니멀', description: '깔끔하고 심플한 스타일' }
};

export default function TemplateSelector({
  selectedIndustry,
  selectedTheme,
  onIndustrySelect,
  onThemeSelect
}: TemplateSelectorProps) {
  const industries: IndustryType[] = ['restaurant', 'realestate', 'medical', 'ecommerce', 'travel'];
  const themes: UITheme[] = ['modern', 'classic', 'minimal'];

  return (
    <div className="space-y-8">
      {/* 업종 선택 */}
      <div>
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">1. 업종 선택</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1">어떤 업종의 AI 앱을 만들까요?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => {
            const metadata = industryMetadata[industry];
            const isSelected = selectedIndustry === industry;

            return (
              <button
                key={industry}
                onClick={() => onIndustrySelect(industry)}
                className={`
                  relative p-6 rounded-2xl text-left transition-all
                  border-2 
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }
                `}
              >
                {/* 선택 표시 */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  {/* 아이콘 */}
                  <div className={`
                    text-4xl p-3 rounded-xl
                    ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-100'}
                  `}>
                    {metadata.title === '요식업' && '🍽️'}
                    {metadata.title === '부동산' && '🏠'}
                    {metadata.title === '의료' && '🏥'}
                    {metadata.title === '쇼핑몰' && '🛍️'}
                    {metadata.title === '여행' && '✈️'}
                  </div>

                  {/* 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`text-lg font-bold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {metadata.title}
                      </h4>
                      <span className={`text-sm px-2 py-0.5 rounded-full ${isSelected ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {metadata.subtitle}
                      </span>
                    </div>

                    <p className={`text-sm mb-3 ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                      {metadata.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {metadata.useCases.map((useCase, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-md ${
                            isSelected 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* UI 테마 선택 */}
      {selectedIndustry && (
        <div className="animate-fadeIn">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">2. UI 테마 선택</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">어떤 스타일의 디자인을 원하시나요?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((theme) => {
              const data = themeData[theme];
              const isSelected = selectedTheme === theme;

              return (
                <button
                  key={theme}
                  onClick={() => onThemeSelect(theme)}
                  className={`
                    relative p-5 rounded-xl text-left transition-all
                    border-2
                    ${isSelected 
                      ? 'border-purple-500 bg-purple-50 shadow-lg scale-[1.02]' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                >
                  {/* 선택 표시 */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    {/* 프리뷰 박스 */}
                    <div className={`
                      w-16 h-16 rounded-lg flex items-center justify-center
                      ${theme === 'modern' ? 'bg-gradient-to-br from-gray-900 to-gray-700' : ''}
                      ${theme === 'classic' ? 'bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300' : ''}
                      ${theme === 'minimal' ? 'bg-white border-2 border-gray-300' : ''}
                    `}>
                      <div className={`
                        w-8 h-8 rounded-md
                        ${theme === 'modern' ? 'bg-white' : ''}
                        ${theme === 'classic' ? 'bg-amber-600' : ''}
                        ${theme === 'minimal' ? 'bg-black' : ''}
                      `} />
                    </div>

                    {/* 정보 */}
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold mb-1 ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                        {data.name}
                      </h4>
                      <p className={`text-sm ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                        {data.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

