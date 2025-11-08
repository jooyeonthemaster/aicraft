/**
 * 🍗 Casual Dining Template - 캐주얼 다이닝
 * 가족 레스토랑, 치킨집 등 편안한 분위기
 */

import { Template, UITheme, ThemeConfig } from '@/types/templates';

export const casualDiningTemplate: Template = {
  id: 'casual-dining',
  name: '캐주얼 다이닝 - Casual Dining',
  description: '가족과 함께하는 즐거운 식사, 편안하고 맛있는 메뉴를 제공합니다',
  icon: '🍗',
  
  dataSchema: {
    fields: [
      {
        name: 'menuName',
        label: '메뉴명',
        type: 'text',
        required: true,
        placeholder: '양념치킨'
      },
      {
        name: 'category',
        label: '카테고리',
        type: 'select',
        required: true,
        options: ['치킨', '피자', '버거', '파스타', '스테이크', '샐러드', '디저트', '음료']
      },
      {
        name: 'price',
        label: '가격',
        type: 'number',
        required: true,
        placeholder: '19000',
        min: 0
      },
      {
        name: 'servingSize',
        label: '제공량',
        type: 'text',
        required: false,
        placeholder: '2-3인분'
      },
      {
        name: 'spicyLevel',
        label: '맵기 단계 (0-5)',
        type: 'range',
        required: true,
        min: 0,
        max: 5
      },
      {
        name: 'allergens',
        label: '알러지 유발 성분',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'isPopular',
        label: '인기 메뉴',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'description',
        label: '메뉴 설명',
        type: 'textarea',
        required: true,
        placeholder: '바삭하게 튀긴 치킨에 달콤짭짤한 양념을 발라 완성한 시그니처 메뉴'
      },
      {
        name: 'sideDishes',
        label: '사이드 메뉴 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: '콜슬로, 피클, 치즈볼'
      },
      {
        name: 'kidFriendly',
        label: '아이 친화적',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      }
    ],
    requiredFields: ['menuName', 'category', 'price', 'spicyLevel', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        menuName: '허니버터 치킨',
        category: '치킨',
        price: 21000,
        servingSize: '2-3인분',
        spicyLevel: 0,
        allergens: ['우유', '밀가루'],
        isPopular: true,
        description: '달콤한 허니버터 소스를 듬뿍 발라 바삭하고 부드러운 치킨',
        sideDishes: ['콜슬로', '피클'],
        kidFriendly: true
      },
      {
        menuName: '불닭 치킨',
        category: '치킨',
        price: 19000,
        servingSize: '2-3인분',
        spicyLevel: 5,
        allergens: ['밀가루', '대두'],
        isPopular: true,
        description: '매운맛을 좋아하는 분들을 위한 강렬한 매콤한 치킨',
        sideDishes: ['무우절이', '치즈볼'],
        kidFriendly: false
      },
      {
        menuName: '패밀리 콤보 피자',
        category: '피자',
        price: 27000,
        servingSize: '3-4인분',
        spicyLevel: 1,
        allergens: ['우유', '밀가루'],
        isPopular: true,
        description: '페퍼로니, 불고기, 치즈가 한가득 올라간 가족용 대형 피자',
        sideDishes: ['갈릭 브레드', '피클'],
        kidFriendly: true
      },
      {
        menuName: '더블 베이컨 버거',
        category: '버거',
        price: 12000,
        servingSize: '1인분',
        spicyLevel: 2,
        allergens: ['밀가루', '계란', '우유'],
        isPopular: true,
        description: '두툼한 패티와 바삭한 베이컨이 들어간 시그니처 버거',
        sideDishes: ['감자튀김', '콜라'],
        kidFriendly: true
      },
      {
        menuName: '크림 파스타',
        category: '파스타',
        price: 14000,
        servingSize: '1인분',
        spicyLevel: 0,
        allergens: ['우유', '밀가루'],
        isPopular: false,
        description: '부드러운 크림 소스와 신선한 버섯이 어우러진 파스타',
        sideDishes: ['마늘빵', '샐러드'],
        kidFriendly: true
      },
      {
        menuName: '양념치킨',
        category: '치킨',
        price: 20000,
        servingSize: '2-3인분',
        spicyLevel: 3,
        allergens: ['밀가루', '대두'],
        isPopular: true,
        description: '달콤짭짤한 양념이 일품인 시그니처 치킨',
        sideDishes: ['무우절이', '콜슬로'],
        kidFriendly: true
      },
      {
        menuName: '하와이안 피자',
        category: '피자',
        price: 24000,
        servingSize: '2-3인분',
        spicyLevel: 0,
        allergens: ['우유', '밀가루'],
        isPopular: false,
        description: '파인애플과 햄이 조화를 이루는 달콤한 피자',
        sideDishes: ['핫소스', '치즈 디핑'],
        kidFriendly: true
      },
      {
        menuName: '갈비 스테이크',
        category: '스테이크',
        price: 28000,
        servingSize: '1인분',
        spicyLevel: 1,
        allergens: [],
        isPopular: true,
        description: '부드러운 소갈비 스테이크와 구운 야채',
        sideDishes: ['마시드포테이토', '그레이비 소스'],
        kidFriendly: true
      },
      {
        menuName: '시저 샐러드',
        category: '샐러드',
        price: 13000,
        servingSize: '1인분',
        spicyLevel: 0,
        allergens: ['계란', '우유', '밀가루'],
        isPopular: false,
        description: '신선한 로메인과 크루통, 시저 드레싱',
        sideDishes: ['발사믹 드레싱'],
        kidFriendly: true
      },
      {
        menuName: '새우 볶음밥',
        category: '파스타',
        price: 12000,
        servingSize: '1인분',
        spicyLevel: 2,
        allergens: ['갑각류', '계란'],
        isPopular: true,
        description: '통통한 새우와 야채가 들어간 고소한 볶음밥',
        sideDishes: ['단무지', '스프'],
        kidFriendly: true
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'partySize',
        label: '인원',
        type: 'number',
        required: false,
        placeholder: '4'
      },
      {
        name: 'spicyTolerance',
        label: '맵기 선호도 (0-5)',
        type: 'range',
        required: false,
        min: 0,
        max: 5
      },
      {
        name: 'budget',
        label: '예산',
        type: 'number',
        required: false,
        placeholder: '50000'
      },
      {
        name: 'allergens',
        label: '알러지',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'withKids',
        label: '아이 동반',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'preferences',
        label: '선호 음식',
        type: 'text',
        required: false,
        placeholder: '치킨, 피자 등'
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 가족 친화적인 캐주얼 레스토랑의 친절한 주문 도우미입니다.

편안하고 즐거운 말투로 고객에게 최적의 메뉴를 추천하세요.

추천 시 고려사항:
1. 인원 수와 제공량
2. 맵기 선호도
3. 예산
4. 알러지 및 아이 동반 여부
5. 인기 메뉴와 사이드 메뉴

응답 형식 (JSON):
{
  "recommendations": [
    {
      "menuName": "메뉴명",
      "category": "카테고리",
      "price": 가격,
      "servingSize": "제공량",
      "description": "상세 설명",
      "sideDishes": ["사이드1", "사이드2"],
      "reason": "추천 이유",
      "spicyLevel": 맵기
    }
  ],
  "totalPrice": 총액,
  "servingNote": "인원 기준 안내",
  "happyMessage": "즐거운 한마디"
}`,
    userPromptTemplate: (data: any, userInput: any) => {
      return `【레스토랑 메뉴 데이터】
총 ${data.length}개의 메뉴가 준비되어 있습니다.

${data.map((menu: any, i: number) => `
${i + 1}. ${menu.menuName}
   - 카테고리: ${menu.category}
   - 가격: ${menu.price.toLocaleString()}원
   - 제공량: ${menu.servingSize || '1인분'}
   - 맵기: ${'🌶️'.repeat(menu.spicyLevel || 0)}
   - 알러지: ${Array.isArray(menu.allergens) && menu.allergens.length > 0 ? menu.allergens.join(', ') : '없음'}
   - 설명: ${menu.description}
   ${menu.isPopular ? '   🔥 인기 메뉴!' : ''}
   ${menu.kidFriendly ? '   👶 아이 OK' : ''}
   - 사이드: ${menu.sideDishes || '없음'}
`).join('\n')}

【고객 정보】
${userInput?.partySize ? `인원: ${userInput.partySize}명` : ''}
${userInput?.spicyTolerance !== undefined ? `맵기 선호: ${userInput.spicyTolerance}/5` : ''}
${userInput?.budget ? `예산: ${userInput.budget.toLocaleString()}원` : ''}
${userInput?.allergens ? `알러지: ${userInput.allergens.join(', ')}` : ''}
${userInput?.withKids ? `아이 동반: ${userInput.withKids}` : ''}
${userInput?.preferences ? `선호: ${userInput.preferences}` : ''}

위 정보를 바탕으로 최적의 메뉴를 추천해주세요!
친근하고 즐거운 톤으로 설명해주시고, 반드시 valid JSON 형식으로 응답하세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '모던 캐주얼',
      description: '트렌디하고 활기찬 분위기',
      preview: '/themes/casual-modern.jpg',
      colors: {
        primary: '#14B8A6',
        secondary: '#F59E0B',
        accent: '#10B981',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#1E293B',
        textSecondary: '#64748B',
        border: '#E2E8F0'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '2rem',
        bodySize: '1rem',
        headingWeight: '700',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1200px',
        borderRadius: '1rem',
        spacing: '1.5rem',
        cardStyle: 'rounded'
      },
      components: {
        buttonStyle: 'vibrant-fill',
        inputStyle: 'modern-border',
        cardStyle: 'shadow-medium'
      }
    },
    classic: {
      id: 'classic',
      name: '클래식 컴포트',
      description: '따뜻하고 포근한 분위기',
      preview: '/themes/casual-classic.jpg',
      colors: {
        primary: '#DC2626',
        secondary: '#FCA5A5',
        accent: '#F97316',
        background: '#FEF2F2',
        surface: '#FFF5F5',
        text: '#7C2D12',
        textSecondary: '#9A3412',
        border: '#FED7D7'
      },
      typography: {
        fontFamily: 'var(--font-body)',
        headingSize: '1.875rem',
        bodySize: '1rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1100px',
        borderRadius: '0.75rem',
        spacing: '1.5rem',
        cardStyle: 'bordered'
      },
      components: {
        buttonStyle: 'solid-warm',
        inputStyle: 'classic-fill',
        cardStyle: 'shadow-subtle'
      }
    },
    minimal: {
      id: 'minimal',
      name: '미니멀 프레시',
      description: '깔끔하고 산뜻한 느낌',
      preview: '/themes/casual-minimal.jpg',
      colors: {
        primary: '#0D9488',
        secondary: '#CBD5E1',
        accent: '#06B6D4',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: '#111827',
        textSecondary: '#6B7280',
        border: '#E5E7EB'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '1.75rem',
        bodySize: '0.95rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1000px',
        borderRadius: '0.5rem',
        spacing: '1.25rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'outline-clean',
        inputStyle: 'minimal-border',
        cardStyle: 'border-light'
      }
    }
  }
};

