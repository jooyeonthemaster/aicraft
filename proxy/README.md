# AI Proxy Server

Cloudflare Workers 기반 AI API 프록시 서버

## 기능

- ✅ Claude API 키 숨김 (클라이언트에서 접근 불가)
- ✅ Rate limiting (시간당 10회 요청 제한)
- ✅ CORS 설정
- ✅ 사용량 모니터링

## 로컬 개발

```bash
npm install
npm run dev
```

로컬 서버: `http://localhost:8787`

## 배포

### 1. Cloudflare 계정 연결

```bash
npx wrangler login
```

### 2. API 키 설정

```bash
npx wrangler secret put ANTHROPIC_KEY
# 프롬프트에서 API 키 입력
```

### 3. 배포

```bash
# 개발 환경
npm run deploy:dev

# 프로덕션 환경
npm run deploy:production
```

## API 엔드포인트

### Health Check

```bash
GET /health
```

**응답:**
```json
{
  "status": "ok",
  "service": "ai-proxy",
  "version": "1.0.0"
}
```

### Chat with AI

```bash
POST /chat
Content-Type: application/json

{
  "message": "안녕하세요",
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024
}
```

**응답:**
```json
{
  "id": "msg_xxx",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "안녕하세요! 무엇을 도와드릴까요?"
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 20
  }
}
```

## Rate Limiting (선택사항)

KV namespace를 사용하여 rate limiting을 활성화하려면:

```bash
# KV namespace 생성
npx wrangler kv:namespace create RATE_LIMIT

# wrangler.toml에 추가
[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "your-kv-namespace-id"
```

## 모니터링

```bash
# 실시간 로그
npm run tail
```

## 보안

- API 키는 Cloudflare Workers secrets에 안전하게 보관
- 클라이언트는 절대 API 키에 접근할 수 없음
- Rate limiting으로 비용 통제
- CORS 설정으로 허용된 도메인만 접근

## 비용

- Cloudflare Workers 무료 티어: 하루 100,000 요청
- Rate limiting: 시간당 IP당 10회 → 충분히 무료 범위 내

## 문제 해결

### API 키 오류

```bash
npx wrangler secret put ANTHROPIC_KEY
```

### CORS 오류

`wrangler.toml`에서 허용할 도메인을 추가하거나 `CORS_HEADERS`를 수정하세요.

### Rate limit 초과

KV를 수동으로 초기화:

```bash
npx wrangler kv:key delete --namespace-id=your-id rate:YOUR_IP
```
