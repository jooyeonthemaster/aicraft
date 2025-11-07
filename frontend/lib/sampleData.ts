/**
 * 샘플 데이터
 * 각 템플릿별 풍부한 예시 데이터
 */

import { IndustryType } from '@/types/templates';

export const sampleData: Record<IndustryType, any[]> = {
  restaurant: [
    { menuName: '김치찌개', price: 12000, category: '한식', ingredients: ['돼지고기', '김치', '두부'], allergens: ['대두'], spicyLevel: 3, description: '얼큰하고 시원한 국물 요리', isVegetarian: false, isVegan: false, calories: 450 },
    { menuName: '비빔밥', price: 13000, category: '한식', ingredients: ['밥', '나물', '고추장', '달걀'], allergens: ['계란', '대두'], spicyLevel: 2, description: '건강한 한식 대표 메뉴', isVegetarian: true, isVegan: false, calories: 520 },
    { menuName: '된장찌개', price: 10000, category: '한식', ingredients: ['된장', '두부', '감자', '호박'], allergens: ['대두'], spicyLevel: 1, description: '구수한 된장 맛', isVegetarian: true, isVegan: true, calories: 280 },
    { menuName: '불고기', price: 18000, category: '한식', ingredients: ['소고기', '양파', '당근', '간장'], allergens: ['대두'], spicyLevel: 1, description: '달콤한 소고기 구이', isVegetarian: false, isVegan: false, calories: 650 },
    { menuName: '냉면', price: 11000, category: '한식', ingredients: ['메밀면', '육수', '무', '오이'], allergens: ['밀가루'], spicyLevel: 1, description: '시원한 냉면', isVegetarian: false, isVegan: false, calories: 380 },
    { menuName: '제육볶음', price: 14000, category: '한식', ingredients: ['돼지고기', '고추장', '양파', '마늘'], allergens: ['대두'], spicyLevel: 4, description: '매콤달콤한 볶음 요리', isVegetarian: false, isVegan: false, calories: 580 },
    { menuName: '순두부찌개', price: 11000, category: '한식', ingredients: ['순두부', '고춧가루', '계란'], allergens: ['대두', '계란'], spicyLevel: 3, description: '부드럽고 얼큰한 찌개', isVegetarian: true, isVegan: false, calories: 320 },
    { menuName: '삼겹살', price: 16000, category: '한식', ingredients: ['돼지고기'], allergens: [], spicyLevel: 0, description: '고소한 구이', isVegetarian: false, isVegan: false, calories: 720 },
    { menuName: '잡채', price: 15000, category: '한식', ingredients: ['당면', '야채', '간장', '참기름'], allergens: ['대두'], spicyLevel: 0, description: '고소한 야채 볶음', isVegetarian: true, isVegan: true, calories: 420 },
    { menuName: '김치볶음밥', price: 9000, category: '한식', ingredients: ['밥', '김치', '계란', '참기름'], allergens: ['계란', '대두'], spicyLevel: 2, description: '간단하고 맛있는 볶음밥', isVegetarian: false, isVegan: false, calories: 480 }
  ],
  
  realestate: [
    { propertyName: '래미안 강남파크 32평', location: '서울 강남구 역삼동', price: 150000, area: 32, rooms: 3, bathrooms: 2, floor: 15, buildYear: 2018, propertyType: '아파트', features: ['역세권', '학군우수', '남향', '주차2대'], description: '강남역 도보 10분 프리미엄 아파트' },
    { propertyName: '힐스테이트 서초 25평', location: '서울 서초구 서초동', price: 120000, area: 25, rooms: 2, bathrooms: 1, floor: 8, buildYear: 2020, propertyType: '아파트', features: ['역세권', '신축', '남향'], description: '서초역 인근 신축 아파트' },
    { propertyName: '푸르지오 송파 40평', location: '서울 송파구 잠실동', price: 180000, area: 40, rooms: 4, bathrooms: 2, floor: 20, buildYear: 2019, propertyType: '아파트', features: ['한강뷰', '학군우수', '동향', '주차3대'], description: '잠실 한강뷰 대형 평수' },
    { propertyName: '자이 분당 28평', location: '경기 성남시 분당구', price: 95000, area: 28, rooms: 3, bathrooms: 2, floor: 12, buildYear: 2017, propertyType: '아파트', features: ['역세권', '학군우수', '남향'], description: '분당 프리미엄 아파트' },
    { propertyName: '롯데캐슬 판교 35평', location: '경기 성남시 분당구 판교동', price: 140000, area: 35, rooms: 3, bathrooms: 2, floor: 18, buildYear: 2021, propertyType: '아파트', features: ['신축', 'IT밸리', '남향', '주차2대'], description: '판교 테크노밸리 신축' }
  ],
  
  medical: [
    { departmentName: '정형외과', doctor: '김철수 과장', specialty: ['척추', '관절', '스포츠손상'], symptoms: ['허리통증', '무릎통증', '어깨결림'], treatmentAreas: ['허리', '무릎', '어깨', '발목'], description: '근골격계 질환 전문', waitTime: 30, availableDays: ['월', '화', '수', '목', '금'] },
    { departmentName: '내과', doctor: '이영희 과장', specialty: ['소화기', '순환기', '내분비'], symptoms: ['복통', '소화불량', '당뇨'], treatmentAreas: ['복부', '전신'], description: '내과 일반 진료', waitTime: 20, availableDays: ['월', '화', '수', '목', '금', '토'] },
    { departmentName: '피부과', doctor: '박지성 원장', specialty: ['피부질환', '미용피부', '레이저'], symptoms: ['여드름', '아토피', '건선'], treatmentAreas: ['얼굴', '몸통', '팔다리'], description: '피부 질환 및 미용 전문', waitTime: 15, availableDays: ['월', '수', '금'] },
    { departmentName: '안과', doctor: '최민수 원장', specialty: ['백내장', '녹내장', '시력교정'], symptoms: ['시력저하', '눈통증', '충혈'], treatmentAreas: ['눈'], description: '안과 전문 진료', waitTime: 25, availableDays: ['화', '목', '토'] },
    { departmentName: '이비인후과', doctor: '정수진 과장', specialty: ['귀질환', '코질환', '목질환'], symptoms: ['중이염', '비염', '인후통'], treatmentAreas: ['귀', '코', '목'], description: '이비인후과 전문', waitTime: 20, availableDays: ['월', '화', '수', '목', '금'] }
  ],
  
  ecommerce: [
    { productName: '프리미엄 면 티셔츠', price: 39000, category: '의류', brand: 'BASIC', tags: ['베이직', '데일리', '편안함'], colors: ['화이트', '블랙', '그레이'], sizes: ['S', 'M', 'L', 'XL'], description: '부드러운 면 소재', rating: 4.5, stock: 150 },
    { productName: '슬림핏 청바지', price: 89000, category: '의류', brand: 'DENIM', tags: ['슬림', '스트레치', '데님'], colors: ['인디고', '블랙'], sizes: ['28', '30', '32', '34'], description: '편안한 스트레치 청바지', rating: 4.7, stock: 200 },
    { productName: '캐주얼 스니커즈', price: 79000, category: '신발', brand: 'SPORTS', tags: ['운동화', '캐주얼', '편안함'], colors: ['화이트', '블랙'], sizes: ['250', '260', '270', '280'], description: '데일리 운동화', rating: 4.6, stock: 120 },
    { productName: '가죽 크로스백', price: 129000, category: '가방', brand: 'LEATHER', tags: ['가죽', '크로스백', '심플'], colors: ['브라운', '블랙'], sizes: ['FREE'], description: '고급 가죽 크로스백', rating: 4.8, stock: 80 },
    { productName: '니트 가디건', price: 69000, category: '의류', brand: 'KNIT', tags: ['니트', '가디건', '따뜻함'], colors: ['베이지', '그레이', '네이비'], sizes: ['M', 'L'], description: '부드러운 니트 가디건', rating: 4.4, stock: 100 }
  ],
  
  travel: [
    { destinationName: '발리', country: '인도네시아', region: '동남아시아', priceRange: '보통', bestSeason: ['봄', '여름', '가을'], activities: ['서핑', '스노클링', '사원관광', '요가', '스파'], travelStyle: ['휴식', '어드벤처', '문화'], description: '열대 낙원 휴양지', duration: 5 },
    { destinationName: '파리', country: '프랑스', region: '유럽', priceRange: '비쌈', bestSeason: ['봄', '가을'], activities: ['미술관', '에펠탑', '쇼핑', '맛집투어'], travelStyle: ['문화', '쇼핑', '로맨틱'], description: '예술과 낭만의 도시', duration: 7 },
    { destinationName: '도쿄', country: '일본', region: '동아시아', priceRange: '보통', bestSeason: ['봄', '가을'], activities: ['쇼핑', '맛집', '테마파크', '온천'], travelStyle: ['쇼핑', '문화', '맛집'], description: '현대와 전통이 공존', duration: 4 },
    { destinationName: '제주도', country: '한국', region: '동아시아', priceRange: '저렴', bestSeason: ['봄', '여름', '가을'], activities: ['해변', '등산', '카페투어', '드라이브'], travelStyle: ['휴식', '자연', '힐링'], description: '한국의 대표 휴양지', duration: 3 },
    { destinationName: '방콕', country: '태국', region: '동남아시아', priceRange: '저렴', bestSeason: ['겨울', '봄'], activities: ['사원관광', '야시장', '마사지', '쇼핑'], travelStyle: ['문화', '쇼핑', '힐링'], description: '활기찬 동남아 도시', duration: 4 }
  ]
};

