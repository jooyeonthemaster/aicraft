# 🚀 배포 기능 설정 가이드

AI 앱 빌더의 배포 기능이 **Cloudflare KV**를 사용하도록 완벽하게 구현되었습니다!

## 📋 아키텍처 개요

```
[사용자] 
   ↓ 배포 버튼 클릭
[Next.js Frontend (Vercel)]
   ↓ POST /api/deploy
[Cloudflare Workers]
   ↓ KV.put(projectId, html)
[Cloudflare KV Storage] ✨
   ↓ 영구 저장 (1GB 무료)
[배포된 URL] 🎉
```

---

## 🛠️ 설정 단계

### 1️⃣ Cloudflare KV 네임스페이스 생성

```bash
cd proxy

# KV 네임스페이스 생성
wrangler kv:namespace create DEPLOYMENTS

# Preview용 네임스페이스 생성 (개발/테스트용)
wrangler kv:namespace create DEPLOYMENTS --preview
```

**출력 예시:**
```
🌀  Creating namespace with title "ai-proxy-DEPLOYMENTS"
✨  Success!
Add the following to your wrangler.toml:
[[kv_namespaces]]
binding = "DEPLOYMENTS"
id = "abc123def456ghi789jkl012"
```

### 2️⃣ wrangler.toml에 ID 입력

`proxy/wrangler.toml` 파일의 23-26번 줄을 수정:

```toml
# KV for deployments (HTML storage)
[[kv_namespaces]]
binding = "DEPLOYMENTS"
id = "여기에_생성된_ID_입력"
preview_id = "여기에_preview_ID_입력"
```

### 3️⃣ Cloudflare Workers 배포

```bash
cd proxy

# 개발 환경 배포
wrangler deploy

# 또는 프로덕션 환경 배포
wrangler deploy --env production
```

**배포 성공 시 URL 확인:**
```
✨  Published ai-proxy (1.23 sec)
   https://ai-proxy.your-account.workers.dev
```

### 4️⃣ 환경 변수 설정

#### 로컬 개발 (.env.local)

`env.txt` 파일 내용을 `.env.local`에 복사 후:

```env
# 로컬 개발 시
NEXT_PUBLIC_PROXY_URL=http://127.0.0.1:8787
```

#### 프로덕션 (Vercel)

Vercel 대시보드 → Settings → Environment Variables:

```env
# 프로덕션 배포 시
NEXT_PUBLIC_PROXY_URL=https://ai-proxy.your-account.workers.dev
```

---

## ✅ 테스트 방법

### 1. 로컬 테스트

```bash
# Terminal 1: Cloudflare Workers 실행
cd proxy
wrangler dev

# Terminal 2: Next.js 실행
cd frontend
npm run dev
```

### 2. 배포 테스트

1. AI 앱 생성
2. **배포 버튼 (🚀 배포)** 클릭
3. URL이 클립보드에 복사됨
4. 새 탭에서 URL 열기
5. 앱이 정상 작동하는지 확인 ✨

### 3. KV 데이터 확인

```bash
# KV에 저장된 키 목록 확인
wrangler kv:key list --namespace-id="your-namespace-id"

# 특정 키 값 확인
wrangler kv:key get "projectId" --namespace-id="your-namespace-id"
```

---

## 📊 Cloudflare KV 무료 티어

```
✅ 저장 공간: 1GB
✅ 읽기: 100,000 요청/일
✅ 쓰기: 1,000 요청/일
✅ 글로벌 엣지 네트워크
✅ 영구 저장
```

**충분한 이유:**
- HTML 파일 평균 크기: ~50KB
- 1GB = 약 20,000개 앱 저장 가능 🎉

---

## 🔧 문제 해결

### 1. "DEPLOYMENTS is not defined" 에러

**원인:** KV 네임스페이스가 생성되지 않음

**해결:**
```bash
wrangler kv:namespace create DEPLOYMENTS
wrangler kv:namespace create DEPLOYMENTS --preview
```

### 2. 배포 후 404 에러

**원인:** Cloudflare Workers가 실행되지 않음

**해결:**
```bash
cd proxy
wrangler deploy
```

환경 변수 확인:
```bash
echo $NEXT_PUBLIC_PROXY_URL
```

### 3. CORS 에러

**원인:** Workers URL이 잘못됨

**해결:** `env.txt` → `.env.local` 복사 후 재시작

### 4. 배포 버튼 클릭 시 "배포 실패"

**확인사항:**
1. Cloudflare Workers 실행 중인지 확인
2. KV 네임스페이스 ID가 올바른지 확인
3. GEMINI_KEY가 설정되었는지 확인 (Workers에서 필요)

```bash
# Gemini API Key 설정
cd proxy
wrangler secret put GEMINI_KEY
# 프롬프트에서 API Key 입력
```

---

## 🎯 다음 단계

### 배포 URL 커스터마이징

Cloudflare Workers의 Custom Domain 설정:

1. Cloudflare 대시보드 → Workers
2. 배포된 Worker 선택
3. Settings → Triggers → Custom Domains
4. 도메인 추가 (예: `deploy.lunus.dev`)

### 배포 관리 기능 추가 (선택사항)

- 배포 목록 조회
- 배포 삭제
- 배포 통계
- 사용량 모니터링

---

## 📝 주요 변경사항

### ✅ 완료된 구현

1. **Cloudflare KV 연동**
   - `proxy/wrangler.toml`: KV 네임스페이스 설정
   - `proxy/src/index.ts`: 배포 API 구현

2. **배포 엔드포인트**
   - `POST /deploy`: HTML 저장
   - `GET /deployed/:id`: HTML 조회

3. **Next.js API**
   - `frontend/app/api/deploy/route.ts`: Cloudflare Workers 호출
   - 기존 in-memory Map 제거

4. **ID 생성**
   - 10자리 랜덤 ID (예: `aBcD1234Xy`)
   - crypto API 사용 (보안)

### 🗑️ 제거된 파일

- `frontend/app/api/deployed/[id]/route.ts` (Cloudflare Workers로 이동)

---

## 💡 팁

### 개발 환경

로컬 개발 시 Cloudflare Workers를 실행하지 않으려면:

```bash
# Next.js API만 사용 (메모리 저장)
NEXT_PUBLIC_PROXY_URL=http://localhost:3000/api
```

### 프로덕션 배포

```bash
# 1. Cloudflare Workers 배포
cd proxy
wrangler deploy --env production

# 2. Vercel 배포
cd frontend
vercel --prod

# 3. 환경 변수 설정 (Vercel Dashboard)
NEXT_PUBLIC_PROXY_URL=https://your-proxy.workers.dev
```

---

## 📞 지원

문제가 발생하면:

1. **Cloudflare Workers 로그 확인:**
   ```bash
   wrangler tail
   ```

2. **KV 상태 확인:**
   ```bash
   wrangler kv:key list --namespace-id="your-id"
   ```

3. **Next.js 로그 확인:**
   - 브라우저 개발자 도구 → Console

---

## 🎉 완료!

이제 AI 앱을 무제한으로 배포할 수 있습니다! 

생성된 앱은 Cloudflare의 글로벌 엣지 네트워크에서 빠르게 제공됩니다. 🌙✨

