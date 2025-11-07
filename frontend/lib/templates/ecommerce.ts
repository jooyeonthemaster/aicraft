/**
 * 쇼핑몰 템플릿
 * 상품 추천 AI 시스템
 */

import { Template } from '@/types/templates';

export const ecommerceTemplate: Template = {
  id: 'ecommerce',
  name: '쇼핑몰 - 상품 추천 AI',
  description: '고객의 스타일과 선호도를 분석하여 최적의 상품을 추천합니다',
  icon: '🛍️',
  
  dataSchema: {
    fields: [
      {
        name: 'productName',
        label: '상품명',
        type: 'text',
        required: true,
        placeholder: '프리미엄 면 티셔츠'
      },
      {
        name: 'price',
        label: '가격 (원)',
        type: 'number',
        required: true,
        placeholder: '39000'
      },
      {
        name: 'category',
        label: '카테고리',
        type: 'select',
        required: true,
        options: ['의류', '신발', '가방', '액세서리', '화장품', '가전', '가구', '도서', '식품', '스포츠']
      },
      {
        name: 'brand',
        label: '브랜드',
        type: 'text',
        required: true,
        placeholder: 'BASIC'
      },
      {
        name: 'tags',
        label: '태그 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '베이직, 데일리, 편안함'
      },
      {
        name: 'colors',
        label: '색상 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: '화이트, 블랙, 그레이'
      },
      {
        name: 'sizes',
        label: '사이즈 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: 'S, M, L, XL'
      },
      {
        name: 'description',
        label: '상품 설명',
        type: 'textarea',
        required: true
      },
      {
        name: 'rating',
        label: '평점 (0-5)',
        type: 'range',
        required: false,
        min: 0,
        max: 5
      },
      {
        name: 'stock',
        label: '재고 수량',
        type: 'number',
        required: true,
        min: 0
      }
    ],
    requiredFields: ['productName', 'price', 'category', 'brand', 'tags', 'description', 'stock'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        productName: '프리미엄 면 티셔츠',
        price: 39000,
        category: '의류',
        brand: 'BASIC',
        tags: ['베이직', '데일리', '편안함', '사계절'],
        colors: ['화이트', '블랙', '그레이', '네이비'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: '부드러운 면 소재의 편안한 티셔츠입니다',
        rating: 4.5,
        stock: 150
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
        placeholder: '50000'
      },
      {
        name: 'preferredStyles',
        label: '선호 스타일 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: '예: 캐주얼, 모던, 미니멀'
      },
      {
        name: 'preferredBrands',
        label: '선호 브랜드 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: '예: BASIC, PREMIUM'
      },
      {
        name: 'purpose',
        label: '구매 목적',
        type: 'select',
        required: true,
        options: ['일상용', '특별한 날', '선물', '운동', '업무', '여행']
      },
      {
        name: 'preferences',
        label: '추가 선호사항',
        type: 'textarea',
        required: false,
        placeholder: '예: 편안한 착용감 중요, 심플한 디자인 선호'
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 전문 쇼핑 큐레이터 AI입니다.

고객의 예산, 스타일, 브랜드 선호도, 구매 목적을 분석하여 최적의 상품을 추천해주세요.

응답 형식 (반드시 JSON):
{
  "recommendations": [
    {
      "productName": "상품명",
      "brand": "브랜드",
      "price": 39000,
      "reason": "추천 이유",
      "matchScore": 95,
      "styling": "스타일링 제안",
      "highlights": ["장점1", "장점2", "장점3"]
    }
  ],
  "styleAdvice": "스타일링 조언",
  "trendInsight": "트렌드 인사이트",
  "alternativeProducts": [
    {
      "productName": "대체 상품명",
      "reason": "이 상품도 좋은 이유"
    }
  ]
}

추천 시 고려사항:
1. 예산 범위 내 상품만 추천하세요
2. 재고가 있는 상품만 추천하세요
3. 고객의 스타일과 목적에 맞는 상품을 우선하세요
4. 평점과 인기도도 고려하세요`,

    userPromptTemplate: (productData: any[], userInput: any) => {
      const productList = productData.map(prod => `
상품: ${prod.productName}
가격: ${prod.price}원
카테고리: ${prod.category}
브랜드: ${prod.brand}
태그: ${prod.tags.join(', ')}
색상: ${prod.colors?.join(', ') || '정보 없음'}
사이즈: ${prod.sizes?.join(', ') || '정보 없음'}
설명: ${prod.description}
평점: ${prod.rating || '정보 없음'}/5
재고: ${prod.stock}개
`).join('\n---\n');

      return `다음 상품 목록에서 고객에게 최적의 상품을 추천해주세요.

【상품 데이터】
${productList}

【고객 정보】
예산: ${userInput.budget}원
선호 스타일: ${userInput.preferredStyles || '무관'}
선호 브랜드: ${userInput.preferredBrands || '무관'}
구매 목적: ${userInput.purpose}
추가 선호사항: ${userInput.preferences || '없음'}

위 고객 정보를 바탕으로 최적의 상품을 JSON 형식으로 추천해주세요.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '트렌디',
      description: '세련되고 트렌디한 쇼핑몰 테마',
      preview: '/themes/ecommerce-trendy.png',
      colors: {
        primary: '#EC4899',
        secondary: '#DB2777',
        accent: '#F472B6',
        background: '#FFF1F2',
        surface: '#FFFFFF',
        text: '#881337',
        textSecondary: '#9F1239',
        border: '#FECDD3'
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
        borderRadius: '20px',
        spacing: '1.5rem',
        cardStyle: 'elevated'
      },
      components: {
        buttonStyle: 'rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg',
        inputStyle: 'rounded-xl border border-pink-200 bg-white',
        cardStyle: 'rounded-2xl bg-gradient-to-br from-white to-pink-50 shadow-xl'
      }
    },
    classic: {
      id: 'classic',
      name: '엘레강트',
      description: '고급스럽고 우아한 럭셔리 테마',
      preview: '/themes/ecommerce-elegant.png',
      colors: {
        primary: '#7C3AED',
        secondary: '#6D28D9',
        accent: '#A78BFA',
        background: '#FAF5FF',
        surface: '#FFFFFF',
        text: '#4C1D95',
        textSecondary: '#6B21A8',
        border: '#E9D5FF'
      },
      typography: {
        fontFamily: "'Noto Serif KR', serif",
        headingSize: '2rem',
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
        buttonStyle: 'rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg',
        inputStyle: 'rounded-lg border-2 border-purple-200 bg-white',
        cardStyle: 'rounded-2xl bg-white shadow-xl border-2 border-purple-200'
      }
    },
    minimal: {
      id: 'minimal',
      name: '캐주얼',
      description: '깔끔하고 편안한 캐주얼 디자인',
      preview: '/themes/ecommerce-casual.png',
      colors: {
        primary: '#14B8A6',
        secondary: '#0D9488',
        accent: '#2DD4BF',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: '#134E4A',
        textSecondary: '#6B7280',
        border: '#99F6E4'
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
        borderRadius: '12px',
        spacing: '1.25rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'rounded-lg bg-teal-500 hover:bg-teal-600 shadow-md',
        inputStyle: 'rounded-md border border-teal-200 bg-white',
        cardStyle: 'rounded-xl border border-teal-200 bg-white shadow-sm'
      }
    }
  }
};