// 템플릿별 기본 텍스트 형태 데이터
export const sampleTextData: Record<IndustryType, string> = {
  restaurant: `김치찌개, 12000, 얼큰하고 시원한 국물 요리
비빔밥, 13000, 건강한 한식 대표 메뉴
된장찌개, 10000, 구수한 된장 맛
불고기, 18000, 달콤한 소고기 구이
냉면, 11000, 시원한 냉면
제육볶음, 14000, 매콤달콤한 볶음 요리
순두부찌개, 11000, 부드럽고 얼큰한 찌개
삼겹살, 16000, 고소한 구이
잡채, 15000, 고소한 야채 볶음
김치볶음밥, 9000, 간단하고 맛있는 볶음밥`,

  realestate: `래미안 강남파크 32평, 서울 강남구 역삼동, 150000, 32
힐스테이트 서초 25평, 서울 서초구 서초동, 120000, 25
푸르지오 송파 40평, 서울 송파구 잠실동, 180000, 40
자이 분당 28평, 경기 성남시 분당구, 95000, 28
롯데캐슬 판교 35평, 경기 성남시 판교동, 140000, 35`,

  medical: `정형외과, 김철수, 척추·관절, 허리통증·무릎통증, 허리·무릎·어깨
내과, 이영희, 소화기·순환기, 복통·소화불량, 복부·전신
피부과, 박지성, 피부질환·미용, 여드름·아토피, 얼굴·몸통
안과, 최민수, 백내장·녹내장, 시력저하·눈통증, 눈
이비인후과, 정수진, 귀·코·목, 중이염·비염·인후통, 귀·코·목`,

  ecommerce: `프리미엄 면 티셔츠, 39000, 의류, BASIC, 베이직
슬림핏 청바지, 89000, 의류, DENIM, 데님
캐주얼 스니커즈, 79000, 신발, SPORTS, 운동화
가죽 크로스백, 129000, 가방, LEATHER, 가죽백
니트 가디건, 69000, 의류, KNIT, 니트`,

  travel: `발리, 인도네시아, 동남아시아, 보통, 서핑·스노클링·사원관광
파리, 프랑스, 유럽, 비쌈, 미술관·에펠탑·쇼핑
도쿄, 일본, 동아시아, 보통, 쇼핑·맛집·테마파크
제주도, 한국, 동아시아, 저렴, 해변·등산·카페투어
방콕, 태국, 동남아시아, 저렴, 사원관광·야시장·마사지`
};

