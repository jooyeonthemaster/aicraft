/**
 * 🌟 Fine Dining Template - 파인다이닝
 * 미슐랭 스타일 고급 레스토랑
 */

import { Template, UITheme, ThemeConfig } from '@/types/templates';

export const fineDiningTemplate: Template = {
  id: 'fine-dining',
  name: '파인다이닝 - Fine Dining',
  description: '미슐랭 스타일의 고급 코스 요리와 와인 페어링으로 최상의 다이닝 경험을 제공합니다',
  icon: '🌟',
  
  dataSchema: {
    fields: [
      {
        name: 'dishName',
        label: '요리명',
        type: 'text',
        required: true,
        placeholder: '프렌치 오니언 수프'
      },
      {
        name: 'courseType',
        label: '코스 종류',
        type: 'select',
        required: true,
        options: ['Amuse-bouche', 'Appetizer', 'Soup', 'Main Course', 'Dessert', 'Digestif']
      },
      {
        name: 'price',
        label: '가격',
        type: 'number',
        required: true,
        placeholder: '45000',
        min: 0
      },
      {
        name: 'ingredients',
        label: '재료 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '송로버섯, 푸아그라, 블랙 트러플'
      },
      {
        name: 'winePairing',
        label: '와인 페어링',
        type: 'text',
        required: false,
        placeholder: 'Château Margaux 2015'
      },
      {
        name: 'allergens',
        label: '알러지 유발 성분',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'michelinStars',
        label: '미슐랭 스타 수준',
        type: 'range',
        required: false,
        min: 0,
        max: 3
      },
      {
        name: 'description',
        label: '요리 설명',
        type: 'textarea',
        required: true,
        placeholder: '프랑스 전통 방식으로 조리한 양파 수프에 그뤼에르 치즈를 얹어 완성했습니다'
      },
      {
        name: 'platingStyle',
        label: '플레이팅 스타일',
        type: 'text',
        required: false,
        placeholder: '아방가르드'
      },
      {
        name: 'chefSpecial',
        label: '셰프 특선',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      }
    ],
    requiredFields: ['dishName', 'courseType', 'price', 'ingredients', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        dishName: '트러플 향 푸아그라 테린',
        courseType: 'Appetizer',
        price: 48000,
        ingredients: ['푸아그라', '블랙 트러플', '브리오슈'],
        winePairing: 'Sauternes, Château d\'Yquem',
        allergens: ['계란', '밀가루'],
        michelinStars: 3,
        description: '프랑스산 최고급 푸아그라를 이탈리아 트러플로 감싼 시그니처 요리',
        platingStyle: '모더니스트',
        chefSpecial: true
      },
      {
        dishName: '랍스터 비스크',
        courseType: 'Soup',
        price: 35000,
        ingredients: ['랍스터', '코냑', '생크림', '토마토'],
        winePairing: 'Chablis Grand Cru',
        allergens: ['갑각류', '우유'],
        michelinStars: 2,
        description: '신선한 랍스터 육수에 코냑을 더한 부드러운 수프',
        platingStyle: '클래식',
        chefSpecial: false
      },
      {
        dishName: '와규 필레 미뇽',
        courseType: 'Main Course',
        price: 120000,
        ingredients: ['일본산 A5 와규', '푸아그라', '송로버섯', '적포도주 소스'],
        winePairing: 'Château Lafite Rothschild',
        allergens: [],
        michelinStars: 3,
        description: '일본산 최고급 와규에 푸아그라와 송로버섯을 곁들인 메인 요리',
        platingStyle: '아방가르드',
        chefSpecial: true
      },
      {
        dishName: '캐비어를 곁들인 홋카이도 성게알',
        courseType: 'Amuse-bouche',
        price: 25000,
        ingredients: ['홋카이도 성게알', '벨루가 캐비어', '골든 리프'],
        winePairing: 'Dom Pérignon',
        allergens: ['생선'],
        michelinStars: 3,
        description: '금박을 입힌 한입 크기의 극상 아뮤즈부슈',
        platingStyle: '모더니스트',
        chefSpecial: true
      },
      {
        dishName: '발로나 초콜릿 무스',
        courseType: 'Dessert',
        price: 28000,
        ingredients: ['발로나 다크 초콜릿', '마스카르포네', '금박', '베리 컴포트'],
        winePairing: 'Eiswein',
        allergens: ['우유', '계란'],
        michelinStars: 2,
        description: '프랑스 발로나 초콜릿으로 만든 벨벳 같은 무스',
        platingStyle: '엘레강스',
        chefSpecial: false
      },
      {
        dishName: '프렌치 어니언 수프',
        courseType: 'Soup',
        price: 22000,
        ingredients: ['양파', '그뤼에르 치즈', '바게트', '비프 스톡'],
        winePairing: 'Beaujolais',
        allergens: ['우유', '밀가루'],
        michelinStars: 2,
        description: '프랑스 전통 방식으로 캐러멜라이즈한 양파 수프',
        platingStyle: '클래식',
        chefSpecial: false
      },
      {
        dishName: '오마카세 스시 코스',
        courseType: 'Main Course',
        price: 180000,
        ingredients: ['참치 대토로', '성게', '도미', '전복', '장어'],
        winePairing: 'Sake Daiginjo',
        allergens: ['생선', '대두'],
        michelinStars: 3,
        description: '제철 생선으로 구성된 12가지 스시 코스',
        platingStyle: '정통',
        chefSpecial: true
      },
      {
        dishName: '트러플 리조또',
        courseType: 'Main Course',
        price: 52000,
        ingredients: ['아르보리오 쌀', '화이트 트러플', '파르미지아노', '버터'],
        winePairing: 'Barolo',
        allergens: ['우유'],
        michelinStars: 2,
        description: '이탈리아 화이트 트러플을 듬뿍 올린 크리미한 리조또',
        platingStyle: '모던',
        chefSpecial: true
      },
      {
        dishName: '오리 콩피',
        courseType: 'Main Course',
        price: 65000,
        ingredients: ['오리 다리', '오렌지 소스', '감자 그라탕'],
        winePairing: 'Pinot Noir',
        allergens: ['우유'],
        michelinStars: 2,
        description: '저온에서 12시간 조리한 오리 콩피와 오렌지 소스',
        platingStyle: '클래식',
        chefSpecial: false
      },
      {
        dishName: '크렘 브륄레',
        courseType: 'Dessert',
        price: 18000,
        ingredients: ['바닐라빈', '달걀 노른자', '생크림', '설탕'],
        winePairing: 'Sauternes',
        allergens: ['계란', '우유'],
        michelinStars: 1,
        description: '마다가스카르 바닐라빈으로 만든 정통 크렘 브륄레',
        platingStyle: '클래식',
        chefSpecial: false
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'occasion',
        label: '방문 목적',
        type: 'select',
        required: false,
        options: ['기념일', '비즈니스 미팅', '데이트', '가족 모임', '미식 체험']
      },
      {
        name: 'budget',
        label: '예산 (1인당)',
        type: 'number',
        required: false,
        placeholder: '150000'
      },
      {
        name: 'coursePreference',
        label: '코스 선호도',
        type: 'multiselect',
        required: false,
        options: ['Appetizer', 'Soup', 'Main Course', 'Dessert']
      },
      {
        name: 'allergens',
        label: '알러지',
        type: 'multiselect',
        required: false,
        options: ['땅콩', '우유', '계란', '밀가루', '갑각류', '대두', '생선', '견과류']
      },
      {
        name: 'wineIncluded',
        label: '와인 페어링 포함',
        type: 'select',
        required: false,
        options: ['예', '아니오']
      },
      {
        name: 'dietaryRestrictions',
        label: '식이 제한',
        type: 'text',
        required: false,
        placeholder: '채식주의, 비건 등'
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 미슐랭 3스타 레스토랑의 전문 소믈리에이자 요리 추천 전문가입니다.

고급스럽고 세련된 말투로 고객에게 최상의 다이닝 경험을 제공하세요.

추천 시 고려사항:
1. 손님의 방문 목적과 예산
2. 코스의 조화와 균형
3. 와인 페어링의 적절성
4. 알러지 및 식이 제한
5. 미슐랭 스타 수준

응답 형식 (JSON):
{
  "recommendations": [
    {
      "dishName": "요리명",
      "courseType": "코스 종류",
      "price": 가격,
      "description": "상세 설명",
      "winePairing": "추천 와인",
      "reason": "추천 이유 (고급스럽게)",
      "michelinRating": 별점
    }
  ],
  "totalPrice": 총액,
  "courseSuggestion": "코스 구성 제안",
  "sommelierNote": "소믈리에 한마디"
}`,
    userPromptTemplate: (data: any, userInput: any) => {
      return `【레스토랑 메뉴 데이터】
총 ${data.length}개의 요리가 준비되어 있습니다.

${data.map((dish: any, i: number) => `
${i + 1}. ${dish.dishName}
   - 코스: ${dish.courseType}
   - 가격: ${dish.price.toLocaleString()}원
   - 재료: ${Array.isArray(dish.ingredients) ? dish.ingredients.join(', ') : dish.ingredients}
   - 와인: ${dish.winePairing || '없음'}
   - 알러지: ${Array.isArray(dish.allergens) && dish.allergens.length > 0 ? dish.allergens.join(', ') : '없음'}
   - 미슐랭: ${'⭐'.repeat(dish.michelinStars || 0)}
   - 설명: ${dish.description}
   ${dish.chefSpecial ? '   ✨ 셰프 특선 요리' : ''}
`).join('\n')}

【고객 정보】
${userInput?.occasion ? `방문 목적: ${userInput.occasion}` : ''}
${userInput?.budget ? `예산: ${userInput.budget.toLocaleString()}원` : ''}
${userInput?.coursePreference ? `코스 선호: ${userInput.coursePreference.join(', ')}` : ''}
${userInput?.allergens ? `알러지: ${userInput.allergens.join(', ')}` : ''}
${userInput?.wineIncluded ? `와인 페어링: ${userInput.wineIncluded}` : ''}
${userInput?.dietaryRestrictions ? `식이 제한: ${userInput.dietaryRestrictions}` : ''}

위 정보를 바탕으로 최상의 코스 메뉴를 추천해주세요.
고급스럽고 전문적인 톤으로 설명해주시고, 반드시 valid JSON 형식으로 응답하세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '모던 럭셔리',
      description: '현대적이고 세련된 파인다이닝',
      preview: '/themes/fine-modern.jpg',
      colors: {
        primary: '#115E59',      // Deep Teal
        secondary: '#D4AF37',    // Gold
        accent: '#0D9488',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#0F172A',
        textSecondary: '#64748B',
        border: '#E2E8F0'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '2.5rem',
        bodySize: '1rem',
        headingWeight: '700',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1200px',
        borderRadius: '1rem',
        spacing: '2rem',
        cardStyle: 'elevated'
      },
      components: {
        buttonStyle: 'gradient-luxury',
        inputStyle: 'minimal-border',
        cardStyle: 'shadow-luxury'
      }
    },
    classic: {
      id: 'classic',
      name: '클래식 엘레강스',
      description: '전통적이고 우아한 파인다이닝',
      preview: '/themes/fine-classic.jpg',
      colors: {
        primary: '#8B4513',      // Saddle Brown
        secondary: '#D4AF37',    // Gold
        accent: '#A0522D',
        background: '#FFF8DC',
        surface: '#FFFAF0',
        text: '#2C1810',
        textSecondary: '#8B7355',
        border: '#D2B48C'
      },
      typography: {
        fontFamily: 'Georgia, serif',
        headingSize: '2.25rem',
        bodySize: '1.05rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1100px',
        borderRadius: '0.5rem',
        spacing: '1.75rem',
        cardStyle: 'bordered'
      },
      components: {
        buttonStyle: 'classic-raised',
        inputStyle: 'classic-border',
        cardStyle: 'shadow-subtle'
      }
    },
    minimal: {
      id: 'minimal',
      name: '미니멀 퓨어',
      description: '깔끔하고 심플한 파인다이닝',
      preview: '/themes/fine-minimal.jpg',
      colors: {
        primary: '#1E293B',      // Slate
        secondary: '#C0C0C0',    // Silver
        accent: '#64748B',
        background: '#FFFFFF',
        surface: '#FAFAFA',
        text: '#0F172A',
        textSecondary: '#94A3B8',
        border: '#E2E8F0'
      },
      typography: {
        fontFamily: 'var(--font-display)',
        headingSize: '2rem',
        bodySize: '0.95rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '1000px',
        borderRadius: '0.75rem',
        spacing: '1.5rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'minimal-ghost',
        inputStyle: 'minimal-underline',
        cardStyle: 'border-only'
      }
    }
  }
};

