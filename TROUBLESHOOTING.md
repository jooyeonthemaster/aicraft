# Tailwind CSS Styling Issue in Sandpack - 해결 과정

## 문제 상황

AI Builder Platform에서 AI가 생성한 React 코드의 Tailwind CSS 스타일이 Sandpack 프리뷰에서 전혀 적용되지 않는 문제 발생.

- 생성된 코드는 정상적으로 보이지만 스타일이 없는 흰 화면만 표시됨
- CodeSandbox에서 열어도 동일하게 스타일 미적용
- Tailwind 클래스명은 정상적으로 생성되지만 실제 스타일링이 작동하지 않음

## 시도했던 해결 방법들 (실패)

### 1차 시도: useEffect로 동적 Tailwind CDN 로딩
**방법**: AI가 생성하는 코드에 useEffect를 추가하여 Tailwind CDN을 동적으로 로드
```javascript
useEffect(() => {
  if (!document.querySelector('script[src*="tailwindcss"]')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = false;
    document.head.appendChild(script);
  }
}, []);
```

**실패 원인**: Sandpack의 React 템플릿이 자체 번들러를 사용하여 head를 제어하기 때문에 동적 스크립트 삽입이 무시됨

---

### 2차 시도: Custom index.html 추가
**방법**: Sandpack files에 커스텀 index.html 추가
```javascript
files={{
  '/App.js': code,
  '/proxy.js': proxyHelperCode,
  '/public/index.html': customIndexHtml  // Tailwind CDN 포함
}}
```

**실패 원인**: React 템플릿은 자체 내장 index.html을 우선 사용하며, `/public/index.html` 경로는 무시됨

---

### 3차 시도: externalResources 옵션 사용
**방법**: Sandpack의 externalResources 옵션으로 Tailwind CDN 로드 시도
```javascript
options={{
  externalResources: ['https://cdn.tailwindcss.com']
}}
```

**실패 원인**: 웹 검색 결과, Sandpack의 React 템플릿은 externalResources를 제대로 지원하지 않음 (알려진 이슈)

---

### 4차 시도: 모든 방법 조합
**방법**: useEffect + custom index.html + externalResources 동시 사용

**실패 원인**: React 템플릿의 근본적인 제약사항은 해결되지 않음

---

## 최종 해결 방법 (성공!)

### 핵심 변경사항

#### 1. Sandpack 템플릿 변경: `react` → `static`

**변경 전**:
```javascript
<SandpackProvider
  template="react"
  files={{
    '/App.js': code,
    '/proxy.js': proxyHelperCode,
    '/index.html': customIndexHtml
  }}
/>
```

**변경 후**:
```javascript
<SandpackProvider
  template="static"
  files={{
    '/index.html': completeHtml  // 모든 코드를 포함한 단일 HTML
  }}
/>
```

#### 2. 완전한 HTML 파일로 통합

```javascript
const completeHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${proxyHelperCode}
    ${code}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;
```

#### 3. AI 프롬프트 수정: import/export 문 제거

**변경 전** (실패):
```javascript
import { useState, useEffect } from 'react';
import { chatWithAI } from './proxy';

export default function App() {
  // ...
}
```

**변경 후** (성공):
```javascript
const { useState, useEffect } = React;

function App() {
  // ...
}
```

#### 4. Proxy Helper 함수 수정

**변경 전**:
```javascript
export async function chatWithAI(message) { ... }
```

**변경 후**:
```javascript
async function chatWithAI(message) { ... }  // export 제거
```

### 수정된 파일들

1. **frontend/components/CodePreview.tsx**
   - Sandpack 템플릿을 `static`으로 변경
   - 단일 HTML 파일로 모든 코드 통합
   - Proxy helper에서 `export` 제거

2. **frontend/app/api/generate/route.ts**
   - AI 시스템 프롬프트 전면 수정
   - `import`/`export` 문 사용 금지 명시
   - 전역 React 객체 사용 지시 (`const { useState } = React;`)
   - Tailwind 동적 로딩 코드 제거 (이미 HTML에 로드됨)

## 왜 이 방법이 성공했는가?

### 근본 원인 분석

1. **React 템플릿의 번들러 간섭**
   - Sandpack의 React 템플릿은 자체 번들링 시스템이 HTML head를 완전히 제어
   - 커스텀 HTML이나 externalResources가 무시되거나 덮어써짐

2. **Import/Export 문제**
   - Static 템플릿에서는 ES Module이 아닌 전역 스크립트 환경
   - `import`/`export` 문은 모듈 시스템에서만 작동
   - Babel standalone은 JSX만 변환하고 모듈 시스템은 처리하지 않음

### 해결책의 핵심

1. **Static 템플릿 사용**
   - 번들러 없이 순수 HTML 실행
   - HTML head를 완전히 제어 가능
   - Tailwind CDN이 직접 로드되고 적용됨

2. **전역 스크립트 환경**
   - UMD 방식으로 로드된 React를 전역 객체로 사용
   - `import` 대신 `const { useState } = React;`
   - `export` 없이 전역 함수로 정의

3. **단일 HTML 파일**
   - 모든 의존성이 한 파일에 명확하게 정의됨
   - 로딩 순서 보장 (Tailwind → React → Babel → 사용자 코드)
   - 번들러의 간섭 없이 순차적 실행

## 교훈

1. **프레임워크 제약사항 이해의 중요성**
   - Sandpack React 템플릿의 번들러 동작 방식을 미리 이해했다면 빠르게 해결 가능했음
   - 공식 문서나 이슈 트래커를 먼저 확인하는 것이 중요

2. **근본 원인 파악**
   - 표면적 증상(스타일 미적용)이 아닌 근본 원인(번들러 간섭)을 찾아야 함
   - "왜?"를 반복적으로 질문하기

3. **단순한 해결책이 최선**
   - 복잡한 우회 방법(useEffect + custom HTML + externalResources)보다
   - 근본적 접근 방식 변경(React 템플릿 → Static 템플릿)이 더 효과적

4. **실행 환경 이해**
   - 브라우저 환경: ES Modules vs 전역 스크립트
   - React UMD vs React ESM
   - Babel Standalone의 역할과 한계

## 참고 자료

- Sandpack Documentation: https://sandpack.codesandbox.io/
- React UMD Builds: https://react.dev/reference/react/umd
- Babel Standalone: https://babeljs.io/docs/babel-standalone
- Tailwind CDN: https://tailwindcss.com/docs/installation/play-cdn

---

**작성일**: 2025-11-07
**해결 소요 시간**: 약 2시간
**최종 상태**: ✅ 성공적으로 해결됨
