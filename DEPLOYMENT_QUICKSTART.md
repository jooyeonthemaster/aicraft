# ⚡ 배포 기능 빠른 시작 (5분)

## 🎯 목표

AI 앱을 Cloudflare KV에 배포하여 영구적으로 저장하고 공유할 수 있도록 설정합니다.

---

## 📝 필수 준비물

- ✅ Cloudflare 계정 (무료)
- ✅ wrangler CLI 설치됨
- ✅ Cloudflare에 로그인됨 (`wrangler login`)

---

## 🚀 빠른 설정 (5분)

### 1️⃣ KV 네임스페이스 생성 (1분)

```bash
cd proxy

# KV 생성
wrangler kv:namespace create DEPLOYMENTS
wrangler kv:namespace create DEPLOYMENTS --preview
```

**출력 예시:**
```
✨  Success!
id = "abc123def456ghi789jkl012"
preview_id = "xyz987uvw654rst321opq098"
```

### 2️⃣ ID 복사 & 붙여넣기 (1분)

`proxy/wrangler.toml` 파일의 **25-26번 줄** 수정:

```toml
[[kv_namespaces]]
binding = "DEPLOYMENTS"
id = "abc123def456ghi789jkl012"          # ← 여기 붙여넣기
preview_id = "xyz987uvw654rst321opq098"  # ← 여기 붙여넣기
```

### 3️⃣ Workers 배포 (1분)

```bash
wrangler deploy
```

**성공 시 URL 확인:**
```
✨  Published ai-proxy
   https://ai-proxy.your-account.workers.dev
```

### 4️⃣ 환경 변수 설정 (2분)

**로컬 개발:**

`env.txt` 내용을 `.env.local`에 복사

**프로덕션 (Vercel):**

Vercel Dashboard → Settings → Environment Variables:

```
Key: NEXT_PUBLIC_PROXY_URL
Value: https://ai-proxy.your-account.workers.dev
```

---

## ✅ 테스트

### 로컬 테스트

```bash
# Terminal 1
cd proxy
wrangler dev

# Terminal 2
cd frontend
npm run dev
```

### 배포 테스트

1. http://localhost:3000 접속
2. AI 앱 생성
3. **🚀 배포** 버튼 클릭
4. URL 복사됨 → 새 탭에서 열기
5. 작동 확인! 🎉

---

## 🎯 다음 명령어 요약

```bash
# 1. KV 생성
cd proxy
wrangler kv:namespace create DEPLOYMENTS
wrangler kv:namespace create DEPLOYMENTS --preview

# 2. ID를 wrangler.toml에 붙여넣기

# 3. 배포
wrangler deploy

# 4. 테스트
wrangler dev
```

---

## 💡 추가 정보

자세한 설명은 `DEPLOYMENT_SETUP.md` 참고!

---

**완료! 이제 AI 앱을 배포할 수 있습니다! 🌙✨**

