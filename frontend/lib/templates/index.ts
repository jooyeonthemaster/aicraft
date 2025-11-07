/**
 * 템플릿 통합 인덱스
 */

import { Template, IndustryType } from '@/types/templates';
import { restaurantTemplate } from './restaurant';
import { realestateTemplate } from './realestate';
import { medicalTemplate } from './medical';
import { ecommerceTemplate } from './ecommerce';
import { travelTemplate } from './travel';

// 모든 템플릿 맵
export const templates: Record<IndustryType, Template> = {
  restaurant: restaurantTemplate,
  realestate: realestateTemplate,
  medical: medicalTemplate,
  ecommerce: ecommerceTemplate,
  travel: travelTemplate
};

// 템플릿 목록 (선택 UI용)
export const templateList = Object.values(templates);

// 특정 템플릿 가져오기
export function getTemplate(industry: IndustryType): Template {
  const template = templates[industry];
  if (!template) {
    throw new Error(`Template not found for industry: ${industry}`);
  }
  return template;
}

// 템플릿 존재 여부 확인
export function hasTemplate(industry: string): industry is IndustryType {
  return industry in templates;
}

// 업종별 메타데이터
export const industryMetadata = {
  restaurant: {
    title: '요식업',
    subtitle: '메뉴 추천 AI',
    description: '고객의 알러지와 선호도를 분석하여 최적의 메뉴를 추천합니다',
    useCases: ['식당', '카페', '배달 앱', '호텔 레스토랑'],
    color: '#FF6B6B',
    gradient: 'from-red-500 to-pink-500'
  },
  realestate: {
    title: '부동산',
    subtitle: '매물 추천 AI',
    description: '예산과 선호도를 분석하여 최적의 매물을 추천합니다',
    useCases: ['부동산 중개', '아파트 분양', '원룸 매칭', '오피스텔'],
    color: '#2563EB',
    gradient: 'from-blue-500 to-indigo-500'
  },
  medical: {
    title: '의료',
    subtitle: '진료과 추천 AI',
    description: '증상을 분석하여 적절한 진료과를 추천합니다',
    useCases: ['병원', '클리닉', '한의원', '치과'],
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-cyan-500'
  },
  ecommerce: {
    title: '쇼핑몰',
    subtitle: '상품 추천 AI',
    description: '스타일과 선호도를 분석하여 최적의 상품을 추천합니다',
    useCases: ['패션몰', '뷰티샵', '가전몰', '종합몰'],
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-500'
  },
  travel: {
    title: '여행',
    subtitle: '여행지 추천 AI',
    description: '여행 스타일을 분석하여 최적의 여행지를 추천합니다',
    useCases: ['여행사', '투어 플랫폼', '숙박 앱', '항공사'],
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-500'
  }
};

export default templates;

