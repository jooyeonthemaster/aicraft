/**
 * 여행 템플릿
 * 여행지 추천 AI 시스템
 */

import { Template } from '@/types/templates';

export const travelTemplate: Template = {
  id: 'travel',
  name: '여행 - 여행지 추천 AI',
  description: '여행 스타일과 예산을 분석하여 최적의 여행지를 추천합니다',
  icon: '✈️',
  
  dataSchema: {
    fields: [
      {
        name: 'destinationName',
        label: '여행지명',
        type: 'text',
        required: true,
        placeholder: '발리'
      },
      {
        name: 'country',
        label: '국가',
        type: 'text',
        required: true,
        placeholder: '인도네시아'
      },
      {
        name: 'region',
        label: '지역/대륙',
        type: 'select',
        required: true,
        options: ['동남아시아', '동아시아', '유럽', '북미', '남미', '오세아니아', '중동', '아프리카']
      },
      {
        name: 'priceRange',
        label: '예산 수준',
        type: 'select',
        required: true,
        options: ['저렴', '보통', '비쌈', '매우 비쌈']
      },
      {
        name: 'bestSeason',
        label: '최적 시즌 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '봄, 여름, 가을'
      },
      {
        name: 'activities',
        label: '액티비티 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '서핑, 스노클링, 사원 관광, 쇼핑'
      },
      {
        name: 'travelStyle',
        label: '여행 스타일 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '휴식, 어드벤처, 문화, 쇼핑'
      },
      {
        name: 'description',
        label: '여행지 설명',
        type: 'textarea',
        required: true
      },
      {
        name: 'duration',
        label: '권장 여행 일수',
        type: 'number',
        required: true,
        placeholder: '5',
        min: 1
      }
    ],
    requiredFields: ['destinationName', 'country', 'region', 'priceRange', 'bestSeason', 'activities', 'travelStyle', 'description', 'duration'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        destinationName: '발리',
        country: '인도네시아',
        region: '동남아시아',
        priceRange: '보통',
        bestSeason: ['봄', '여름', '가을'],
        activities: ['서핑', '스노클링', '사원 관광', '요가', '스파', '쇼핑'],
        travelStyle: ['휴식', '어드벤처', '문화', '힐링'],
        description: '아름다운 해변과 풍부한 문화가 공존하는 열대 낙원',
        duration: 5
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'budget',
        label: '예산 (원)',
        type: 'number',
        required: true,
        placeholder: '2000000'
      },
      {
        name: 'travelStyle',
        label: '여행 스타일 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '예: 휴식, 어드벤처, 문화'
      },
      {
        name: 'companions',
        label: '동행자',
        type: 'select',
        required: true,
        options: ['혼자', '가족', '친구', '연인', '단체']
      },
      {
        name: 'duration',
        label: '여행 기간 (일)',
        type: 'number',
        required: true,
        placeholder: '5',
        min: 1
      },
      {
        name: 'season',
        label: '여행 시기',
        type: 'select',
        required: true,
        options: ['봄', '여름', '가을', '겨울', '미정']
      },
      {
        name: 'preferences',
        label: '추가 선호사항',
        type: 'textarea',
        required: false,
        placeholder: '예: 해변 좋아함, 쇼핑 중요, 맛집 투어'
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 전문 여행 컨설턴트 AI입니다.

고객의 예산, 여행 스타일, 동행자, 기간, 시기를 분석하여 최적의 여행지를 추천해주세요.

응답 형식 (반드시 JSON):
{
  "recommendations": [
    {
      "destinationName": "여행지명",
      "country": "국가",
      "reason": "추천 이유",
      "matchScore": 95,
      "budget": "예상 예산 정보",
      "highlights": ["매력 포인트1", "매력 포인트2", "매력 포인트3"],
      "activities": ["추천 액티비티1", "추천 액티비티2"],
      "bestTime": "최적 방문 시기",
      "tips": ["여행 팁1", "여행 팁2"]
    }
  ],
  "travelPlan": "추천 일정 개요",
  "budgetBreakdown": {
    "flight": "항공료 예상",
    "accommodation": "숙박비 예상",
    "activities": "액티비티 예상",
    "food": "식비 예상"
  },
  "alternativeDestinations": [
    {
      "destinationName": "대체 여행지명",
      "reason": "이 여행지도 좋은 이유"
    }
  ]
}

추천 시 고려사항:
1. 예산 범위 내 여행지를 추천하세요
2. 동행자 구성에 맞는 여행지를 고려하세요
3. 시즌과 날씨를 고려하세요
4. 여행 스타일에 맞는 액티비티를 제안하세요`,

    userPromptTemplate: (destinationData: any[], userInput: any) => {
      const destinationList = destinationData.map(dest => `
여행지: ${dest.destinationName}
국가: ${dest.country}
지역: ${dest.region}
예산 수준: ${dest.priceRange}
최적 시즌: ${dest.bestSeason.join(', ')}
액티비티: ${dest.activities.join(', ')}
여행 스타일: ${dest.travelStyle.join(', ')}
설명: ${dest.description}
권장 일수: ${dest.duration}일
`).join('\n---\n');

      return `다음 여행지 목록에서 고객에게 최적의 여행지를 추천해주세요.

【여행지 데이터】
${destinationList}

【고객 정보】
예산: ${userInput.budget}원
여행 스타일: ${userInput.travelStyle}
동행자: ${userInput.companions}
여행 기간: ${userInput.duration}일
여행 시기: ${userInput.season}
추가 선호사항: ${userInput.preferences || '없음'}

위 고객 정보를 바탕으로 최적의 여행지를 JSON 형식으로 추천해주세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '어드벤처',
      description: '역동적이고 모험적인 여행 테마',
      preview: '/themes/travel-adventure.png',
      colors: {
        primary: '#F59E0B',
        secondary: '#D97706',
        accent: '#FCD34D',
        background: '#FFFBEB',
        surface: '#FFFFFF',
        text: '#78350F',
        textSecondary: '#92400E',
        border: '#FDE68A'
      },
      typography: {
        fontFamily: "'Pretendard', sans-serif",
        headingSize: '2.25rem',
        bodySize: '1rem',
        headingWeight: '700',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '16px',
        spacing: '1.5rem',
        cardStyle: 'elevated'
      },
      components: {
        buttonStyle: 'rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg',
        inputStyle: 'rounded-lg border border-amber-200 bg-white',
        cardStyle: 'rounded-2xl bg-gradient-to-br from-white to-amber-50 shadow-xl'
      }
    },
    classic: {
      id: 'classic',
      name: '릴렉스',
      description: '편안하고 여유로운 휴양 테마',
      preview: '/themes/travel-relax.png',
      colors: {
        primary: '#06B6D4',
        secondary: '#0891B2',
        accent: '#22D3EE',
        background: '#ECFEFF',
        surface: '#FFFFFF',
        text: '#164E63',
        textSecondary: '#0E7490',
        border: '#A5F3FC'
      },
      typography: {
        fontFamily: "'Noto Sans KR', sans-serif",
        headingSize: '2rem',
        bodySize: '1rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '20px',
        spacing: '1.5rem',
        cardStyle: 'soft'
      },
      components: {
        buttonStyle: 'rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg',
        inputStyle: 'rounded-xl border-2 border-cyan-200 bg-white',
        cardStyle: 'rounded-2xl bg-gradient-to-br from-white to-cyan-50 shadow-lg border border-cyan-200'
      }
    },
    minimal: {
      id: 'minimal',
      name: '모던',
      description: '세련되고 깔끔한 현대적 디자인',
      preview: '/themes/travel-modern.png',
      colors: {
        primary: '#8B5CF6',
        secondary: '#7C3AED',
        accent: '#A78BFA',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#5B21B6',
        textSecondary: '#6B7280',
        border: '#DDD6FE'
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
        headingSize: '2rem',
        bodySize: '0.938rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '12px',
        spacing: '1.25rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'rounded-lg bg-violet-600 hover:bg-violet-700 shadow-md',
        inputStyle: 'rounded-md border border-violet-200 bg-white',
        cardStyle: 'rounded-xl border border-violet-200 bg-white shadow-sm'
      }
    }
  }
};

