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

type Step = 'select' | 'upload' | 'input' | 'preview';

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
    if (currentStep === 'select' && selectedIndustry && selectedTheme) {
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
    else if (currentStep === 'upload') setCurrentStep('select');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">lunus</h1>
              <p className="text-xs sm:text-sm text-gray-600">AI 앱 빌더</p>
            </div>
            <div className="text-2xl sm:text-3xl">🌙</div>
          </div>
        </div>
      </header>

      {/* 진행 상태 바 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[
              { key: 'select', label: '템플릿', icon: '📋' },
              { key: 'upload', label: '데이터', icon: '📁' },
              { key: 'input', label: '설정', icon: '⚙️' },
              { key: 'preview', label: '완성', icon: '🎉' }
            ].map((step, index) => {
              const isActive = step.key === currentStep;
              const isCompleted = 
                (step.key === 'select' && selectedIndustry && selectedTheme) ||
                (step.key === 'upload' && currentStep !== 'select') || // 데이터 단계는 선택사항이므로 지나갔으면 완료
                (step.key === 'input' && businessInfo && appSettings) ||
                (step.key === 'preview' && generatedCode);

              return (
                <div key={step.key} className="flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-lg
                      transition-all
                      ${isActive 
                        ? 'bg-blue-500 text-white ring-4 ring-blue-100' 
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}>
                      {isCompleted ? '✓' : step.icon}
                    </div>
                    <span className={`
                      text-xs mt-1 font-medium
                      ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                    `}>
                      {step.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`
                      h-0.5 mt-5 -mx-2
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-800 font-medium">❌ {error}</p>
            </div>
          )}

          {/* 1단계: 템플릿 선택 */}
          {currentStep === 'select' && (
            <div className="space-y-6 animate-fadeIn">
              <TemplateSelector
                selectedIndustry={selectedIndustry}
                selectedTheme={selectedTheme}
                onIndustrySelect={handleIndustrySelect}
                onThemeSelect={handleThemeSelect}
              />

              {selectedIndustry && selectedTheme && (
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  다음 단계 →
                </button>
              )}
            </div>
          )}

          {/* 2단계: 데이터 입력 (파일 또는 텍스트) */}
          {currentStep === 'upload' && currentTemplate && selectedIndustry && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">데이터 입력</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {currentTemplate.name}에 사용할 데이터를 입력하세요 (선택사항)
                </p>
              </div>

              <DataInput
                schema={currentTemplate.dataSchema.fields}
                onDataReady={handleDataReady}
                onError={(err) => setError(err)}
                templateName={currentTemplate.name}
                industry={selectedIndustry}
              />

              <div className="flex space-x-3">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  ← 이전
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  다음 →
                </button>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-600">
                  💡 데이터를 입력하지 않아도 다음 단계로 진행할 수 있습니다. 
                  데이터가 없으면 일반적인 AI 앱이 생성됩니다.
                </p>
              </div>
            </div>
          )}

          {/* 3단계: 업체 정보 및 앱 설정 */}
          {currentStep === 'input' && currentTemplate && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">업체 정보 및 앱 설정</h2>
                <p className="text-sm text-gray-600 mb-4">
                  생성될 AI 앱의 정보를 입력하세요
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

          {/* 4단계: 프리뷰 + 반복 수정 */}
          {currentStep === 'preview' && generatedCode && (
            <div className="space-y-6 animate-fadeIn">
              {/* 헤더 */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">완성! 🎉</h2>
                  <p className="text-sm text-gray-600">
                    AI 앱이 생성되었습니다. 채팅으로 계속 개선할 수 있어요!
                  </p>
                </div>
                <button
                  onClick={() => setShowVersionHistory(!showVersionHistory)}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-semibold"
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
              <div className="flex space-x-3">
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
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  🔄 새로운 앱 만들기
                </button>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
                <p className="text-sm text-gray-800 font-semibold mb-2">
                  💡 <strong>AI와 대화하며 앱을 계속 개선하세요!</strong>
                </p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 우측 채팅창에서 수정 요청 (예: "버튼 색상 빨간색으로")</li>
                  <li>• 실시간으로 코드 업데이트 및 프리뷰 반영</li>
                  <li>• 버전 히스토리로 이전 버전 복구 가능</li>
                  <li>• 무제한 수정 가능 (최대 토큰으로 최고 품질 보장)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* 애니메이션 스타일 */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
