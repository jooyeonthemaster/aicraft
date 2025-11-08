/**
 * ✨ 샘플 데이터 - 5가지 요식업 컨셉
 * 각 템플릿별 10개씩 풍부한 예시 데이터
 */

import { IndustryType } from '@/types/templates';

export const sampleData: Record<IndustryType, any[]> = {
  'fine-dining': [
    { dishName: '트러플 향 푸아그라 테린', courseType: 'Appetizer', price: 48000, ingredients: ['푸아그라', '블랙 트러플', '브리오슈'], winePairing: 'Sauternes', allergens: ['계란', '밀가루'], michelinStars: 3, description: '프랑스산 최고급 푸아그라를 이탈리아 트러플로 감싼 시그니처 요리' },
    { dishName: '랍스터 비스크', courseType: 'Soup', price: 35000, ingredients: ['랍스터', '코냑', '생크림', '토마토'], winePairing: 'Chablis Grand Cru', allergens: ['갑각류', '우유'], michelinStars: 2, description: '신선한 랍스터 육수에 코냑을 더한 부드러운 수프' },
    { dishName: '와규 필레 미뇽', courseType: 'Main Course', price: 120000, ingredients: ['일본산 A5 와규', '푸아그라', '송로버섯'], winePairing: 'Château Lafite', allergens: [], michelinStars: 3, description: '일본산 최고급 와규에 푸아그라와 송로버섯을 곁들인 메인 요리' },
    { dishName: '캐비어를 곁들인 홋카이도 성게알', courseType: 'Amuse-bouche', price: 25000, ingredients: ['홋카이도 성게알', '벨루가 캐비어', '골든 리프'], winePairing: 'Dom Pérignon', allergens: ['생선'], michelinStars: 3, description: '금박을 입힌 한입 크기의 극상 아뮤즈부슈' },
    { dishName: '발로나 초콜릿 무스', courseType: 'Dessert', price: 28000, ingredients: ['발로나 다크 초콜릿', '마스카르포네', '금박'], winePairing: 'Eiswein', allergens: ['우유', '계란'], michelinStars: 2, description: '프랑스 발로나 초콜릿으로 만든 벨벳 같은 무스' },
    { dishName: '프렌치 어니언 수프', courseType: 'Soup', price: 22000, ingredients: ['양파', '그뤼에르 치즈', '바게트'], winePairing: 'Beaujolais', allergens: ['우유', '밀가루'], michelinStars: 2, description: '프랑스 전통 방식으로 캐러멜라이즈한 양파 수프' },
    { dishName: '오마카세 스시 코스', courseType: 'Main Course', price: 180000, ingredients: ['참치 대토로', '성게', '도미', '전복'], winePairing: 'Sake Daiginjo', allergens: ['생선', '대두'], michelinStars: 3, description: '제철 생선으로 구성된 12가지 스시 코스' },
    { dishName: '트러플 리조또', courseType: 'Main Course', price: 52000, ingredients: ['아르보리오 쌀', '화이트 트러플', '파르미지아노'], winePairing: 'Barolo', allergens: ['우유'], michelinStars: 2, description: '이탈리아 화이트 트러플을 듬뿍 올린 크리미한 리조또' },
    { dishName: '오리 콩피', courseType: 'Main Course', price: 65000, ingredients: ['오리 다리', '오렌지 소스', '감자 그라탕'], winePairing: 'Pinot Noir', allergens: ['우유'], michelinStars: 2, description: '저온에서 12시간 조리한 오리 콩피와 오렌지 소스' },
    { dishName: '크렘 브륄레', courseType: 'Dessert', price: 18000, ingredients: ['바닐라빈', '달걀 노른자', '생크림'], winePairing: 'Sauternes', allergens: ['계란', '우유'], michelinStars: 1, description: '마다가스카르 바닐라빈으로 만든 정통 크렘 브륄레' }
  ],

  'casual-dining': [
    { menuName: '허니버터 치킨', category: '치킨', price: 21000, servingSize: '2-3인분', spicyLevel: 0, allergens: ['우유', '밀가루'], isPopular: true, description: '달콤한 허니버터 소스를 듬뿍 발라 바삭하고 부드러운 치킨', sideDishes: ['콜슬로', '피클'], kidFriendly: true },
    { menuName: '불닭 치킨', category: '치킨', price: 19000, servingSize: '2-3인분', spicyLevel: 5, allergens: ['밀가루', '대두'], isPopular: true, description: '매운맛을 좋아하는 분들을 위한 강렬한 매콤한 치킨', sideDishes: ['무우절이', '치즈볼'], kidFriendly: false },
    { menuName: '패밀리 콤보 피자', category: '피자', price: 27000, servingSize: '3-4인분', spicyLevel: 1, allergens: ['우유', '밀가루'], isPopular: true, description: '페퍼로니, 불고기, 치즈가 한가득 올라간 가족용 대형 피자', sideDishes: ['갈릭 브레드'], kidFriendly: true },
    { menuName: '더블 베이컨 버거', category: '버거', price: 12000, servingSize: '1인분', spicyLevel: 2, allergens: ['밀가루', '계란', '우유'], isPopular: true, description: '두툼한 패티와 바삭한 베이컨이 들어간 시그니처 버거', sideDishes: ['감자튀김', '콜라'], kidFriendly: true },
    { menuName: '크림 파스타', category: '파스타', price: 14000, servingSize: '1인분', spicyLevel: 0, allergens: ['우유', '밀가루'], isPopular: false, description: '부드러운 크림 소스와 신선한 버섯이 어우러진 파스타', sideDishes: ['마늘빵'], kidFriendly: true },
    { menuName: '양념치킨', category: '치킨', price: 20000, servingSize: '2-3인분', spicyLevel: 3, allergens: ['밀가루', '대두'], isPopular: true, description: '달콤짭짤한 양념이 일품인 시그니처 치킨', sideDishes: ['무우절이'], kidFriendly: true },
    { menuName: '하와이안 피자', category: '피자', price: 24000, servingSize: '2-3인분', spicyLevel: 0, allergens: ['우유', '밀가루'], isPopular: false, description: '파인애플과 햄이 조화를 이루는 달콤한 피자', sideDishes: ['핫소스'], kidFriendly: true },
    { menuName: '갈비 스테이크', category: '스테이크', price: 28000, servingSize: '1인분', spicyLevel: 1, allergens: [], isPopular: true, description: '부드러운 소갈비 스테이크와 구운 야채', sideDishes: ['마시드포테이토'], kidFriendly: true },
    { menuName: '시저 샐러드', category: '샐러드', price: 13000, servingSize: '1인분', spicyLevel: 0, allergens: ['계란', '우유', '밀가루'], isPopular: false, description: '신선한 로메인과 크루통, 시저 드레싱', sideDishes: ['발사믹'], kidFriendly: true },
    { menuName: '새우 볶음밥', category: '파스타', price: 12000, servingSize: '1인분', spicyLevel: 2, allergens: ['갑각류', '계란'], isPopular: true, description: '통통한 새우와 야채가 들어간 고소한 볶음밥', sideDishes: ['단무지'], kidFriendly: true }
  ],

  'cafe-brunch': [
    { itemName: '아보카도 에그 베네딕트', category: '브런치', price: 16000, caffeine: '없음', isVegan: false, isGlutenFree: false, allergens: ['계란', '밀가루', '우유'], description: '수비드로 완벽하게 익힌 계란과 신선한 아보카도', instagrammable: true, calories: 520 },
    { itemName: '플랫 화이트', category: '커피', price: 6500, caffeine: '많음', isVegan: false, isGlutenFree: true, allergens: ['우유'], description: '에티오피아 예가체프 원두로 추출한 에스프레소', instagrammable: true, calories: 120 },
    { itemName: '비건 팬케이크', category: '브런치', price: 14000, caffeine: '없음', isVegan: true, isGlutenFree: true, allergens: [], description: '귀리가루와 아몬드 밀크로 만든 푹신한 팬케이크', instagrammable: true, calories: 380 },
    { itemName: '시그니처 크루아상', category: '베이커리', price: 5500, caffeine: '없음', isVegan: false, isGlutenFree: false, allergens: ['밀가루', '우유', '계란'], description: '72시간 발효한 프랑스식 버터 크루아상', instagrammable: true, calories: 260 },
    { itemName: '콜드 브루 라떼', category: '커피', price: 7000, caffeine: '보통', isVegan: false, isGlutenFree: true, allergens: ['우유'], description: '24시간 저온 추출한 콜드 브루', instagrammable: true, calories: 150 },
    { itemName: '프렌치 토스트', category: '브런치', price: 13000, caffeine: '없음', isVegan: false, isGlutenFree: false, allergens: ['계란', '우유', '밀가루'], description: '브리오슈 빵에 계핏가루와 메이플 시럽', instagrammable: true, calories: 450 },
    { itemName: '카페 모카', category: '커피', price: 7500, caffeine: '많음', isVegan: false, isGlutenFree: true, allergens: ['우유'], description: '에스프레소와 초콜릿, 스팀 밀크의 달콤한 조화', instagrammable: true, calories: 180 },
    { itemName: '샤크슈카', category: '브런치', price: 15000, caffeine: '없음', isVegan: false, isGlutenFree: true, allergens: ['계란'], description: '토마토 소스에 수란을 얹은 중동식 브런치', instagrammable: true, calories: 380 },
    { itemName: '그래놀라 요거트 볼', category: '디저트', price: 11000, caffeine: '없음', isVegan: false, isGlutenFree: false, allergens: ['우유', '견과류'], description: '그릭 요거트에 하우스메이드 그래놀라', instagrammable: true, calories: 320 },
    { itemName: '아메리카노', category: '커피', price: 5000, caffeine: '많음', isVegan: true, isGlutenFree: true, allergens: [], description: '에티오피아 시다모 원두로 추출한 깔끔한 아메리카노', instagrammable: false, calories: 5 }
  ],

  'fast-casual': [
    { dishName: '슈퍼푸드 파워볼', category: '포케볼', price: 14500, calories: 420, protein: 32, isVegan: false, isGlutenFree: true, allergens: ['생선'], description: '연어, 퀴노아, 아보카도, 에다마메가 들어간 영양 만점 파워볼', mainIngredient: '연어' },
    { dishName: '케일 시저 샐러드', category: '샐러드', price: 12000, calories: 280, protein: 25, isVegan: false, isGlutenFree: false, allergens: ['계란', '우유'], description: '신선한 케일과 구운 닭가슴살, 파르메산 치즈', mainIngredient: '닭가슴살' },
    { dishName: '비건 부리또 볼', category: '샐러드', price: 13000, calories: 350, protein: 18, isVegan: true, isGlutenFree: true, allergens: [], description: '검은콩, 현미, 아보카도, 토마토 살사', mainIngredient: '검은콩' },
    { dishName: '프로틴 치킨 랩', category: '랩', price: 11500, calories: 380, protein: 35, isVegan: false, isGlutenFree: false, allergens: ['밀가루', '우유'], description: '고단백 닭가슴살, 신선한 야채, 요거트 소스', mainIngredient: '닭가슴살' },
    { dishName: '아사이 스무디볼', category: '스무디볼', price: 13000, calories: 320, protein: 12, isVegan: true, isGlutenFree: true, allergens: ['견과류'], description: '슈퍼푸드 아사이베리, 바나나, 그래놀라', mainIngredient: '아사이베리' },
    { dishName: '참치 포케볼', category: '포케볼', price: 15500, calories: 390, protein: 38, isVegan: false, isGlutenFree: true, allergens: ['생선', '대두'], description: '신선한 참치회, 현미, 아보카도, 김', mainIngredient: '참치' },
    { dishName: '치킨 시저 랩', category: '랩', price: 10500, calories: 350, protein: 30, isVegan: false, isGlutenFree: false, allergens: ['밀가루', '계란'], description: '구운 닭가슴살과 로메인, 시저 드레싱', mainIngredient: '닭가슴살' },
    { dishName: '두부 샐러드', category: '샐러드', price: 11000, calories: 280, protein: 20, isVegan: true, isGlutenFree: true, allergens: ['대두'], description: '구운 두부, 혼합 채소, 참깨 드레싱', mainIngredient: '두부' },
    { dishName: '프로틴 스무디', category: '스무디볼', price: 9500, calories: 250, protein: 25, isVegan: true, isGlutenFree: true, allergens: [], description: '바나나, 피넛버터, 식물성 프로틴 파우더', mainIngredient: '식물성 프로틴' },
    { dishName: '퀴노아 볼', category: '샐러드', price: 13500, calories: 380, protein: 22, isVegan: true, isGlutenFree: true, allergens: [], description: '퀴노아, 병아리콩, 구운 야채, 타히니 드레싱', mainIngredient: '퀴노아' }
  ],

  'ethnic-dining': [
    { dishName: '팟타이', origin: '태국식', price: 14000, spicyLevel: 2, authenticityLevel: '정통', mainProtein: '해산물', allergens: ['땅콩', '갑각류', '생선'], isVegetarian: false, description: '쌀국수를 새우와 함께 볶아 타마린드 소스로 맛을 낸 태국의 국민 요리' },
    { dishName: '마파두부', origin: '중식', price: 13000, spicyLevel: 4, authenticityLevel: '정통', mainProtein: '두부', allergens: ['대두'], isVegetarian: true, description: '쓰촨식 매운 두부 요리로 화자오의 얼얼함과 두반장의 깊은 맛이 조화' },
    { dishName: '스시 오마카세', origin: '일식', price: 65000, spicyLevel: 0, authenticityLevel: '정통', mainProtein: '해산물', allergens: ['생선', '대두'], isVegetarian: false, description: '셰프가 엄선한 제철 생선으로 구성된 12가지 스시 코스' },
    { dishName: '퍼보', origin: '베트남식', price: 12000, spicyLevel: 1, authenticityLevel: '정통', mainProtein: '소고기', allergens: ['밀가루'], isVegetarian: false, description: '12시간 우려낸 사골육수의 쌀국수에 신선한 고수를 곁들인 베트남 국물 요리' },
    { dishName: '그린 커리', origin: '태국식', price: 15000, spicyLevel: 3, authenticityLevel: '정통', mainProtein: '닭고기', allergens: ['생선', '갑각류'], isVegetarian: false, description: '코코넛 밀크 베이스의 태국식 그린 커리' },
    { dishName: '탄탄멘', origin: '중식', price: 14000, spicyLevel: 4, authenticityLevel: '정통', mainProtein: '돼지고기', allergens: ['대두', '땅콩', '밀가루'], isVegetarian: false, description: '매콤한 참깨 소스의 중국식 라멘' },
    { dishName: '카레라이스', origin: '일식', price: 11000, spicyLevel: 2, authenticityLevel: '현대화', mainProtein: '돼지고기', allergens: ['밀가루'], isVegetarian: false, description: '일본식 카레룩스로 만든 부드럽고 달콤한 카레' },
    { dishName: '분짜', origin: '베트남식', price: 13000, spicyLevel: 1, authenticityLevel: '정통', mainProtein: '돼지고기', allergens: ['땅콩'], isVegetarian: false, description: '숯불에 구운 돼지고기와 쌀국수를 느억맘 소스에 찍어 먹는 하노이 스타일' },
    { dishName: '치킨 티카 마살라', origin: '인도식', price: 16000, spicyLevel: 3, authenticityLevel: '정통', mainProtein: '닭고기', allergens: ['우유'], isVegetarian: false, description: '요거트에 재운 닭고기를 탄두리에 구워 토마토 크림 소스로 마무리' },
    { dishName: '딤섬 세트', origin: '중식', price: 18000, spicyLevel: 0, authenticityLevel: '정통', mainProtein: '해산물', allergens: ['밀가루', '갑각류', '대두'], isVegetarian: false, description: '하가우, 샤오마이, 춘권 등 5가지 딤섬 모음' }
  ]
};
