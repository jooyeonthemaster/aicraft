/**
 * 🥗 Fast Casual Template - 패스트 캐주얼
 * 건강식, 샐러드바, 포케볼 등
 */

import { Template, UITheme, ThemeConfig } from '@/types/templates';

export const fastCasualTemplate: Template = {
  id: 'fast-casual',
  name: '패스트 캐주얼 - Fast Casual',
  description: '빠르고 건강한 식사, 신선한 재료로 만든 웰빙 메뉴를 제공합니다',
  icon: '🥗',
  
  dataSchema: {
    fields: [
      {
        name: 'dishName',
        label: '메뉴명',
        type: 'text',
        required: true,
        placeholder: '퀴노아 파워볼'
      },
      {
        name: 'category',
        label: '카테고리',
        type: 'select',
        required: true,
        options: ['샐러드', '포케볼', '랩', '스무디볼', '프로틴볼', '수프', '주스']
      },
      {
        name: 'price',
        label: '가격',
        type: 'number',
        required: true,
        placeholder: '13500',
        min: 0
      },
      {
        name: 'calories',
        label: '칼로리',
        type: 'number',
        required: true,
        placeholder: '350'
      },
      {
        name: 'protein',
        label: '단백질 (g)',
        type: 'number',
        required: false,
        placeholder: '25'
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
        name: 'isKeto',
        label: '키토',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'allergens',
        label: '알러지 유발 성분',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'description',
        label: '메뉴 설명',
        type: 'textarea',
        required: true,
        placeholder: '신선한 퀴노아와 구운 닭가슴살, 아보카도가 들어간 건강식'
      },
      {
        name: 'mainIngredient',
        label: '주재료',
        type: 'text',
        required: false,
        placeholder: '닭가슴살, 연어, 두부 등'
      }
    ],
    requiredFields: ['dishName', 'category', 'price', 'calories', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        dishName: '슈퍼푸드 파워볼',
        category: '포케볼',
        price: 14500,
        calories: 420,
        protein: 32,
        isVegan: false,
        isGlutenFree: true,
        isKeto: false,
        allergens: ['생선'],
        description: '연어, 퀴노아, 아보카도, 에다마메, 방울토마토가 들어간 영양 만점 파워볼',
        mainIngredient: '연어'
      },
      {
        dishName: '케일 시저 샐러드',
        category: '샐러드',
        price: 12000,
        calories: 280,
        protein: 25,
        isVegan: false,
        isGlutenFree: false,
        isKeto: true,
        allergens: ['계란', '우유'],
        description: '신선한 케일과 구운 닭가슴살, 파르메산 치즈, 시저 드레싱',
        mainIngredient: '닭가슴살'
      },
      {
        dishName: '비건 부리또 볼',
        category: '샐러드',
        price: 13000,
        calories: 350,
        protein: 18,
        isVegan: true,
        isGlutenFree: true,
        isKeto: false,
        allergens: [],
        description: '검은콩, 현미, 아보카도, 토마토 살사, 코리안더로 만든 100% 식물성 볼',
        mainIngredient: '검은콩'
      },
      {
        dishName: '프로틴 치킨 랩',
        category: '랩',
        price: 11500,
        calories: 380,
        protein: 35,
        isVegan: false,
        isGlutenFree: false,
        isKeto: false,
        allergens: ['밀가루', '우유'],
        description: '고단백 닭가슴살, 신선한 야채, 요거트 소스가 들어간 헬시 랩',
        mainIngredient: '닭가슴살'
      },
      {
        dishName: '아사이 스무디볼',
        category: '스무디볼',
        price: 13000,
        calories: 320,
        protein: 12,
        isVegan: true,
        isGlutenFree: true,
        isKeto: false,
        allergens: ['견과류'],
        description: '슈퍼푸드 아사이베리, 바나나, 그래놀라, 신선한 과일 토핑',
        mainIngredient: '아사이베리'
      },
      {
        dishName: '참치 포케볼',
        category: '포케볼',
        price: 15500,
        calories: 390,
        protein: 38,
        isVegan: false,
        isGlutenFree: true,
        isKeto: false,
        allergens: ['생선', '대두'],
        description: '신선한 참치회, 현미, 아보카도, 김, 간장 드레싱',
        mainIngredient: '참치'
      },
      {
        dishName: '치킨 시저 랩',
        category: '랩',
        price: 10500,
        calories: 350,
        protein: 30,
        isVegan: false,
        isGlutenFree: false,
        isKeto: false,
        allergens: ['밀가루', '계란', '우유'],
        description: '구운 닭가슴살과 로메인, 시저 드레싱을 토르티야로 감싼 랩',
        mainIngredient: '닭가슴살'
      },
      {
        dishName: '두부 샐러드',
        category: '샐러드',
        price: 11000,
        calories: 280,
        protein: 20,
        isVegan: true,
        isGlutenFree: true,
        isKeto: false,
        allergens: ['대두'],
        description: '구운 두부, 혼합 채소, 참깨 드레싱',
        mainIngredient: '두부'
      },
      {
        dishName: '프로틴 스무디',
        category: '스무디볼',
        price: 9500,
        calories: 250,
        protein: 25,
        isVegan: true,
        isGlutenFree: true,
        isKeto: false,
        allergens: [],
        description: '바나나, 피넛버터, 식물성 프로틴 파우더',
        mainIngredient: '식물성 프로틴'
      },
      {
        dishName: '퀴노아 볼',
        category: '샐러드',
        price: 13500,
        calories: 380,
        protein: 22,
        isVegan: true,
        isGlutenFree: true,
        isKeto: false,
        allergens: [],
        description: '퀴노아, 병아리콩, 구운 야채, 타히니 드레싱',
        mainIngredient: '퀴노아'
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'fitnessGoal',
        label: '목표',
        type: 'select',
        required: false,
        options: ['다이어트', '근력 증가', '체중 유지', '건강 관리']
      },
      {
        name: 'calorieLimit',
        label: '목표 칼로리',
        type: 'number',
        required: false,
        placeholder: '500'
      },
      {
        name: 'proteinNeeds',
        label: '단백질 필요량',
        type: 'select',
        required: false,
        options: ['저 (15g 이하)', '중 (15-25g)', '고 (25g 이상)']
      },
      {
        name: 'dietType',
        label: '식단 유형',
        type: 'multiselect',
        required: false,
        options: ['비건', '글루텐 프리', '키토', '저탄수']
      },
      {
        name: 'allergens',
        label: '알러지',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'mealTiming',
        label: '식사 시간',
        type: 'select',
        required: false,
        options: ['아침', '점심', '저녁', '운동 후']
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 영양 전문 지식을 갖춘 건강식 레스토랑의 친절한 영양사입니다.

건강하고 활기찬 말투로 고객에게 최적의 메뉴를 추천하세요.

추천 시 고려사항:
1. 고객의 피트니스 목표
2. 칼로리 및 단백질 요구량
3. 식단 유형 (비건, 키토 등)
4. 알러지
5. 식사 시간대

응답 형식 (JSON):
{
  "recommendations": [
    {
      "dishName": "메뉴명",
      "category": "카테고리",
      "price": 가격,
      "calories": 칼로리,
      "protein": 단백질,
      "description": "상세 설명",
      "nutritionTip": "영양 정보",
      "reason": "추천 이유",
      "fitnessNote": "운동/다이어트 팁"
    }
  ],
  "totalCalories": 총칼로리,
  "totalProtein": 총단백질,
  "nutritionistNote": "영양사 조언",
  "hydrationTip": "수분 섭취 팁"
}`,
    userPromptTemplate: (data: any, userInput: any) => {
      return `【건강식 메뉴 데이터】
총 ${data.length}개의 메뉴가 준비되어 있습니다.

${data.map((dish: any, i: number) => `
${i + 1}. ${dish.dishName}
   - 카테고리: ${dish.category}
   - 가격: ${dish.price.toLocaleString()}원
   - 칼로리: ${dish.calories}kcal
   - 단백질: ${dish.protein || '미표기'}g
   - 비건: ${dish.isVegan ? 'O' : 'X'}
   - 글루텐프리: ${dish.isGlutenFree ? 'O' : 'X'}
   - 키토: ${dish.isKeto ? 'O' : 'X'}
   - 알러지: ${Array.isArray(dish.allergens) && dish.allergens.length > 0 ? dish.allergens.join(', ') : '없음'}
   - 주재료: ${dish.mainIngredient || '미표기'}
   - 설명: ${dish.description}
`).join('\n')}

【고객 정보】
${userInput?.fitnessGoal ? `목표: ${userInput.fitnessGoal}` : ''}
${userInput?.calorieLimit ? `목표 칼로리: ${userInput.calorieLimit}kcal` : ''}
${userInput?.proteinNeeds ? `단백질: ${userInput.proteinNeeds}` : ''}
${userInput?.dietType ? `식단: ${userInput.dietType.join(', ')}` : ''}
${userInput?.allergens ? `알러지: ${userInput.allergens.join(', ')}` : ''}
${userInput?.mealTiming ? `식사시간: ${userInput.mealTiming}` : ''}

위 정보를 바탕으로 최적의 건강 메뉴를 추천해주세요!
건강하고 전문적인 톤으로 설명해주시고, 반드시 valid JSON 형식으로 응답하세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '모던 헬시',
      description: '깨끗하고 신선한 느낌',
      preview: '/themes/fast-modern.jpg',
      colors: {
        primary: '#10B981',
        secondary: '#34D399',
        accent: '#059669',
        background: '#FFFFFF',
        surface: '#F0FDF4',
        text: '#064E3B',
        textSecondary: '#047857',
        border: '#D1FAE5'
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
        cardStyle: 'fresh'
      },
      components: {
        buttonStyle: 'green-gradient',
        inputStyle: 'clean-border',
        cardStyle: 'shadow-green'
      }
    },
    classic: {
      id: 'classic',
      name: '클래식 내추럴',
      description: '자연스럽고 유기적인 느낌',
      preview: '/themes/fast-classic.jpg',
      colors: {
        primary: '#16A34A',
        secondary: '#84CC16',
        accent: '#65A30D',
        background: '#F7FEE7',
        surface: '#FEFCE8',
        text: '#3F6212',
        textSecondary: '#4D7C0F',
        border: '#D9F99D'
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
        cardStyle: 'organic'
      },
      components: {
        buttonStyle: 'natural-solid',
        inputStyle: 'soft-border',
        cardStyle: 'shadow-natural'
      }
    },
    minimal: {
      id: 'minimal',
      name: '미니멀 클린',
      description: '깔끔하고 단순한 건강미',
      preview: '/themes/fast-minimal.jpg',
      colors: {
        primary: '#14B8A6',
        secondary: '#5EEAD4',
        accent: '#0D9488',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: '#1F2937',
        textSecondary: '#6B7280',
        border: '#D1D5DB'
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
        cardStyle: 'simple'
      },
      components: {
        buttonStyle: 'outline-minimal',
        inputStyle: 'borderless',
        cardStyle: 'flat-clean'
      }
    }
  }
};

