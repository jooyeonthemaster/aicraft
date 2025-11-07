# 🚀 빠른 시작 가이드

## 5분 안에 시작하기

### 1️⃣ 환경 변수 설정 (1분)

```bash
# 1. env.txt 내용을 복사하여 frontend/.env.local 파일 생성
cd frontend
cp ../env.txt .env.local

# 2. .env.local 파일을 편집하여 API 키 입력
# GEMINI_API_KEY=여기에_실제_API_키_입력
```

**Gemini API 키 발급**: https://console.aistudio.google.com

### 2️⃣ 프록시 서버 실행 (1분)

```bash
# 터미널 1
cd proxy
npm install  # 최초 1회만
npm run dev

# ✅ http://localhost:8787 에서 실행 중...
```

### 3️⃣ Frontend 실행 (1분)

```bash
# 터미널 2
cd frontend
npm install  # 최초 1회만
npm run dev

# ✅ http://localhost:3000 접속!
```

---

## 🎯 사용 방법

### Step 1: 템플릿 선택
1. 5가지 업종 중 선택 (예: 요식업 🍽️)
2. UI 테마 선택 (모던/클래식/미니멀)
3. "다음 단계" 클릭

### Step 2: 데이터 업로드
1. 파일 드래그 또는 클릭하여 업로드
   - 지원 형식: Excel, CSV, JSON, TXT
2. 자동 파싱 및 검증 확인
3. "다음" 클릭

### Step 3: 고객 설정
1. 동적으로 생성된 입력 폼 작성
2. "AI 앱 생성하기" 클릭

### Step 4: 완성! 🎉
- 생성된 앱을 실시간으로 테스트
- "배포하기" 버튼으로 공유 가능
- "새로운 앱 만들기"로 다시 시작

---

## 📋 샘플 데이터

### 요식업 엑셀 예시

| menuName | price | category | ingredients | allergens | spicyLevel | description | isVegetarian | isVegan | calories |
|----------|-------|----------|-------------|-----------|------------|-------------|--------------|---------|----------|
| 김치찌개 | 12000 | 한식 | 돼지고기,김치,두부 | 대두 | 3 | 얼큰한 김치찌개 | FALSE | FALSE | 450 |
| 비빔밥 | 13000 | 한식 | 밥,나물,고추장 | 계란,대두 | 2 | 건강한 비빔밥 | TRUE | FALSE | 520 |

### CSV 예시
```csv
menuName,price,category,ingredients,allergens,spicyLevel,description,isVegetarian,isVegan,calories
김치찌개,12000,한식,"돼지고기,김치,두부",대두,3,얼큰한 김치찌개,FALSE,FALSE,450
비빔밥,13000,한식,"밥,나물,고추장","계란,대두",2,건강한 비빔밥,TRUE,FALSE,520
```

### JSON 예시
```json
[
  {
    "menuName": "김치찌개",
    "price": 12000,
    "category": "한식",
    "ingredients": ["돼지고기", "김치", "두부"],
    "allergens": ["대두"],
    "spicyLevel": 3,
    "description": "얼큰한 김치찌개",
    "isVegetarian": false,
    "isVegan": false,
    "calories": 450
  }
]
```

---

## 🔧 문제 해결

### 포트가 이미 사용 중일 때

**Frontend (3000 포트)**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID번호] /F

# 또는 다른 포트 사용
npm run dev -- -p 3001
```

**Proxy (8787 포트)**
```bash
# 다른 터미널에서 이미 실행 중인지 확인
# 또는 proxy/wrangler.toml에서 포트 변경
```

### Gemini API 오류

```bash
# API 키 확인
# frontend/.env.local 파일에서
GEMINI_API_KEY=실제_API_키_확인

# API 키가 유효한지 테스트
curl -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY
```

### 패키지 설치 오류

```bash
# 캐시 삭제 후 재설치
cd frontend
rm -rf node_modules package-lock.json
npm install

cd ../proxy
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 커스터마이징

### 새로운 템플릿 추가

`frontend/lib/templates/` 디렉토리에 새 파일 생성:

```typescript
// mytemplate.ts
export const myTemplate: Template = {
  id: 'myindustry',
  name: '내 업종',
  description: '설명',
  // ... 나머지 설정
};
```

### UI 테마 수정

각 템플릿 파일의 `themes` 객체 수정:

```typescript
themes: {
  modern: {
    colors: {
      primary: '#YOUR_COLOR',
      // ...
    }
  }
}
```

---

## 📞 지원

문제가 있으신가요?

1. GitHub Issues 생성
2. README.md 참고
3. TROUBLESHOOTING.md 확인

---

**Made with ❤️ by lunus**  
대표: 홍채민

