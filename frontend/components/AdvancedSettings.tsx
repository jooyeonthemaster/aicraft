'use client';

/**
 * 고급 설정 컴포넌트
 * 업체 정보 + 앱 설정 + AI 설정을 체계적으로 관리
 */

import { useState } from 'react';
import { BusinessInfo, AppSettings } from '@/types/templates';

interface AdvancedSettingsProps {
  industryName: string;
  onSubmit: (businessInfo: BusinessInfo, appSettings: AppSettings) => void;
  isLoading?: boolean;
}

export default function AdvancedSettings({
  industryName,
  onSubmit,
  isLoading = false
}: AdvancedSettingsProps) {
  const [activeTab, setActiveTab] = useState<'business' | 'app' | 'ai'>('business');
  
  // 업체 정보
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    ownerName: '',
    phone: '',
    address: '',
    hours: '09:00 - 22:00',
    description: '',
    features: [],
    logoEmoji: '🏪'
  });

  // 앱 설정
  const [appSettings, setAppSettings] = useState<AppSettings>({
    appTitle: '',
    welcomeMessage: '',
    primaryColor: '#3B82F6',
    aiCharacter: '친근함',
    recommendationCount: 3,
    additionalInstructions: ''
  });

  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 업체 정보 업데이트
  const updateBusinessInfo = (field: keyof BusinessInfo, value: any) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  // 앱 설정 업데이트
  const updateAppSettings = (field: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [field]: value }));
  };

  // 특징 추가
  const addFeature = () => {
    if (featureInput.trim()) {
      setBusinessInfo(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  // 특징 제거
  const removeFeature = (index: number) => {
    setBusinessInfo(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // 검증
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!businessInfo.businessName.trim()) {
      newErrors.businessName = '업체명은 필수입니다';
    }
    if (!businessInfo.phone.trim()) {
      newErrors.phone = '연락처는 필수입니다';
    }
    if (!businessInfo.address.trim()) {
      newErrors.address = '주소는 필수입니다';
    }
    if (!appSettings.appTitle.trim()) {
      newErrors.appTitle = '앱 제목은 필수입니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(businessInfo, appSettings);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 탭 메뉴 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('business')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'business'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg mr-2">🏪</span>
            업체 정보
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('app')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'app'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg mr-2">🎨</span>
            앱 설정
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'ai'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg mr-2">🤖</span>
            AI 설정
          </button>
        </div>

        <div className="p-6">
          {/* 업체 정보 탭 */}
          {activeTab === 'business' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  💡 <strong>생성된 앱의 헤더와 푸터에 표시됩니다</strong>
                </p>
              </div>

              {/* 업체명 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  업체명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessInfo.businessName}
                  onChange={(e) => updateBusinessInfo('businessName', e.target.value)}
                  placeholder="예: 맛있는 한식당"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {errors.businessName && (
                  <p className="mt-2 text-sm text-red-600">{errors.businessName}</p>
                )}
              </div>

              {/* 대표자 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  대표자명
                </label>
                <input
                  type="text"
                  value={businessInfo.ownerName}
                  onChange={(e) => updateBusinessInfo('ownerName', e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* 연락처 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={businessInfo.phone}
                  onChange={(e) => updateBusinessInfo('phone', e.target.value)}
                  placeholder="예: 02-1234-5678"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* 주소 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessInfo.address}
                  onChange={(e) => updateBusinessInfo('address', e.target.value)}
                  placeholder="예: 서울시 강남구 역삼동 123-45"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* 영업시간 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  영업시간
                </label>
                <input
                  type="text"
                  value={businessInfo.hours}
                  onChange={(e) => updateBusinessInfo('hours', e.target.value)}
                  placeholder="예: 09:00 - 22:00"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* 업체 소개 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  업체 소개
                </label>
                <textarea
                  value={businessInfo.description}
                  onChange={(e) => updateBusinessInfo('description', e.target.value)}
                  placeholder="예: 20년 전통의 정통 한식당입니다"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* 특징 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  업체 특징
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="예: 주차가능"
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {businessInfo.features.map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 로고 이모지 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  로고 이모지
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={businessInfo.logoEmoji}
                    onChange={(e) => updateBusinessInfo('logoEmoji', e.target.value)}
                    placeholder="🏪"
                    className="w-20 text-center text-3xl px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    maxLength={2}
                  />
                  <div className="flex flex-wrap gap-2">
                    {['🍽️', '🏠', '🏥', '🛍️', '✈️', '🏪', '☕', '🍜', '🏢', '💼'].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => updateBusinessInfo('logoEmoji', emoji)}
                        className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 앱 설정 탭 */}
          {activeTab === 'app' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-900">
                  🎨 <strong>앱의 전체적인 느낌과 스타일을 설정합니다</strong>
                </p>
              </div>

              {/* 앱 제목 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  앱 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={appSettings.appTitle}
                  onChange={(e) => updateAppSettings('appTitle', e.target.value)}
                  placeholder="예: 맛있는 한식당 메뉴 추천"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                />
                {errors.appTitle && (
                  <p className="mt-2 text-sm text-red-600">{errors.appTitle}</p>
                )}
              </div>

              {/* 환영 메시지 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  환영 메시지
                </label>
                <textarea
                  value={appSettings.welcomeMessage}
                  onChange={(e) => updateAppSettings('welcomeMessage', e.target.value)}
                  placeholder="예: 어서오세요! 당신에게 딱 맞는 메뉴를 추천해드릴게요 😊"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* 주 색상 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  주 색상
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={appSettings.primaryColor}
                    onChange={(e) => updateAppSettings('primaryColor', e.target.value)}
                    className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={appSettings.primaryColor}
                    onChange={(e) => updateAppSettings('primaryColor', e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                  />
                  <div className="flex space-x-2">
                    {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => updateAppSettings('primaryColor', color)}
                        className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI 설정 탭 */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900">
                  🤖 <strong>AI의 추천 방식과 성격을 설정합니다</strong>
                </p>
              </div>

              {/* AI 캐릭터 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  AI 응답 스타일
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['친근함', '전문적', '유머러스'].map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => updateAppSettings('aiCharacter', style)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        appSettings.aiCharacter === style
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {style === '친근함' && '😊'}
                        {style === '전문적' && '🎯'}
                        {style === '유머러스' && '😄'}
                      </div>
                      <p className={`font-semibold ${
                        appSettings.aiCharacter === style ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {style}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {style === '친근함' && '부드럽고 따뜻한 말투'}
                        {style === '전문적' && '신뢰감 있는 전문가 톤'}
                        {style === '유머러스' && '재미있고 경쾌한 톤'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 추천 개수 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  추천 개수
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    value={appSettings.recommendationCount}
                    onChange={(e) => updateAppSettings('recommendationCount', Number(e.target.value))}
                    min={1}
                    max={10}
                    className="flex-1"
                  />
                  <div className="flex items-center justify-center w-16 h-12 bg-green-100 border-2 border-green-500 rounded-lg">
                    <span className="text-xl font-bold text-green-700">{appSettings.recommendationCount}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>최소 1개</span>
                  <span>최대 10개</span>
                </div>
              </div>

              {/* 추가 지침 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  AI 추가 지침
                </label>
                <textarea
                  value={appSettings.additionalInstructions}
                  onChange={(e) => updateAppSettings('additionalInstructions', e.target.value)}
                  placeholder="예: 가격이 저렴한 메뉴를 우선 추천해주세요. 매운 음식은 주의사항을 꼭 알려주세요."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  AI가 추천할 때 특별히 고려해야 할 사항을 입력하세요
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-4 px-6 rounded-xl font-bold text-white text-lg
          transition-all transform
          ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
          }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AI 앱 생성 중...
          </span>
        ) : (
          '🚀 AI 앱 생성하기'
        )}
      </button>

      {/* 안내 메시지 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          <strong className="text-blue-900">✨ 설정 완료하면:</strong>
        </p>
        <ul className="mt-2 space-y-1 text-xs text-gray-600">
          <li>• 업체 정보가 앱 헤더/푸터에 표시됩니다</li>
          <li>• 선택한 색상과 스타일이 앱에 적용됩니다</li>
          <li>• AI가 설정한 스타일로 고객에게 추천합니다</li>
        </ul>
      </div>
    </form>
  );
}

