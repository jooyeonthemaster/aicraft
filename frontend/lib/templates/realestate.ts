/**
 * 부동산 템플릿
 * 매물 추천 AI 시스템
 */

import { Template } from '@/types/templates';

export const realestateTemplate: Template = {
  id: 'realestate',
  name: '부동산 - 매물 추천 AI',
  description: '고객의 예산, 선호 지역, 평수를 분석하여 최적의 매물을 추천합니다',
  icon: '🏠',
  
  dataSchema: {
    fields: [
      {
        name: 'propertyName',
        label: '매물명',
        type: 'text',
        required: true,
        placeholder: '래미안강남파크'
      },
      {
        name: 'location',
        label: '위치',
        type: 'text',
        required: true,
        placeholder: '서울시 강남구 역삼동'
      },
      {
        name: 'price',
        label: '가격 (만원)',
        type: 'number',
        required: true,
        placeholder: '150000'
      },
      {
        name: 'area',
        label: '면적 (평)',
        type: 'number',
        required: true,
        placeholder: '32'
      },
      {
        name: 'rooms',
        label: '방 개수',
        type: 'number',
        required: true,
        min: 0,
        max: 10
      },
      {
        name: 'bathrooms',
        label: '욕실 개수',
        type: 'number',
        required: true,
        min: 1,
        max: 5
      },
      {
        name: 'floor',
        label: '층수',
        type: 'number',
        required: true
      },
      {
        name: 'buildYear',
        label: '준공년도',
        type: 'number',
        required: true,
        placeholder: '2018'
      },
      {
        name: 'propertyType',
        label: '매물 유형',
        type: 'select',
        required: true,
        options: ['아파트', '빌라', '오피스텔', '단독주택', '다세대주택', '원룸', '투룸']
      },
      {
        name: 'features',
        label: '특징 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: '역세권, 학군우수, 남향, 주차가능'
      },
      {
        name: 'description',
        label: '상세 설명',
        type: 'textarea',
        required: true
      }
    ],
    requiredFields: ['propertyName', 'location', 'price', 'area', 'rooms', 'bathrooms', 'floor', 'buildYear', 'propertyType', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        propertyName: '래미안강남파크 32평',
        location: '서울시 강남구 역삼동',
        price: 150000,
        area: 32,
        rooms: 3,
        bathrooms: 2,
        floor: 15,
        buildYear: 2018,
        propertyType: '아파트',
        features: ['역세권', '학군우수', '남향', '주차2대'],
        description: '강남역 도보 10분 거리의 프리미엄 아파트입니다'
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'budget',
        label: '예산 (만원)',
        type: 'number',
        required: true,
        placeholder: '100000'
      },
      {
        name: 'preferredLocations',
        label: '선호 지역 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: '강남구, 서초구, 송파구'
      },
      {
        name: 'minArea',
        label: '최소 면적 (평)',
        type: 'number',
        required: true,
        placeholder: '20'
      },
      {
        name: 'maxArea',
        label: '최대 면적 (평)',
        type: 'number',
        required: false,
        placeholder: '40'
      },
      {
        name: 'rooms',
        label: '필요한 방 개수',
        type: 'number',
        required: true,
        min: 1
      },
      {
        name: 'familySize',
        label: '가족 구성원 수',
        type: 'number',
        required: true,
        min: 1
      },
      {
        name: 'preferences',
        label: '추가 선호사항',
        type: 'textarea',
        required: false,
        placeholder: '예: 역세권 필수, 학군 중요, 주차 2대 이상'
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 전문 부동산 매물 추천 AI입니다.

고객의 예산, 선호 지역, 면적, 가족 구성원을 고려하여 최적의 매물을 추천해주세요.

응답 형식 (반드시 JSON):
{
  "recommendations": [
    {
      "propertyName": "매물명",
      "location": "위치",
      "price": 150000,
      "reason": "추천 이유",
      "matchScore": 95,
      "highlights": ["장점1", "장점2", "장점3"],
      "considerations": ["고려사항"]
    }
  ],
  "marketInsights": "시장 동향 및 투자 가치 분석",
  "additionalOptions": [
    {
      "propertyName": "대체 매물명",
      "reason": "이 매물도 좋은 이유"
    }
  ]
}`,

    userPromptTemplate: (propertyData: any[], userInput: any) => {
      const propertyList = propertyData.map(prop => `
매물: ${prop.propertyName}
위치: ${prop.location}
가격: ${prop.price}만원
면적: ${prop.area}평
방/욕실: ${prop.rooms}개/${prop.bathrooms}개
층수: ${prop.floor}층
준공: ${prop.buildYear}년
유형: ${prop.propertyType}
특징: ${prop.features?.join(', ') || '정보 없음'}
설명: ${prop.description}
`).join('\n---\n');

      return `다음 매물 목록에서 고객에게 최적의 매물을 추천해주세요.

【매물 데이터】
${propertyList}

【고객 정보】
예산: ${userInput.budget}만원
선호 지역: ${userInput.preferredLocations || '무관'}
면적 범위: ${userInput.minArea}평 ~ ${userInput.maxArea || '무제한'}평
필요 방 개수: ${userInput.rooms}개
가족 구성원: ${userInput.familySize}명
추가 선호사항: ${userInput.preferences || '없음'}

위 고객 정보를 바탕으로 최적의 매물을 JSON 형식으로 추천해주세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '프로페셔널',
      description: '전문적이고 신뢰감 있는 비즈니스 테마',
      preview: '/themes/realestate-professional.png',
      colors: {
        primary: '#2563EB',
        secondary: '#1E40AF',
        accent: '#60A5FA',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: '#0F172A',
        textSecondary: '#64748B',
        border: '#E2E8F0'
      },
      typography: {
        fontFamily: "'Pretendard', sans-serif",
        headingSize: '2rem',
        bodySize: '0.938rem',
        headingWeight: '700',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '12px',
        spacing: '1.25rem',
        cardStyle: 'elevated'
      },
      components: {
        buttonStyle: 'rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md',
        inputStyle: 'rounded-lg border border-gray-300 bg-white',
        cardStyle: 'rounded-xl bg-white shadow-lg border border-gray-200'
      }
    },
    classic: {
      id: 'classic',
      name: '럭셔리',
      description: '고급스럽고 우아한 프리미엄 테마',
      preview: '/themes/realestate-luxury.png',
      colors: {
        primary: '#92400E',
        secondary: '#78350F',
        accent: '#D97706',
        background: '#FFFBEB',
        surface: '#FFFFFF',
        text: '#1C1917',
        textSecondary: '#78716C',
        border: '#E7E5E4'
      },
      typography: {
        fontFamily: "'Noto Serif KR', serif",
        headingSize: '2.25rem',
        bodySize: '1rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '16px',
        spacing: '1.5rem',
        cardStyle: 'elevated'
      },
      components: {
        buttonStyle: 'rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg',
        inputStyle: 'rounded-lg border-2 border-amber-200 bg-white',
        cardStyle: 'rounded-2xl bg-gradient-to-br from-white to-amber-50 shadow-xl border-2 border-amber-200'
      }
    },
    minimal: {
      id: 'minimal',
      name: '심플',
      description: '깔끔하고 실용적인 미니멀 디자인',
      preview: '/themes/realestate-simple.png',
      colors: {
        primary: '#18181B',
        secondary: '#52525B',
        accent: '#3B82F6',
        background: '#FFFFFF',
        surface: '#FAFAFA',
        text: '#09090B',
        textSecondary: '#71717A',
        border: '#E4E4E7'
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
        headingSize: '1.875rem',
        bodySize: '0.938rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '8px',
        spacing: '1rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'rounded-md bg-zinc-900 hover:bg-zinc-800 shadow-sm',
        inputStyle: 'rounded-md border border-zinc-300 bg-white',
        cardStyle: 'rounded-lg border border-zinc-200 bg-white shadow-sm'
      }
    }
  }
};

