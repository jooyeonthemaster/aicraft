/**
 * 요식업 템플릿
 * 메뉴 추천 AI 시스템
 */

import { Template, UITheme, ThemeConfig } from '@/types/templates';

export const restaurantTemplate: Template = {
  id: 'restaurant',
  name: '요식업 - 메뉴 추천 AI',
  description: '고객의 알러지, 식습관, 선호도를 분석하여 최적의 메뉴를 추천합니다',
  icon: '🍽️',
  
  dataSchema: {
    fields: [
      {
        name: 'menuName',
        label: '메뉴명',
        type: 'text',
        required: true,
        placeholder: '김치찌개'
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
        name: 'category',
        label: '카테고리',
        type: 'select',
        required: true,
        options: ['한식', '중식', '일식', '양식', '분식', '디저트', '음료']
      },
      {
        name: 'ingredients',
        label: '재료 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '돼지고기, 김치, 두부, 고춧가루'
      },
      {
        name: 'allergens',
        label: '알러지 유발 성분',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
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
        name: 'description',
        label: '메뉴 설명',
        type: 'textarea',
        required: true,
        placeholder: '한국 전통 김치찌개로 얼큰하고 시원한 맛이 특징입니다'
      },
      {
        name: 'isVegetarian',
        label: '채식 가능',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'isVegan',
        label: '비건 가능',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'calories',
        label: '칼로리',
        type: 'number',
        required: false,
        placeholder: '450'
      }
    ],
    requiredFields: ['menuName', 'price', 'category', 'ingredients', 'spicyLevel', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        menuName: '김치찌개',
        price: 12000,
        category: '한식',
        ingredients: ['돼지고기', '김치', '두부', '고춧가루'],
        allergens: ['대두'],
        spicyLevel: 3,
        description: '한국 전통 김치찌개로 얼큰하고 시원한 맛이 특징입니다',
        isVegetarian: false,
        isVegan: false,
        calories: 450
      },
      {
        menuName: '비빔밥',
        price: 13000,
        category: '한식',
        ingredients: ['밥', '나물', '고추장', '달걀', '참기름'],
        allergens: ['계란', '대두'],
        spicyLevel: 2,
        description: '다양한 나물과 고추장을 비벼 먹는 건강한 한식 메뉴',
        isVegetarian: true,
        isVegan: false,
        calories: 520
      },
      {
        menuName: '된장찌개',
        price: 10000,
        category: '한식',
        ingredients: ['된장', '두부', '감자', '호박', '양파'],
        allergens: ['대두'],
        spicyLevel: 1,
        description: '구수한 된장 맛이 일품인 전통 찌개',
        isVegetarian: true,
        isVegan: true,
        calories: 280
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'allergens',
        label: '알러지가 있으신가요?',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류', '없음']
      },
      {
        name: 'dietaryPreferences',
        label: '식습관',
        type: 'multiselect',
        required: false,
        options: ['채식주의자', '비건', '할랄', '코셔', '글루텐프리', '저탄수', '해당없음']
      },
      {
        name: 'spicyTolerance',
        label: '매운맛 선호도 (0: 못 먹음 ~ 5: 아주 매운 것 좋아함)',
        type: 'range',
        required: true,
        min: 0,
        max: 5
      },
      {
        name: 'budget',
        label: '예산 (원)',
        type: 'number',
        required: true,
        placeholder: '15000',
        min: 0
      },
      {
        name: 'preferences',
        label: '추가 선호사항',
        type: 'textarea',
        required: false,
        placeholder: '예: 담백한 맛을 선호합니다, 해산물을 좋아합니다'
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 전문 요식업 메뉴 추천 AI입니다.

고객의 알러지, 식습관, 맵기 선호도, 예산을 고려하여 최적의 메뉴를 추천해주세요.

응답 형식 (반드시 JSON):
{
  "recommendations": [
    {
      "menuName": "메뉴명",
      "reason": "추천 이유 (고객의 선호도와 어떻게 매칭되는지 설명)",
      "matchScore": 95,
      "price": 12000,
      "highlights": ["특징1", "특징2", "특징3"],
      "warnings": ["주의사항 (있을 경우)"]
    }
  ],
  "alternativeOptions": [
    {
      "menuName": "대체 메뉴명",
      "reason": "이 메뉴도 좋은 이유"
    }
  ],
  "dietaryNotes": "식습관 관련 안내 메시지"
}

중요:
1. 알러지 성분이 포함된 메뉴는 절대 추천하지 마세요
2. 맵기 선호도를 반드시 고려하세요
3. 예산 범위 내의 메뉴만 추천하세요
4. 채식/비건 고객에게는 해당 메뉴만 추천하세요
5. 최소 3개 이상의 메뉴를 추천하세요`,

    userPromptTemplate: (menuData: any[], userInput: any) => {
      const menuList = menuData.map(menu => `
메뉴: ${menu.menuName}
가격: ${menu.price}원
카테고리: ${menu.category}
재료: ${menu.ingredients.join(', ')}
알러지 성분: ${menu.allergens?.join(', ') || '없음'}
맵기: ${menu.spicyLevel}/5
채식 가능: ${menu.isVegetarian ? '예' : '아니오'}
비건 가능: ${menu.isVegan ? '예' : '아니오'}
설명: ${menu.description}
칼로리: ${menu.calories || '정보 없음'}kcal
`).join('\n---\n');

      return `다음 메뉴 목록에서 고객에게 최적의 메뉴를 추천해주세요.

【메뉴 데이터】
${menuList}

【고객 정보】
알러지: ${userInput.allergens?.join(', ') || '없음'}
식습관: ${userInput.dietaryPreferences?.join(', ') || '해당없음'}
매운맛 선호도: ${userInput.spicyTolerance}/5
예산: ${userInput.budget}원
추가 선호사항: ${userInput.preferences || '없음'}

위 고객 정보를 바탕으로 최적의 메뉴를 JSON 형식으로 추천해주세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '모던 다크',
      description: '세련된 다크 테마로 트렌디한 레스토랑에 적합',
      preview: '/themes/restaurant-modern.png',
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        background: '#1A1A2E',
        surface: '#16213E',
        text: '#FFFFFF',
        textSecondary: '#B0B0B0',
        border: '#2A2A3E'
      },
      typography: {
        fontFamily: "'Pretendard', sans-serif",
        headingSize: '2.5rem',
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
        buttonStyle: 'rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg',
        inputStyle: 'rounded-lg bg-gray-800 border-gray-700',
        cardStyle: 'rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl'
      }
    },
    classic: {
      id: 'classic',
      name: '클래식 따뜻함',
      description: '따뜻하고 아늑한 분위기의 전통 레스토랑 테마',
      preview: '/themes/restaurant-classic.png',
      colors: {
        primary: '#D4845D',
        secondary: '#8B4513',
        accent: '#F4A460',
        background: '#FFF8F0',
        surface: '#FFFFFF',
        text: '#2C2416',
        textSecondary: '#6B5D4F',
        border: '#E5D4C1'
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
        borderRadius: '12px',
        spacing: '1.25rem',
        cardStyle: 'bordered'
      },
      components: {
        buttonStyle: 'rounded-lg bg-amber-600 hover:bg-amber-700 shadow-md',
        inputStyle: 'rounded-md border-2 border-amber-200 bg-white',
        cardStyle: 'rounded-xl border-2 border-amber-200 bg-white shadow-lg'
      }
    },
    minimal: {
      id: 'minimal',
      name: '미니멀 화이트',
      description: '깔끔하고 심플한 현대적 디자인',
      preview: '/themes/restaurant-minimal.png',
      colors: {
        primary: '#000000',
        secondary: '#6B7280',
        accent: '#3B82F6',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: '#111827',
        textSecondary: '#6B7280',
        border: '#E5E7EB'
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
        borderRadius: '8px',
        spacing: '1rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'rounded-md bg-black hover:bg-gray-800 shadow-sm',
        inputStyle: 'rounded-md border border-gray-300 bg-white',
        cardStyle: 'rounded-lg border border-gray-200 bg-white shadow-sm'
      }
    }
  }
};

