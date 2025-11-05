import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

const SYSTEM_PROMPT = `당신은 React 앱 코드를 생성하는 전문 AI입니다.

중요 규칙:
1. AI API 호출이 필요한 경우, 반드시 다음 함수를 사용하세요:
   \`\`\`javascript
   import { chatWithAI } from './proxy';

   // 사용 예시
   const response = await chatWithAI("사용자 메시지");
   console.log(response.content[0].text);
   \`\`\`

2. 절대로 API 키를 코드에 넣지 마세요. proxy.js가 자동으로 제공됩니다.

3. 코드는 완전하고 즉시 실행 가능해야 합니다 (주석 없이).

4. Tailwind CSS를 사용하여 아름답게 스타일링하세요.

5. 다음 구조로 코드를 작성하세요:

\`\`\`javascript
import { useState } from 'react';
import { chatWithAI } from './proxy';

export default function App() {
  // 여기에 코드 작성

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      {/* UI 요소 */}
    </div>
  );
}
\`\`\`

6. 사용자 경험을 최우선으로 생각하세요:
   - 로딩 상태 표시
   - 에러 처리
   - 반응형 디자인
   - 직관적인 UI

7. 코드만 반환하고 설명은 하지 마세요.`;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: '프롬프트가 필요합니다' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `${SYSTEM_PROMPT}\n\n사용자 요청: ${prompt}\n\n오직 App.js의 전체 코드만 작성하세요. 설명 없이 코드만 반환하세요.`
        }
      ]
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Extract code from markdown if present
    let code = content.text;
    const codeMatch = code.match(/```(?:javascript|jsx|tsx?)?\n([\s\S]*?)\n```/);
    if (codeMatch) {
      code = codeMatch[1];
    }

    return NextResponse.json({ code });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '코드 생성 중 오류가 발생했습니다'
      },
      { status: 500 }
    );
  }
}
