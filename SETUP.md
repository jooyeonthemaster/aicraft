# 설치 및 실행 가이드

AI Builder Platform 설치 및 실행 방법을 단계별로 안내합니다.

## 📋 사전 준비

- Node.js 18+ 설치
- npm 또는 pnpm 설치
- Gemini API Key ([https://console.aistudio.google.com](https://console.aistudio.google.com))
- Cloudflare 계정 (무료) ([https://dash.cloudflare.com](https://dash.cloudflare.com))

## 🚀 빠른 시작 (5분 완성)

### 1단계: 프록시 서버 배포

```bash
# Proxy 디렉토리로 이동
cd proxy

# Cloudflare 로그인
npx wrangler login

# API 키 설정
npx wrangler secret put GEMINI_KEY
# 프롬프트에서 Gemini API 키 입력

# 개발 서버 실행 (로컬 테스트용)
npm run dev
# → http://localhost:8787 에서 실행됨

# 또는 바로 배포
npm run deploy
# → 배포된 URL을 복사해두세요 (예: https://ai-proxy.your-subdomain.workers.dev)
```

### 2단계: Frontend 설정 및 실행

```bash
# Frontend 디렉토리로 이동
cd ../frontend

# 환경 변수 파일 생성
cp .env.local.example .env.local

# .env.local 파일 수정
# GEMINI_API_KEY=sk-ant-xxxxx
# NEXT_PUBLIC_PROXY_URL=https://ai-proxy.your-subdomain.workers.dev

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속!

## 🎯 상세 설정

### Proxy 서버 상세 설정

#### Rate Limiting 활성화 (선택사항)

```bash
# KV namespace 생성
npx wrangler kv:namespace create RATE_LIMIT

# 출력된 ID를 wrangler.toml에 추가
# [[kv_namespaces]]
# binding = "RATE_LIMIT"
# id = "your-kv-namespace-id"

# 다시 배포
npm run deploy
```

#### 프로덕션 배포

```bash
# 개발 환경
npm run deploy:dev
# → https://ai-proxy-dev.your-subdomain.workers.dev

# 프로덕션 환경
npm run deploy:production
# → https://ai-proxy-production.your-subdomain.workers.dev
```

### Frontend 상세 설정

#### 환경 변수 전체 목록

```env
# .env.local

# Gemini API Key (코드 생성용)
GEMINI_API_KEY=sk-ant-xxxxx

# Proxy URL (배포된 Cloudflare Workers URL)
NEXT_PUBLIC_PROXY_URL=https://ai-proxy.your-subdomain.workers.dev

# Rate Limit (선택사항, 기본값: 10)
NEXT_PUBLIC_RATE_LIMIT=10
```

#### 프로덕션 빌드

```bash
npm run build
npm start
```

#### Vercel에 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경 변수 설정
vercel env add GEMINI_API_KEY
vercel env add NEXT_PUBLIC_PROXY_URL

# 프로덕션 배포
vercel --prod
```

## 🔧 문제 해결

### Proxy 서버 문제

#### "API key not configured" 오류

```bash
cd proxy
npx wrangler secret put GEMINI_KEY
# Gemini API 키를 다시 입력
```

#### CORS 오류

`proxy/src/index.ts`에서 `CORS_HEADERS`를 확인하세요:

```typescript
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // 또는 특정 도메인
  // ...
};
```

#### Rate limit 초과

```bash
# Rate limit 초기화 (IP 주소 확인 필요)
npx wrangler kv:key delete --namespace-id=your-id rate:YOUR_IP
```

### Frontend 문제

#### Sandpack 로딩 오류

캐시 삭제 후 재시도:

```bash
rm -rf .next node_modules
npm install
npm run dev
```

#### API 연결 실패

1. `.env.local` 파일이 존재하는지 확인
2. `NEXT_PUBLIC_PROXY_URL`이 올바른지 확인
3. Proxy 서버가 실행 중인지 확인 (`/health` 엔드포인트 테스트)

```bash
curl https://your-proxy-url.workers.dev/health
```

## 📊 개발 팁

### Hot Reload 활성화

```bash
# Frontend (자동으로 활성화됨)
cd frontend
npm run dev

# Proxy (변경사항 자동 반영)
cd proxy
npm run dev
```

### 로그 모니터링

```bash
# Proxy 로그 실시간 확인
cd proxy
npm run tail
```

### 코드 생성 테스트

```bash
# Frontend API 직접 테스트
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "간단한 카운터 앱 만들어줘"}'
```

## 🎨 커스터마이징

### AI 프롬프트 수정

`frontend/app/api/generate/route.ts`에서 `SYSTEM_PROMPT` 수정

### UI 테마 변경

`frontend/app/page.tsx`와 컴포넌트들의 Tailwind 클래스 수정

### Rate Limit 조정

`proxy/src/index.ts`에서 `RATE_LIMIT_PER_HOUR` 값 변경

## 📈 성능 최적화

### Frontend

```bash
# 프로덕션 빌드 최적화
npm run build
npm run start
```

### Proxy

```bash
# Minification 자동 적용됨 (Cloudflare Workers)
npm run deploy:production
```

## 🔐 보안 체크리스트

- [ ] API 키가 `.env.local`에만 있고 Git에 커밋되지 않음
- [ ] Proxy 서버에 Rate limiting 활성화
- [ ] CORS 설정이 적절한 도메인만 허용
- [ ] 프로덕션 빌드 시 소스맵 비활성화
- [ ] Cloudflare Workers secrets에 API 키 저장

## 📚 다음 단계

1. [사용 가이드](USAGE.md) - 플랫폼 사용 방법
2. [API 문서](proxy/README.md) - Proxy API 상세 문서
3. [개발 가이드](CONTRIBUTING.md) - 기여 방법

## 🆘 지원

문제가 해결되지 않으면:
1. GitHub Issues 생성
2. Discord 커뮤니티 참여
3. 이메일: support@ilhaera.com
