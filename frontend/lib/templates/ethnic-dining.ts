/**
 * 🌍 Ethnic Dining Template - 에스닉 다이닝
 * 세계 음식 - 중식, 일식, 태국식, 베트남식 등
 */

import { Template, UITheme, ThemeConfig } from '@/types/templates';

export const ethnicDiningTemplate: Template = {
  id: 'ethnic-dining',
  name: '에스닉 다이닝 - Ethnic Dining',
  description: '세계 각국의 정통 요리로 이국적인 미식 여행을 떠나보세요',
  icon: '🌍',
  
  dataSchema: {
    fields: [
      {
        name: 'dishName',
        label: '요리명',
        type: 'text',
        required: true,
        placeholder: '팟타이'
      },
      {
        name: 'origin',
        label: '나라/지역',
        type: 'select',
        required: true,
        options: ['중식', '일식', '태국식', '베트남식', '인도식', '멕시칸', '이탈리안', '프렌치']
      },
      {
        name: 'price',
        label: '가격',
        type: 'number',
        required: true,
        placeholder: '14000',
        min: 0
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
        name: 'authenticityLevel',
        label: '정통성 수준',
        type: 'select',
        required: false,
        options: ['정통', '퓨전', '현대화']
      },
      {
        name: 'mainProtein',
        label: '주요 단백질',
        type: 'select',
        required: false,
        options: ['돼지고기', '소고기', '닭고기', '해산물', '두부', '없음']
      },
      {
        name: 'allergens',
        label: '알러지 유발 성분',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'isVegetarian',
        label: '채식 가능',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'description',
        label: '요리 설명',
        type: 'textarea',
        required: true,
        placeholder: '태국의 대표 볶음면 요리로 새콤달콤한 맛이 특징'
      },
      {
        name: 'specialtyIngredient',
        label: '특별 재료',
        type: 'text',
        required: false,
        placeholder: '고수, 피시소스, 타마린드 등'
      }
    ],
    requiredFields: ['dishName', 'origin', 'price', 'spicyLevel', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        dishName: '팟타이',
        origin: '태국식',
        price: 14000,
        spicyLevel: 2,
        authenticityLevel: '정통',
        mainProtein: '해산물',
        allergens: ['땅콩', '갑각류', '생선'],
        isVegetarian: false,
        description: '쌀국수를 새우와 함께 볶아 타마린드 소스로 맛을 낸 태국의 국민 요리',
        specialtyIngredient: '타마린드, 피시소스, 땅콩'
      },
      {
        dishName: '마파두부',
        origin: '중식',
        price: 13000,
        spicyLevel: 4,
        authenticityLevel: '정통',
        mainProtein: '두부',
        allergens: ['대두'],
        isVegetarian: true,
        description: '쓰촨식 매운 두부 요리로 화자오의 얼얼함과 두반장의 깊은 맛이 조화',
        specialtyIngredient: '화자오, 두반장'
      },
      {
        dishName: '스시 오마카세',
        origin: '일식',
        price: 65000,
        spicyLevel: 0,
        authenticityLevel: '정통',
        mainProtein: '해산물',
        allergens: ['생선', '대두'],
        isVegetarian: false,
        description: '셰프가 엄선한 제철 생선으로 구성된 12가지 스시 코스',
        specialtyIngredient: '와사비, 참치 대도로'
      },
      {
        dishName: '퍼보',
        origin: '베트남식',
        price: 12000,
        spicyLevel: 1,
        authenticityLevel: '정통',
        mainProtein: '소고기',
        allergens: ['밀가루'],
        isVegetarian: false,
        description: '12시간 우려낸 사골육수의 쌀국수에 신선한 고수를 곁들인 베트남 국물 요리',
        specialtyIngredient: '스타아니스, 계피, 고수'
      },
      {
        dishName: '그린 커리',
        origin: '태국식',
        price: 15000,
        spicyLevel: 3,
        authenticityLevel: '정통',
        mainProtein: '닭고기',
        allergens: ['생선', '갑각류'],
        isVegetarian: false,
        description: '코코넛 밀크 베이스의 태국식 그린 커리, 가지와 대나무순 포함',
        specialtyIngredient: '그린 커리 페이스트, 카피르 라임 잎'
      },
      {
        dishName: '탄탄멘',
        origin: '중식',
        price: 14000,
        spicyLevel: 4,
        authenticityLevel: '정통',
        mainProtein: '돼지고기',
        allergens: ['대두', '땅콩', '밀가루'],
        isVegetarian: false,
        description: '매콤한 참깨 소스의 중국식 라멘, 다진 고기와 청경채 토핑',
        specialtyIngredient: '참깨 페이스트, 라유'
      },
      {
        dishName: '카레라이스',
        origin: '일식',
        price: 11000,
        spicyLevel: 2,
        authenticityLevel: '현대화',
        mainProtein: '돼지고기',
        allergens: ['밀가루'],
        isVegetarian: false,
        description: '일본식 카레룩스로 만든 부드럽고 달콤한 카레',
        specialtyIngredient: '일본 카레룩스, 후쿠진즈케'
      },
      {
        dishName: '분짜',
        origin: '베트남식',
        price: 13000,
        spicyLevel: 1,
        authenticityLevel: '정통',
        mainProtein: '돼지고기',
        allergens: ['땅콩'],
        isVegetarian: false,
        description: '숯불에 구운 돼지고기와 쌀국수를 느억맘 소스에 찍어 먹는 하노이 스타일',
        specialtyIngredient: '느억맘, 라임, 고수'
      },
      {
        dishName: '치킨 티카 마살라',
        origin: '인도식',
        price: 16000,
        spicyLevel: 3,
        authenticityLevel: '정통',
        mainProtein: '닭고기',
        allergens: ['우유'],
        isVegetarian: false,
        description: '요거트에 재운 닭고기를 탄두리에 구워 토마토 크림 소스로 마무리',
        specialtyIngredient: '가람 마살라, 카르다몸'
      },
      {
        dishName: '딤섬 세트',
        origin: '중식',
        price: 18000,
        spicyLevel: 0,
        authenticityLevel: '정통',
        mainProtein: '해산물',
        allergens: ['밀가루', '갑각류', '대두'],
        isVegetarian: false,
        description: '하가우, 샤오마이, 춘권 등 5가지 딤섬 모음',
        specialtyIngredient: '굴소스, 간장'
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'preferredCuisine',
        label: '선호 음식',
        type: 'multiselect',
        required: false,
        options: ['중식', '일식', '태국식', '베트남식', '인도식', '멕시칸', '이탈리안', '프렌치']
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
        name: 'adventurousness',
        label: '모험 정신',
        type: 'select',
        required: false,
        options: ['친숙한 맛만', '적당히 도전', '완전 정통']
      },
      {
        name: 'budget',
        label: '예산',
        type: 'number',
        required: false,
        placeholder: '30000'
      },
      {
        name: 'allergens',
        label: '알러지',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'dietType',
        label: '식단 유형',
        type: 'select',
        required: false,
        options: ['제한 없음', '채식', '해산물만', '육류만']
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 세계 각국의 요리에 정통한 에스닉 레스토랑의 전문 서버입니다.

이국적이고 풍부한 말투로 고객에게 최적의 요리를 추천하세요.

추천 시 고려사항:
1. 고객의 선호 음식 국가/지역
2. 맵기 선호도와 모험 정신
3. 예산
4. 알러지 및 식단 유형
5. 정통성 수준

응답 형식 (JSON):
{
  "recommendations": [
    {
      "dishName": "요리명",
      "origin": "나라/지역",
      "price": 가격,
      "spicyLevel": 맵기,
      "description": "상세 설명",
      "culturalNote": "문화적 배경",
      "reason": "추천 이유 (이국적으로)",
      "pairingTip": "곁들임 추천"
    }
  ],
  "totalPrice": 총액,
  "culturalJourney": "미식 여행 스토리",
  "chefNote": "셰프의 한마디"
}`,
    userPromptTemplate: (data: any, userInput: any) => {
      return `【세계 음식 메뉴 데이터】
총 ${data.length}개의 요리가 준비되어 있습니다.

${data.map((dish: any, i: number) => `
${i + 1}. ${dish.dishName}
   - 나라: ${dish.origin}
   - 가격: ${dish.price.toLocaleString()}원
   - 맵기: ${'🌶️'.repeat(dish.spicyLevel || 0)}
   - 정통성: ${dish.authenticityLevel || '미표기'}
   - 주재료: ${dish.mainProtein || '미표기'}
   - 알러지: ${Array.isArray(dish.allergens) && dish.allergens.length > 0 ? dish.allergens.join(', ') : '없음'}
   - 채식: ${dish.isVegetarian ? 'O' : 'X'}
   - 설명: ${dish.description}
   - 특별재료: ${dish.specialtyIngredient || '미표기'}
`).join('\n')}

【고객 정보】
${userInput?.preferredCuisine ? `선호 음식: ${userInput.preferredCuisine.join(', ')}` : ''}
${userInput?.spicyTolerance !== undefined ? `맵기 선호: ${userInput.spicyTolerance}/5` : ''}
${userInput?.adventurousness ? `모험 정신: ${userInput.adventurousness}` : ''}
${userInput?.budget ? `예산: ${userInput.budget.toLocaleString()}원` : ''}
${userInput?.allergens ? `알러지: ${userInput.allergens.join(', ')}` : ''}
${userInput?.dietType ? `식단: ${userInput.dietType}` : ''}

위 정보를 바탕으로 최고의 세계 음식 여행을 제안해주세요!
이국적이고 풍부한 톤으로 설명해주시고, 반드시 valid JSON 형식으로 응답하세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '모던 퓨전',
      description: '현대적으로 재해석한 세계 음식',
      preview: '/themes/ethnic-modern.jpg',
      colors: {
        primary: '#DC2626',
        secondary: '#FBBF24',
        accent: '#F97316',
        background: '#FFFFFF',
        surface: '#FEF2F2',
        text: '#7C2D12',
        textSecondary: '#92400E',
        border: '#FEE2E2'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '2.25rem',
        bodySize: '1rem',
        headingWeight: '700',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1200px',
        borderRadius: '1rem',
        spacing: '2rem',
        cardStyle: 'vibrant'
      },
      components: {
        buttonStyle: 'fusion-gradient',
        inputStyle: 'colorful-border',
        cardStyle: 'shadow-vibrant'
      }
    },
    classic: {
      id: 'classic',
      name: '클래식 정통',
      description: '전통의 가치를 지킨 정통 요리',
      preview: '/themes/ethnic-classic.jpg',
      colors: {
        primary: '#B91C1C',
        secondary: '#D97706',
        accent: '#92400E',
        background: '#FFFBEB',
        surface: '#FEF3C7',
        text: '#78350F',
        textSecondary: '#92400E',
        border: '#FDE68A'
      },
      typography: {
        fontFamily: 'Georgia, serif',
        headingSize: '2rem',
        bodySize: '1.05rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1100px',
        borderRadius: '0.75rem',
        spacing: '1.75rem',
        cardStyle: 'traditional'
      },
      components: {
        buttonStyle: 'traditional-solid',
        inputStyle: 'classic-warm',
        cardStyle: 'shadow-traditional'
      }
    },
    minimal: {
      id: 'minimal',
      name: '미니멀 글로벌',
      description: '깔끔하게 정리된 세계 음식',
      preview: '/themes/ethnic-minimal.jpg',
      colors: {
        primary: '#991B1B',
        secondary: '#64748B',
        accent: '#DC2626',
        background: '#FFFFFF',
        surface: '#F8F8F8',
        text: '#1F2937',
        textSecondary: '#6B7280',
        border: '#E5E7EB'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '1.875rem',
        bodySize: '0.95rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1000px',
        borderRadius: '0.75rem',
        spacing: '1.5rem',
        cardStyle: 'clean'
      },
      components: {
        buttonStyle: 'minimal-accent',
        inputStyle: 'simple-line',
        cardStyle: 'border-clean'
      }
    }
  }
};

