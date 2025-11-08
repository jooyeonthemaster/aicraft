'use client';

/**
 * ✨ Luxury Advanced Settings - Rolex-Inspired
 * 업체 정보 + 앱 설정 + AI 설정
 * 2단 그리드로 한 화면에 최적화
 */

import { useState } from 'react';
import { BusinessInfo, AppSettings, CustomerQuestion } from '@/types/templates';
import { nanoid } from 'nanoid';

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
  const [activeTab, setActiveTab] = useState<'business' | 'app' | 'ai' | 'questions'>('business');
  
  // 업체 정보 - 기본값 자동 입력
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '루너스 레스토랑',
    ownerName: '홍채민',
    phone: '02-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    hours: '11:00 - 22:00 (라스트오더 21:00)',
    description: 'AI 기반 개인 맞춤 메뉴 추천 시스템을 갖춘 프리미엄 레스토랑입니다',
    features: ['주차 가능', '단체석 예약', '와인 셀러', '프라이빗 룸'],
    logoEmoji: '🌟'
  });

  // 앱 설정 - 기본값 자동 입력
  const [appSettings, setAppSettings] = useState<AppSettings>({
    appTitle: `${industryName} - AI 메뉴 추천`,
    welcomeMessage: '어서오세요! AI가 당신에게 완벽한 메뉴를 추천해드립니다 ✨',
    primaryColor: '#14B8A6',
    aiCharacter: '친근함',
    recommendationCount: 3,
    additionalInstructions: '고객의 알러지와 예산을 최우선으로 고려해주세요.',
    customerQuestions: []
  });

  // 기본 질문 템플릿
  const defaultQuestionTemplates: CustomerQuestion[] = [
    {
      id: 'nationality',
      label: '국적',
      fieldType: 'select',
      options: ['한국', '미국', '일본', '중국', '영국', '프랑스', '독일', '기타'],
      required: false,
      placeholder: '국적 선택',
      aiInstruction: '고객의 국적에 맞는 언어로 답변하고 문화적 선호도를 고려하세요'
    },
    {
      id: 'gender',
      label: '성별',
      fieldType: 'select',
      options: ['남성', '여성', '기타', '선택 안 함'],
      required: false,
      placeholder: '성별 선택',
      aiInstruction: '성별에 따른 선호도를 고려하세요'
    },
    {
      id: 'age',
      label: '연령대',
      fieldType: 'select',
      options: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
      required: false,
      placeholder: '연령대 선택',
      aiInstruction: '연령대에 적합한 메뉴를 추천하세요'
    },
    {
      id: 'budget',
      label: '예산',
      fieldType: 'number',
      required: false,
      placeholder: '예산 입력 (원)',
      aiInstruction: '고객의 예산 범위 내에서 최적의 메뉴를 추천하세요'
    },
    {
      id: 'allergens',
      label: '알러지',
      fieldType: 'multiselect',
      options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류'],
      required: false,
      placeholder: '알러지 선택',
      aiInstruction: '알러지 성분이 포함된 메뉴는 절대 추천하지 마세요'
    },
    {
      id: 'dietary',
      label: '식단 제한',
      fieldType: 'multiselect',
      options: ['채식', '비건', '할랄', '저염식', '저당', '글루텐 프리'],
      required: false,
      placeholder: '식단 제한 선택',
      aiInstruction: '고객의 식단 제한을 엄격하게 준수하세요'
    }
  ];

  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 커스텀 질문 추가 폼
  const [newQuestion, setNewQuestion] = useState<Partial<CustomerQuestion>>({
    label: '',
    fieldType: 'text',
    required: false,
    options: [],
    aiInstruction: ''
  });
  const [optionInput, setOptionInput] = useState('');

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

  // 기본 질문 템플릿 추가
  const addDefaultQuestion = (template: CustomerQuestion) => {
    const questions = appSettings.customerQuestions || [];
    // 이미 추가된 질문인지 확인
    if (questions.some(q => q.id === template.id)) {
      return;
    }
    updateAppSettings('customerQuestions', [...questions, template]);
  };

  // 기본 질문 제거
  const removeQuestion = (questionId: string) => {
    const questions = appSettings.customerQuestions || [];
    updateAppSettings('customerQuestions', questions.filter(q => q.id !== questionId));
  };

  // 커스텀 질문 추가
  const addCustomQuestion = () => {
    if (!newQuestion.label?.trim()) return;
    
    const customQuestion: CustomerQuestion = {
      id: nanoid(8),
      label: newQuestion.label,
      fieldType: newQuestion.fieldType || 'text',
      options: newQuestion.options || [],
      required: newQuestion.required || false,
      placeholder: newQuestion.placeholder || '',
      aiInstruction: newQuestion.aiInstruction || `${newQuestion.label}을(를) 고려하여 추천하세요`
    };

    const questions = appSettings.customerQuestions || [];
    updateAppSettings('customerQuestions', [...questions, customQuestion]);
    
    // 폼 초기화
    setNewQuestion({
      label: '',
      fieldType: 'text',
      required: false,
      options: [],
      aiInstruction: ''
    });
    setOptionInput('');
  };

  // 옵션 추가 (select/multiselect용)
  const addOption = () => {
    if (!optionInput.trim()) return;
    setNewQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), optionInput.trim()]
    }));
    setOptionInput('');
  };

  // 옵션 제거
  const removeOption = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      options: (prev.options || []).filter((_, i) => i !== index)
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
      {/* ✨ Luxury Tabs */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 overflow-hidden">
        <div className="flex border-b-2 border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('business')}
            className={`flex-1 py-4 px-6 font-bold transition-all ${
              activeTab === 'business'
                ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-b-4 border-teal-500'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl mr-2">🏪</span>
            업체 정보
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('app')}
            className={`flex-1 py-4 px-6 font-bold transition-all ${
              activeTab === 'app'
                ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-b-4 border-teal-500'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl mr-2">🎨</span>
            앱 설정
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-4 px-6 font-bold transition-all ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-b-4 border-teal-500'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl mr-2">🤖</span>
            AI 설정
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('questions')}
            className={`flex-1 py-4 px-6 font-bold transition-all ${
              activeTab === 'questions'
                ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-b-4 border-teal-500'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl mr-2">📋</span>
            고객 질문
          </button>
        </div>

        <div className="p-8">
          {/* 업체 정보 탭 - 2단 그리드 */}
          {activeTab === 'business' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-4">
                <p className="text-sm font-bold text-teal-900">
                  💡 생성된 앱의 헤더와 푸터에 표시됩니다
                </p>
              </div>

              {/* 2단 그리드 레이아웃 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 업체명 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    업체명 <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.businessName}
                    onChange={(e) => updateBusinessInfo('businessName', e.target.value)}
                    placeholder="예: 루너스 레스토랑"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                  {errors.businessName && (
                    <p className="mt-2 text-sm text-red-600">{errors.businessName}</p>
                  )}
                </div>

                {/* 대표자 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    대표자명
                  </label>
                  <input
                    type="text"
                    value={businessInfo.ownerName}
                    onChange={(e) => updateBusinessInfo('ownerName', e.target.value)}
                    placeholder="예: 홍채민"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    연락처 <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={businessInfo.phone}
                    onChange={(e) => updateBusinessInfo('phone', e.target.value)}
                    placeholder="예: 02-1234-5678"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* 주소 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    주소 <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.address}
                    onChange={(e) => updateBusinessInfo('address', e.target.value)}
                    placeholder="예: 서울시 강남구 테헤란로 123"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* 영업시간 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    영업시간
                  </label>
                  <input
                    type="text"
                    value={businessInfo.hours}
                    onChange={(e) => updateBusinessInfo('hours', e.target.value)}
                    placeholder="예: 11:00 - 22:00"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                </div>

                {/* 로고 이모지 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    로고 이모지
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={businessInfo.logoEmoji}
                      onChange={(e) => updateBusinessInfo('logoEmoji', e.target.value)}
                      placeholder="🌟"
                      className="w-20 text-center text-3xl px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                      maxLength={2}
                    />
                    <div className="flex flex-wrap gap-2">
                      {['🌟', '🍗', '☕', '🥗', '🌍', '🍽️', '🏪', '🍜', '🍕', '🍔'].map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => updateBusinessInfo('logoEmoji', emoji)}
                          className={`text-2xl p-2 rounded-lg transition-all ${
                            businessInfo.logoEmoji === emoji
                              ? 'bg-teal-100 scale-110'
                              : 'hover:bg-slate-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 풀 너비 필드들 */}
              <div className="space-y-6">
                {/* 업체 소개 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    업체 소개
                  </label>
                  <textarea
                    value={businessInfo.description}
                    onChange={(e) => updateBusinessInfo('description', e.target.value)}
                    placeholder="예: AI 기반 개인 맞춤 메뉴 추천 시스템을 갖춘 프리미엄 레스토랑입니다"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                </div>

                {/* 특징 태그 */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    업체 특징
                  </label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      placeholder="예: 단체석 예약"
                      className="flex-1 px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      추가
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {businessInfo.features.map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          className="ml-2 text-teal-600 hover:text-teal-900 font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 앱 설정 탭 - 2단 그리드 */}
          {activeTab === 'app' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                <p className="text-sm font-bold text-purple-900">
                  🎨 앱의 전체적인 느낌과 스타일을 설정합니다
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 앱 제목 */}
                <div className="lg:col-span-2">
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    앱 제목 <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={appSettings.appTitle}
                    onChange={(e) => updateAppSettings('appTitle', e.target.value)}
                    placeholder="예: 파인다이닝 - AI 메뉴 추천"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  {errors.appTitle && (
                    <p className="mt-2 text-sm text-red-600">{errors.appTitle}</p>
                  )}
                </div>

                {/* 환영 메시지 */}
                <div className="lg:col-span-2">
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    환영 메시지
                  </label>
                  <textarea
                    value={appSettings.welcomeMessage}
                    onChange={(e) => updateAppSettings('welcomeMessage', e.target.value)}
                    placeholder="예: 어서오세요! AI가 당신에게 완벽한 메뉴를 추천해드립니다 ✨"
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                {/* 주 색상 */}
                <div className="lg:col-span-2">
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    주 색상
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={appSettings.primaryColor}
                      onChange={(e) => updateAppSettings('primaryColor', e.target.value)}
                      className="w-16 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={appSettings.primaryColor}
                      onChange={(e) => updateAppSettings('primaryColor', e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all font-mono"
                    />
                    <div className="flex space-x-2">
                      {['#14B8A6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => updateAppSettings('primaryColor', color)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            appSettings.primaryColor === color
                              ? 'border-teal-500 scale-110 shadow-lg'
                              : 'border-slate-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI 설정 탭 */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4">
                <p className="text-sm font-bold text-emerald-900">
                  🤖 AI의 추천 방식과 성격을 설정합니다
                </p>
              </div>

              {/* AI 캐릭터 */}
              <div>
                <label className="block mb-3 text-sm font-bold text-slate-900">
                  AI 응답 스타일
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['친근함', '전문적', '유머러스'].map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => updateAppSettings('aiCharacter', style)}
                      className={`p-5 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        appSettings.aiCharacter === style
                          ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-xl scale-105'
                          : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-lg'
                      }`}
                    >
                      <div className="text-3xl mb-2">
                        {style === '친근함' && '😊'}
                        {style === '전문적' && '🎯'}
                        {style === '유머러스' && '😄'}
                      </div>
                      <p className={`font-bold text-lg mb-1 ${
                        appSettings.aiCharacter === style ? 'text-teal-900' : 'text-slate-700'
                      }`}>
                        {style}
                      </p>
                      <p className={`text-xs ${
                        appSettings.aiCharacter === style ? 'text-teal-600' : 'text-slate-500'
                      }`}>
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
                <label className="block mb-3 text-sm font-bold text-slate-900">
                  추천 개수
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    value={appSettings.recommendationCount}
                    onChange={(e) => updateAppSettings('recommendationCount', Number(e.target.value))}
                    min={1}
                    max={10}
                    className="flex-1 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                  <div className="flex items-center justify-center w-20 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg">
                    <span className="text-2xl font-bold text-white">{appSettings.recommendationCount}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>최소 1개</span>
                  <span>최대 10개</span>
                </div>
              </div>

              {/* 추가 지침 */}
              <div>
                <label className="block mb-3 text-sm font-bold text-slate-900">
                  AI 추가 지침
                </label>
                <textarea
                  value={appSettings.additionalInstructions}
                  onChange={(e) => updateAppSettings('additionalInstructions', e.target.value)}
                  placeholder="예: 고객의 알러지와 예산을 최우선으로 고려해주세요."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                />
                <p className="text-xs text-slate-500 mt-2">
                  AI가 추천할 때 특별히 고려해야 할 사항을 입력하세요
                </p>
              </div>
            </div>
          )}

          {/* 고객 질문 탭 */}
          {activeTab === 'questions' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 rounded-xl p-5">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">
                      고객에게 물어볼 질문을 설정하세요
                    </p>
                    <p className="text-xs text-blue-700">
                      기본 질문 템플릿을 추가하거나 직접 커스텀 질문을 만들 수 있습니다. AI가 이 정보를 활용하여 더 정확한 추천을 제공합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 현재 추가된 질문들 */}
              {(appSettings.customerQuestions && appSettings.customerQuestions.length > 0) && (
                <div className="bg-white border-2 border-teal-200 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    📝 추가된 질문 ({appSettings.customerQuestions.length}개)
                  </h3>
                  <div className="space-y-3">
                    {appSettings.customerQuestions.map((q) => (
                      <div key={q.id} className="flex items-start justify-between p-4 bg-teal-50 border border-teal-200 rounded-lg group hover:shadow-md transition-all">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-bold text-slate-900">{q.label}</p>
                            {q.required && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">필수</span>}
                            <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full">{q.fieldType}</span>
                          </div>
                          {q.aiInstruction && (
                            <p className="text-xs text-slate-600 mt-1">💡 {q.aiInstruction}</p>
                          )}
                          {q.options && q.options.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {q.options.map((opt, i) => (
                                <span key={i} className="text-xs px-2 py-0.5 bg-white text-slate-600 rounded">
                                  {opt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQuestion(q.id)}
                          className="ml-3 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 기본 질문 템플릿 */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  ⚡ 기본 질문 템플릿
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {defaultQuestionTemplates.map((template) => {
                    const isAdded = (appSettings.customerQuestions || []).some(q => q.id === template.id);
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => addDefaultQuestion(template)}
                        disabled={isAdded}
                        className={`p-4 rounded-xl border-2 text-left transition-all transform hover:scale-105 ${
                          isAdded
                            ? 'border-teal-300 bg-teal-50 cursor-not-allowed opacity-60'
                            : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-bold text-slate-900">{template.label}</p>
                          {isAdded && (
                            <span className="text-teal-600">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{template.aiInstruction}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                            {template.fieldType}
                          </span>
                          {template.options && (
                            <span className="text-[10px] text-slate-500">
                              {template.options.length}개 옵션
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 커스텀 질문 추가 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  ✨ 커스텀 질문 만들기
                </h3>
                
                <div className="space-y-4">
                  {/* 질문 레이블 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-bold text-slate-900">
                        질문 제목
                      </label>
                      <input
                        type="text"
                        value={newQuestion.label || ''}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, label: e.target.value }))}
                        placeholder="예: 방문 목적"
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      />
                    </div>

                    {/* 질문 타입 */}
                    <div>
                      <label className="block mb-2 text-sm font-bold text-slate-900">
                        입력 타입
                      </label>
                      <select
                        value={newQuestion.fieldType || 'text'}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, fieldType: e.target.value as any }))}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none bg-white"
                      >
                        <option value="text">텍스트</option>
                        <option value="number">숫자</option>
                        <option value="select">선택 (1개)</option>
                        <option value="multiselect">다중선택</option>
                        <option value="range">범위 (슬라이더)</option>
                      </select>
                    </div>
                  </div>

                  {/* 옵션 추가 (select/multiselect일 때만) */}
                  {(newQuestion.fieldType === 'select' || newQuestion.fieldType === 'multiselect') && (
                    <div>
                      <label className="block mb-2 text-sm font-bold text-slate-900">
                        선택 옵션
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={optionInput}
                          onChange={(e) => setOptionInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOption())}
                          placeholder="옵션 입력 후 추가"
                          className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addOption}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                        >
                          추가
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(newQuestion.options || []).map((opt, i) => (
                          <span key={i} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {opt}
                            <button
                              type="button"
                              onClick={() => removeOption(i)}
                              className="ml-2 text-purple-600 hover:text-purple-900 font-bold"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI 활용 방법 */}
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-900">
                      AI 활용 지침
                    </label>
                    <textarea
                      value={newQuestion.aiInstruction || ''}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, aiInstruction: e.target.value }))}
                      placeholder="예: 고객의 국적에 맞는 언어로 답변하고 문화적 선호도를 고려하세요"
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* 필수 여부 */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={newQuestion.required || false}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, required: e.target.checked }))}
                      className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                    />
                    <label className="text-sm font-bold text-slate-900">
                      필수 질문으로 설정
                    </label>
                  </div>

                  {/* 추가 버튼 */}
                  <button
                    type="button"
                    onClick={addCustomQuestion}
                    disabled={!newQuestion.label?.trim()}
                    className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${
                      newQuestion.label?.trim()
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>커스텀 질문 추가</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✨ Luxury Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-5 px-6 rounded-xl font-bold text-white text-lg
          transition-all transform btn-luxury
          ${isLoading
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:shadow-2xl hover:scale-[1.02] shadow-xl'
          }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AI 앱 생성 중...
          </span>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <span>🚀</span>
            <span>AI 앱 생성하기</span>
          </span>
        )}
      </button>

      {/* 안내 메시지 */}
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-2 border-teal-300 rounded-xl p-5 shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-xl">✨</span>
          </div>
          <div>
            <p className="text-sm font-bold text-teal-900 mb-2">
              설정 완료 후 자동으로 처리됩니다
            </p>
            <ul className="space-y-1.5 text-xs text-teal-700">
              <li className="flex items-start space-x-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span>업체 정보가 앱 헤더/푸터에 자동 표시</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span>선택한 색상과 스타일이 앱에 즉시 적용</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span>AI가 설정한 성격과 스타일로 고객에게 추천</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
