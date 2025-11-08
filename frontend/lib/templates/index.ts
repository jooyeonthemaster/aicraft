/**
 * ✨ 템플릿 통합 인덱스 - 요식업 5가지 컨셉
 * Rolex-Inspired Design System
 */

import { Template, IndustryType } from '@/types/templates';
import { fineDiningTemplate } from './fine-dining';
import { casualDiningTemplate } from './casual-dining';
import { cafeBrunchTemplate } from './cafe-brunch';
import { fastCasualTemplate } from './fast-casual';
import { ethnicDiningTemplate } from './ethnic-dining';

// 모든 템플릿 맵 (요식업 5가지 컨셉)
export const templates: Record<IndustryType, Template> = {
  'fine-dining': fineDiningTemplate,
  'casual-dining': casualDiningTemplate,
  'cafe-brunch': cafeBrunchTemplate,
  'fast-casual': fastCasualTemplate,
  'ethnic-dining': ethnicDiningTemplate
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

// ✨ 요식업 5가지 컨셉별 메타데이터 (Rolex-Inspired)
export const industryMetadata = {
  'fine-dining': {
    title: '파인다이닝',
    subtitle: 'Fine Dining',
    description: '미슐랭 스타일의 고급 코스 요리와 와인 페어링',
    useCases: ['미슐랭 레스토랑', '고급 프렌치', '이탈리안 다이닝', '코스 요리'],
    color: '#115E59',      // Deep Teal
    gradient: 'from-teal-800 to-amber-600',
    icon: '🌟'
  },
  'casual-dining': {
    title: '캐주얼 다이닝',
    subtitle: 'Casual Dining',
    description: '가족과 함께하는 즐거운 식사, 편안하고 맛있는 메뉴',
    useCases: ['가족 레스토랑', '치킨집', '피자 전문점', '버거 맛집'],
    color: '#14B8A6',      // Teal
    gradient: 'from-teal-500 to-orange-500',
    icon: '🍗'
  },
  'cafe-brunch': {
    title: '카페 & 브런치',
    subtitle: 'Cafe & Brunch',
    description: '힙한 카페에서 즐기는 커피와 브런치',
    useCases: ['모던 카페', '브런치 전문점', '베이커리', '디저트 카페'],
    color: '#0D9488',      // Teal Dark
    gradient: 'from-teal-600 to-amber-400',
    icon: '☕'
  },
  'fast-casual': {
    title: '패스트 캐주얼',
    subtitle: 'Fast Casual',
    description: '빠르고 건강한 식사, 신선한 재료의 웰빙 메뉴',
    useCases: ['샐러드바', '포케볼', '헬시 푸드', '단백질 전문점'],
    color: '#10B981',      // Green
    gradient: 'from-emerald-500 to-teal-500',
    icon: '🥗'
  },
  'ethnic-dining': {
    title: '에스닉 다이닝',
    subtitle: 'Ethnic Dining',
    description: '세계 각국의 정통 요리로 떠나는 미식 여행',
    useCases: ['중식당', '일식당', '태국음식', '베트남쌀국수'],
    color: '#DC2626',      // Red
    gradient: 'from-red-600 to-amber-500',
    icon: '🌍'
  }
};

export default templates;

