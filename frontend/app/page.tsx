'use client';

/**
 * 메인 페이지 - 템플릿 기반 AI 앱 빌더
 * 반응형 레이아웃 (모바일~PC 최적화)
 */

import { useState } from 'react';
import { IndustryType, UITheme, BusinessInfo, AppSettings, CodeVersion, RefinementMessage } from '@/types/templates';
import { getTemplate } from '@/lib/templates';
import { nanoid } from 'nanoid';
import TemplateSelector from '@/components/TemplateSelector';
import DataInput from '@/components/DataInput';
import AdvancedSettings from '@/components/AdvancedSettings';
import CodePreview from '@/components/CodePreview';
import RefinementChat from '@/components/RefinementChat';
import VersionHistory from '@/components/VersionHistory';
import Footer from '@/components/Footer';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

type Step = 'select' | 'theme' | 'upload' | 'input' | 'preview';

export default function Home() {
  // 상태 관리
  const [currentStep, setCurrentStep] = useState<Step>('select');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | undefined>();
  const [selectedTheme, setSelectedTheme] = useState<UITheme | undefined>();
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  
  // 반복 수정 관련 상태
  const [codeVersions, setCodeVersions] = useState<CodeVersion[]>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [refinementMessages, setRefinementMessages] = useState<RefinementMessage[]>([]);
  const [isRefining, setIsRefining] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // 프록시 URL
  const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api/proxy-chat` : '/api/proxy-chat');

  // 업종 선택
  const handleIndustrySelect = (industry: IndustryType) => {
    setSelectedIndustry(industry);
    setSelectedTheme(undefined);
    setUploadedData(null);
    setBusinessInfo(null);
    setAppSettings(null);
    setGeneratedCode('');
    setError('');
  };

  // 테마 선택
  const handleThemeSelect = (theme: UITheme) => {
    setSelectedTheme(theme);
  };

  // 다음 단계로
  const handleNext = () => {
    if (currentStep === 'select' && selectedIndustry) {
      setCurrentStep('theme');
    } else if (currentStep === 'theme' && selectedTheme) {
      setCurrentStep('upload');
    } else if (currentStep === 'upload') {
      // 데이터는 선택사항 - 데이터 있든 없든 진행 가능
      setCurrentStep('input');
    } else if (currentStep === 'input') {
      // 사용자 입력 없이도 생성 가능 (선택사항)
      setCurrentStep('preview');
    }
  };

  // 이전 단계로
  const handleBack = () => {
    if (currentStep === 'input') setCurrentStep('upload');
    else if (currentStep === 'upload') setCurrentStep('theme');
    else if (currentStep === 'theme') setCurrentStep('select');
    else if (currentStep === 'preview') setCurrentStep('input');
  };

  // 데이터 준비 완료 (파일 업로드 또는 텍스트 입력)
  const handleDataReady = (data: any[]) => {
    setUploadedData(data);
    setError('');
  };

  // 설정 제출 (업체 정보 + 앱 설정)
  const handleSettingsSubmit = async (business: BusinessInfo, app: AppSettings) => {
    setBusinessInfo(business);
    setAppSettings(app);
    setIsGenerating(true);
    setError('');

    try {
      if (!selectedIndustry || !selectedTheme) {
        throw new Error('템플릿이 선택되지 않았습니다');
      }

      const template = getTemplate(selectedIndustry);
      
      // AI 코드 생성 요청
      const response = await fetch('/api/generate-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: selectedIndustry,
          theme: selectedTheme,
          data: uploadedData || [],
          businessInfo: business,
          appSettings: app
        })
      });

      if (!response.ok) {
        throw new Error('코드 생성 실패');
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setGeneratedCode(result.code);
      
      // 초기 버전 저장
      const initialVersion: CodeVersion = {
        id: nanoid(10),
        code: result.code,
        timestamp: new Date(),
        userRequest: '초기 생성',
        changesSummary: 'AI 앱 최초 생성'
      };
      setCodeVersions([initialVersion]);
      setCurrentVersionIndex(0);
      setRefinementMessages([]);
      
      setCurrentStep('preview');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';
      setError(errorMessage);
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 코드 수정 요청
  const handleRefineRequest = async (message: string) => {
    setIsRefining(true);
    
    // 사용자 메시지 추가
    const userMessage: RefinementMessage = {
      id: nanoid(10),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    setRefinementMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/refine-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentCode: generatedCode,
          userRequest: message,
          conversationHistory: refinementMessages,
          businessInfo,
          appSettings,
          industry: selectedIndustry,
          theme: selectedTheme
        })
      });

      if (!response.ok) {
        throw new Error('코드 수정 실패');
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // AI 응답 메시지 추가
      const aiMessage: RefinementMessage = {
        id: nanoid(10),
        role: 'assistant',
        content: result.changesSummary || '코드를 수정했습니다!',
        timestamp: new Date(),
        codeVersionId: result.versionId
      };
      setRefinementMessages(prev => [...prev, aiMessage]);

      // 새 버전 저장
      const newVersion: CodeVersion = {
        id: result.versionId,
        code: result.code,
        timestamp: new Date(),
        userRequest: message,
        changesSummary: result.changesSummary
      };

      // 현재 버전이 최신이 아니면 이후 버전들 삭제
      const newVersions = currentVersionIndex < codeVersions.length - 1
        ? [...codeVersions.slice(0, currentVersionIndex + 1), newVersion]
        : [...codeVersions, newVersion];

      setCodeVersions(newVersions);
      setCurrentVersionIndex(newVersions.length - 1);
      setGeneratedCode(result.code);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';
      
      // 에러 메시지 추가
      const errorMsg: RefinementMessage = {
        id: nanoid(10),
        role: 'assistant',
        content: `❌ 오류: ${errorMessage}`,
        timestamp: new Date()
      };
      setRefinementMessages(prev => [...prev, errorMsg]);
      
      console.error('Refinement error:', err);
    } finally {
      setIsRefining(false);
    }
  };

  // 버전 선택 (되돌리기)
  const handleVersionSelect = (index: number) => {
    if (index >= 0 && index < codeVersions.length) {
      setCurrentVersionIndex(index);
      setGeneratedCode(codeVersions[index].code);
      
      // 메시지 추가
      const revertMessage: RefinementMessage = {
        id: nanoid(10),
        role: 'assistant',
        content: `✅ v${codeVersions.length - index} 버전으로 되돌렸습니다.`,
        timestamp: new Date()
      };
      setRefinementMessages(prev => [...prev, revertMessage]);
    }
  };

  // 현재 템플릿 가져오기
  const currentTemplate = selectedIndustry ? getTemplate(selectedIndustry) : null;

  return (
    <>
      {/* ✨ Luxury Loading Screen */}
      <LuxuryLoadingScreen isLoading={isGenerating || isRefining} />

      <div className="min-h-screen bg-white flex flex-col">
        {/* ✨ Rolex-Inspired Header */}
        <header className="bg-white border-b border-teal-100 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🌙</span>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold gradient-text tracking-tight">
                    lunus
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    AI Restaurant App Builder
                  </p>
                </div>
              </div>
              
              {/* Premium Badge */}
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200">
                <span className="text-sm font-semibold text-teal-700">Premium</span>
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        {/* ✨ Luxury Progress Indicator */}
        <div className="bg-gradient-to-r from-slate-50 to-teal-50 border-b border-teal-100">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
            <div className="relative flex items-center justify-between">
              {[
                { key: 'select', label: '컨셉', icon: '🌟', step: 1 },
                { key: 'theme', label: '테마', icon: '🎨', step: 2 },
                { key: 'upload', label: '데이터', icon: '📊', step: 3 },
                { key: 'input', label: '브랜딩', icon: '⚙️', step: 4 },
                { key: 'preview', label: '완성', icon: '🚀', step: 5 }
              ].map((step, index) => {
                const isActive = step.key === currentStep;
                const isCompleted = 
                  (step.key === 'select' && selectedIndustry) ||
                  (step.key === 'theme' && selectedTheme) ||
                  (step.key === 'upload' && (currentStep === 'input' || currentStep === 'preview')) ||
                  (step.key === 'input' && businessInfo && appSettings) ||
                  (step.key === 'preview' && generatedCode);

                return (
                  <div key={step.key} className="flex-1 relative">
                    <div className="flex flex-col items-center z-10 relative">
                      {/* Step Circle */}
                      <div className={`
                        w-14 h-14 rounded-full flex items-center justify-center text-xl
                        transition-all duration-300 transform
                        ${isActive 
                          ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-xl scale-110 ring-4 ring-teal-100' 
                          : isCompleted
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg'
                          : 'bg-white text-slate-400 border-2 border-slate-200'
                        }
                      `}>
                        {isCompleted && !isActive ? '✓' : step.icon}
                      </div>
                      
                      {/* Step Label */}
                      <span className={`
                        text-xs sm:text-sm mt-2 font-semibold transition-colors
                        ${isActive ? 'text-teal-700' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}
                      `}>
                        {step.label}
                      </span>
                      
                      {/* Step Number */}
                      <span className={`
                        text-[10px] mt-0.5 font-medium
                        ${isActive ? 'text-teal-600' : isCompleted ? 'text-emerald-500' : 'text-slate-300'}
                      `}>
                        Step {step.step}
                      </span>
                    </div>
                    
                    {/* Connector Line */}
                    {index < 4 && (
                      <div className="absolute top-7 left-1/2 w-full h-1 -z-10">
                        <div className="h-full bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              isCompleted ? 'bg-gradient-to-r from-emerald-500 to-teal-500 w-full' : 'w-0'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-800 font-medium">❌ {error}</p>
            </div>
          )}

          {/* 1단계: 업종 선택 */}
          {currentStep === 'select' && (
            <div className="space-y-4 animate-fadeIn">
              <TemplateSelector
                selectedIndustry={selectedIndustry}
                selectedTheme={undefined}
                onIndustrySelect={handleIndustrySelect}
                onThemeSelect={() => {}}
                showThemeSelection={false}
              />

              {selectedIndustry && (
                <div className="max-w-2xl mx-auto">
                  <button
                    onClick={handleNext}
                    className="w-full py-5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] btn-luxury relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>다음 단계로 진행</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2단계: 테마 선택 */}
          {currentStep === 'theme' && selectedIndustry && (
            <div className="space-y-4 animate-fadeIn">
              <TemplateSelector
                selectedIndustry={selectedIndustry}
                selectedTheme={selectedTheme}
                onIndustrySelect={() => {}}
                onThemeSelect={handleThemeSelect}
                showThemeSelection={true}
              />

              <div className="flex space-x-4 max-w-3xl mx-auto">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all border-2 border-slate-200 hover:border-slate-300"
                >
                  ← 이전 단계
                </button>
                {selectedTheme && (
                  <button
                    onClick={handleNext}
                    className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all btn-luxury"
                  >
                    다음 단계 →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 3단계: 데이터 입력 (파일 또는 텍스트) */}
          {currentStep === 'upload' && currentTemplate && selectedIndustry && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">데이터 입력</h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                  {currentTemplate.name}에 사용할 메뉴 데이터를 입력하세요 (선택사항)
                </p>
              </div>

              <DataInput
                schema={currentTemplate.dataSchema.fields}
                onDataReady={handleDataReady}
                onError={(err) => setError(err)}
                templateName={currentTemplate.name}
                industry={selectedIndustry}
              />

              <div className="flex space-x-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all border-2 border-slate-200 hover:border-slate-300"
                >
                  ← 이전 단계
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all btn-luxury"
                >
                  다음 단계 →
                </button>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-teal-200 rounded-xl p-5">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-sm font-semibold text-teal-900 mb-1">선택사항 안내</p>
                    <p className="text-xs text-teal-700 leading-relaxed">
                      데이터를 입력하지 않아도 다음 단계로 진행할 수 있습니다. 
                      데이터가 없으면 일반적인 AI 앱이 생성됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4단계: 업체 정보 및 앱 설정 */}
          {currentStep === 'input' && currentTemplate && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">업체 정보 및 브랜딩</h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                  생성될 AI 앱의 브랜드 정보와 설정을 입력하세요
                </p>
              </div>

              <AdvancedSettings
                industryName={currentTemplate.name}
                onSubmit={handleSettingsSubmit}
                isLoading={isGenerating}
              />

              <button
                onClick={handleBack}
                type="button"
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                ← 이전
              </button>
            </div>
          )}

          {/* 5단계: 프리뷰 + 반복 수정 */}
          {currentStep === 'preview' && generatedCode && (
            <div className="space-y-6 animate-fadeIn">
              {/* 헤더 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">완성!</h2>
                    <p className="text-sm sm:text-base text-slate-600">
                      AI 앱이 생성되었습니다. 채팅으로 계속 개선할 수 있어요!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVersionHistory(!showVersionHistory)}
                  className="px-5 py-2.5 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors text-sm font-semibold border-2 border-teal-200 hover:border-teal-300"
                >
                  {showVersionHistory ? '📚 히스토리 숨기기' : `📚 버전 ${codeVersions.length}개`}
                </button>
              </div>

              {/* 버전 히스토리 (토글) */}
              {showVersionHistory && (
                <VersionHistory
                  versions={codeVersions}
                  currentVersionIndex={currentVersionIndex}
                  onVersionSelect={handleVersionSelect}
                />
              )}

              {/* 프리뷰 + 채팅 레이아웃 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 프리뷰 (좌측 - 2/3) */}
                <div className="lg:col-span-2">
                  <CodePreview code={generatedCode} proxyUrl={proxyUrl} />
                </div>

                {/* 채팅 (우측 - 1/3) */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 h-[700px]">
                    <RefinementChat
                      onRefineRequest={handleRefineRequest}
                      messages={refinementMessages}
                      isRefining={isRefining}
                    />
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    if (confirm('새로운 앱을 만들면 현재 작업이 모두 초기화됩니다. 계속하시겠습니까?')) {
                      setCurrentStep('select');
                      setSelectedIndustry(undefined);
                      setSelectedTheme(undefined);
                      setUploadedData(null);
                      setBusinessInfo(null);
                      setAppSettings(null);
                      setGeneratedCode('');
                      setCodeVersions([]);
                      setCurrentVersionIndex(0);
                      setRefinementMessages([]);
                    }
                  }}
                  className="flex-1 py-4 bg-white text-teal-700 rounded-xl font-semibold border-2 border-teal-200 hover:bg-teal-50 transition-all shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>🔄</span>
                    <span>새로운 앱 만들기</span>
                  </span>
                </button>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-2 border-teal-300 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-teal-900 mb-2">
                      AI와 대화하며 앱을 계속 개선하세요!
                    </p>
                    <ul className="text-sm text-teal-700 space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>우측 채팅창에서 수정 요청 (예: "버튼 색상 빨간색으로")</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>실시간으로 코드 업데이트 및 프리뷰 반영</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>버전 히스토리로 이전 버전 복구 가능</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>무제한 수정 가능 (최대 토큰으로 최고 품질 보장)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 pt-3 border-t border-teal-200">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-teal-600">Premium Quality Service</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
