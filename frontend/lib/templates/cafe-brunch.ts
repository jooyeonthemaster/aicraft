/**
 * ☕ Cafe & Brunch Template - 카페 & 브런치
 * 모던 카페, 베이커리, 브런치 전문점
 */

import { Template, UITheme, ThemeConfig } from '@/types/templates';

export const cafeBrunchTemplate: Template = {
  id: 'cafe-brunch',
  name: '카페 & 브런치 - Cafe & Brunch',
  description: '힙한 카페에서 즐기는 커피와 브런치, 여유로운 시간을 제공합니다',
  icon: '☕',
  
  dataSchema: {
    fields: [
      {
        name: 'itemName',
        label: '메뉴명',
        type: 'text',
        required: true,
        placeholder: '아보카도 토스트'
      },
      {
        name: 'category',
        label: '카테고리',
        type: 'select',
        required: true,
        options: ['커피', '논커피', '브런치', '베이커리', '디저트', '샐러드', '샌드위치']
      },
      {
        name: 'price',
        label: '가격',
        type: 'number',
        required: true,
        placeholder: '12000',
        min: 0
      },
      {
        name: 'caffeine',
        label: '카페인 함량',
        type: 'select',
        required: false,
        options: ['없음', '적음', '보통', '많음']
      },
      {
        name: 'isVegan',
        label: '비건',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'isGlutenFree',
        label: '글루텐 프리',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'allergens',
        label: '알러지 유발 성분',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '대두', '견과류']
      },
      {
        name: 'description',
        label: '메뉴 설명',
        type: 'textarea',
        required: true,
        placeholder: '신선한 아보카도와 토마토를 올린 건강한 브런치'
      },
      {
        name: 'instagrammable',
        label: '인스타그래머블',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'calories',
        label: '칼로리',
        type: 'number',
        required: false,
        placeholder: '350'
      }
    ],
    requiredFields: ['itemName', 'category', 'price', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        itemName: '아보카도 에그 베네딕트',
        category: '브런치',
        price: 16000,
        caffeine: '없음',
        isVegan: false,
        isGlutenFree: false,
        allergens: ['계란', '밀가루', '우유'],
        description: '수비드로 완벽하게 익힌 계란과 신선한 아보카도, 홀랜다이즈 소스가 조화로운 시그니처 브런치',
        instagrammable: true,
        calories: 520
      },
      {
        itemName: '플랫 화이트',
        category: '커피',
        price: 6500,
        caffeine: '많음',
        isVegan: false,
        isGlutenFree: true,
        allergens: ['우유'],
        description: '에티오피아 예가체프 원두로 추출한 에스프레소에 부드러운 마이크로폼 밀크를 더한 커피',
        instagrammable: true,
        calories: 120
      },
      {
        itemName: '비건 팬케이크',
        category: '브런치',
        price: 14000,
        caffeine: '없음',
        isVegan: true,
        isGlutenFree: true,
        allergens: [],
        description: '귀리가루와 아몬드 밀크로 만든 푹신한 팬케이크, 메이플 시럽과 신선한 베리 토핑',
        instagrammable: true,
        calories: 380
      },
      {
        itemName: '시그니처 크루아상',
        category: '베이커리',
        price: 5500,
        caffeine: '없음',
        isVegan: false,
        isGlutenFree: false,
        allergens: ['밀가루', '우유', '계란'],
        description: '72시간 발효한 프랑스식 버터 크루아상, 겉은 바삭 속은 촉촉',
        instagrammable: true,
        calories: 260
      },
      {
        itemName: '콜드 브루 라떼',
        category: '커피',
        price: 7000,
        caffeine: '보통',
        isVegan: false,
        isGlutenFree: true,
        allergens: ['우유'],
        description: '24시간 저온 추출한 콜드 브루에 우유를 더한 부드러운 라떼',
        instagrammable: true,
        calories: 150
      },
      {
        itemName: '프렌치 토스트',
        category: '브런치',
        price: 13000,
        caffeine: '없음',
        isVegan: false,
        isGlutenFree: false,
        allergens: ['계란', '우유', '밀가루'],
        description: '브리오슈 빵에 계핏가루와 메이플 시럽을 더한 클래식 프렌치 토스트',
        instagrammable: true,
        calories: 450
      },
      {
        itemName: '카페 모카',
        category: '커피',
        price: 7500,
        caffeine: '많음',
        isVegan: false,
        isGlutenFree: true,
        allergens: ['우유'],
        description: '에스프레소와 초콜릿, 스팀 밀크의 달콤한 조화',
        instagrammable: true,
        calories: 180
      },
      {
        itemName: '샤크슈카',
        category: '브런치',
        price: 15000,
        caffeine: '없음',
        isVegan: false,
        isGlutenFree: true,
        allergens: ['계란'],
        description: '토마토 소스에 수란을 얹은 중동식 브런치, 바게트 포함',
        instagrammable: true,
        calories: 380
      },
      {
        itemName: '그래놀라 요거트 볼',
        category: '디저트',
        price: 11000,
        caffeine: '없음',
        isVegan: false,
        isGlutenFree: false,
        allergens: ['우유', '견과류'],
        description: '그릭 요거트에 하우스메이드 그래놀라와 신선한 과일',
        instagrammable: true,
        calories: 320
      },
      {
        itemName: '아메리카노',
        category: '커피',
        price: 5000,
        caffeine: '많음',
        isVegan: true,
        isGlutenFree: true,
        allergens: [],
        description: '에티오피아 시다모 원두로 추출한 깔끔한 아메리카노',
        instagrammable: false,
        calories: 5
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'mood',
        label: '원하는 분위기',
        type: 'select',
        required: false,
        options: ['여유로운', '활기찬', '집중', '힐링']
      },
      {
        name: 'caffeinePreference',
        label: '카페인 선호도',
        type: 'select',
        required: false,
        options: ['많이', '적당히', '없이']
      },
      {
        name: 'budget',
        label: '예산',
        type: 'number',
        required: false,
        placeholder: '15000'
      },
      {
        name: 'dietaryRestrictions',
        label: '식이 제한',
        type: 'multiselect',
        required: false,
        options: ['비건', '글루텐 프리', '저칼로리']
      },
      {
        name: 'allergens',
        label: '알러지',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '대두', '견과류']
      },
      {
        name: 'photoWorthy',
        label: '인스타용',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 힙한 카페의 친근한 바리스타입니다.

세련되고 감각적인 말투로 고객에게 최적의 메뉴를 추천하세요.

추천 시 고려사항:
1. 고객의 원하는 분위기와 기분
2. 카페인 선호도
3. 예산
4. 비건, 글루텐 프리 등 식이 제한
5. 알러지
6. 인스타그래머블 여부

응답 형식 (JSON):
{
  "recommendations": [
    {
      "itemName": "메뉴명",
      "category": "카테고리",
      "price": 가격,
      "description": "상세 설명",
      "dietaryInfo": "식이 정보",
      "reason": "추천 이유 (힙하게)",
      "pairingTip": "페어링 팁"
    }
  ],
  "totalPrice": 총액,
  "baristaNote": "바리스타 한마디",
  "instaTip": "인스타 촬영 팁"
}`,
    userPromptTemplate: (data: any, userInput: any) => {
      return `【카페 메뉴 데이터】
총 ${data.length}개의 메뉴가 준비되어 있습니다.

${data.map((item: any, i: number) => `
${i + 1}. ${item.itemName}
   - 카테고리: ${item.category}
   - 가격: ${item.price.toLocaleString()}원
   - 카페인: ${item.caffeine || '해당없음'}
   - 비건: ${item.isVegan ? 'O' : 'X'}
   - 글루텐프리: ${item.isGlutenFree ? 'O' : 'X'}
   - 알러지: ${Array.isArray(item.allergens) && item.allergens.length > 0 ? item.allergens.join(', ') : '없음'}
   - 설명: ${item.description}
   ${item.instagrammable ? '   📸 인스타그래머블!' : ''}
   - 칼로리: ${item.calories || '미표기'}kcal
`).join('\n')}

【고객 정보】
${userInput?.mood ? `분위기: ${userInput.mood}` : ''}
${userInput?.caffeinePreference ? `카페인: ${userInput.caffeinePreference}` : ''}
${userInput?.budget ? `예산: ${userInput.budget.toLocaleString()}원` : ''}
${userInput?.dietaryRestrictions ? `식이제한: ${userInput.dietaryRestrictions.join(', ')}` : ''}
${userInput?.allergens ? `알러지: ${userInput.allergens.join(', ')}` : ''}
${userInput?.photoWorthy ? `인스타용: ${userInput.photoWorthy}` : ''}

위 정보를 바탕으로 완벽한 브런치&커피를 추천해주세요!
힙하고 세련된 톤으로 설명해주시고, 반드시 valid JSON 형식으로 응답하세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '모던 힙스터',
      description: '트렌디하고 세련된 카페',
      preview: '/themes/cafe-modern.jpg',
      colors: {
        primary: '#14B8A6',
        secondary: '#F59E0B',
        accent: '#EC4899',
        background: '#FFFFFF',
        surface: '#FAFAFA',
        text: '#1F2937',
        textSecondary: '#6B7280',
        border: '#E5E7EB'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '2rem',
        bodySize: '0.95rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1200px',
        borderRadius: '1rem',
        spacing: '1.5rem',
        cardStyle: 'clean'
      },
      components: {
        buttonStyle: 'modern-gradient',
        inputStyle: 'sleek-border',
        cardStyle: 'shadow-soft'
      }
    },
    classic: {
      id: 'classic',
      name: '클래식 빈티지',
      description: '따뜻하고 아늑한 카페',
      preview: '/themes/cafe-classic.jpg',
      colors: {
        primary: '#92400E',
        secondary: '#D97706',
        accent: '#B45309',
        background: '#FFFBEB',
        surface: '#FEF3C7',
        text: '#78350F',
        textSecondary: '#92400E',
        border: '#FDE68A'
      },
      typography: {
        fontFamily: 'Georgia, serif',
        headingSize: '1.875rem',
        bodySize: '1rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1100px',
        borderRadius: '0.75rem',
        spacing: '1.5rem',
        cardStyle: 'vintage'
      },
      components: {
        buttonStyle: 'warm-solid',
        inputStyle: 'classic-rounded',
        cardStyle: 'shadow-warm'
      }
    },
    minimal: {
      id: 'minimal',
      name: '미니멀 스칸디',
      description: '깔끔하고 심플한 북유럽 스타일',
      preview: '/themes/cafe-minimal.jpg',
      colors: {
        primary: '#0F766E',
        secondary: '#64748B',
        accent: '#0D9488',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#0F172A',
        textSecondary: '#475569',
        border: '#CBD5E1'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '1.75rem',
        bodySize: '0.9rem',
        headingWeight: '500',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1000px',
        borderRadius: '0.5rem',
        spacing: '1.25rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'minimal-outline',
        inputStyle: 'underline-only',
        cardStyle: 'border-subtle'
      }
    }
  }
};

