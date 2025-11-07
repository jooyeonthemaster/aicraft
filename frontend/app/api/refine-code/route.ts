/**
 * 코드 수정 API
 * 기존 코드를 AI와 대화하며 반복적으로 개선
 * 최대 토큰 사용으로 최고 품질 보장
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

const REFINEMENT_SYSTEM_PROMPT = `당신은 전문 React 코드 리팩토링 AI입니다.

사용자가 요청한 수정 사항을 정확하게 반영하여 코드를 개선하세요.

중요 규칙:
1. **기존 코드의 구조를 유지**하면서 요청된 부분만 수정하세요
2. **import 문을 절대 사용하지 마세요!** 전역 React 사용:
   \`\`\`javascript
   const { useState, useEffect } = React;
   \`\`\`

3. **export 문도 사용하지 마세요!** 함수명은 "App":
   \`\`\`javascript
   function App() { ... }
   \`\`\`

4. **chatWithAI 함수는 이미 전역으로 제공**되므로 그대로 사용하세요

5. **수정 전후 비교**:
   - 무엇을 왜 수정했는지 명확히
   - 기존 기능은 절대 망가뜨리지 마세요
   - 개선만 하고 삭제는 최소화

6. **코드 품질**:
   - 깔끔한 구조 유지
   - 불필요한 코드 제거
   - 성능 최적화
   - 접근성 고려

7. **응답 형식**:
   먼저 변경 사항을 요약하고, 그 다음 전체 수정된 코드를 반환하세요.
   
   형식:
   \`\`\`
   【변경 사항】
   - 항목 1: 설명
   - 항목 2: 설명
   
   【수정된 코드】
   \`\`\`javascript
   // 전체 코드...
   \`\`\`
   \`\`\`

8. **절대 금지**:
   - 기존 코드를 완전히 갈아엎기
   - 작동하던 기능 삭제
   - import/export 문 사용
   - API 키 하드코딩

수정은 점진적이고 안전하게!`;

export async function POST(request: Request) {
  try {
    const { 
      currentCode, 
      userRequest, 
      conversationHistory,
      businessInfo,
      appSettings,
      industry,
      theme
    } = await request.json();

    // 검증
    if (!currentCode) {
      return NextResponse.json(
        { error: '현재 코드가 필요합니다' },
        { status: 400 }
      );
    }

    if (!userRequest || !userRequest.trim()) {
      return NextResponse.json(
        { error: '수정 요청을 입력해주세요' },
        { status: 400 }
      );
    }

    // 런타임에 환경변수 체크
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY가 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 최대 토큰 설정 - 시연용으로 최고 품질
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-pro',
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 64000, // 최대 출력
      },
    });

    // 대화 컨텍스트 구성
    const conversationContext = conversationHistory
      ?.slice(-5) // 최근 5개 대화만 (토큰 절약)
      .map((msg: any) => `${msg.role === 'user' ? '사용자' : 'AI'}: ${msg.content}`)
      .join('\n') || '';

    // 업체 정보 컨텍스트
    const businessContext = businessInfo ? `
【업체 정보】
- 업체명: ${businessInfo.businessName}
- 로고: ${businessInfo.logoEmoji}
- 연락처: ${businessInfo.phone}
- 주소: ${businessInfo.address}
- 영업시간: ${businessInfo.hours}
${businessInfo.description ? `- 소개: ${businessInfo.description}` : ''}
${businessInfo.features.length > 0 ? `- 특징: ${businessInfo.features.join(', ')}` : ''}
` : '';

    // 앱 설정 컨텍스트
    const appContext = appSettings ? `
【앱 설정】
- 앱 제목: ${appSettings.appTitle}
- 환영 메시지: ${appSettings.welcomeMessage || '환영합니다'}
- 주 색상: ${appSettings.primaryColor}
- AI 캐릭터: ${appSettings.aiCharacter}
- 추천 개수: ${appSettings.recommendationCount}개
${appSettings.additionalInstructions ? `- 추가 지침: ${appSettings.additionalInstructions}` : ''}
` : '';

    // 전체 프롬프트 구성
    const fullPrompt = `${REFINEMENT_SYSTEM_PROMPT}

${businessContext}
${appContext}

【현재 코드】
\`\`\`javascript
${currentCode}
\`\`\`

${conversationContext ? `【이전 대화】\n${conversationContext}\n` : ''}

【사용자 요청】
${userRequest}

위 현재 코드를 사용자 요청에 맞게 수정하세요.

먼저 변경 사항을 간단히 요약하고, 그 다음 수정된 전체 코드를 반환하세요.
마크다운 코드 블록 형태로 반환해주세요.`;

    console.log('Refining code with request:', userRequest);

    // Gemini AI 호출 (최대 토큰)
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    let text = response.text();

    // 변경 사항 요약 추출
    const summaryMatch = text.match(/【변경\s*사항】\s*\n([\s\S]*?)(?=【수정된\s*코드】|\`\`\`)/);
    const changesSummary = summaryMatch 
      ? summaryMatch[1].trim().split('\n').filter(line => line.trim()).join(', ')
      : '코드 수정 완료';

    // 코드 추출
    const codeMatch = text.match(/```(?:javascript|jsx|tsx?)?\n([\s\S]*?)\n```/);
    let refinedCode = currentCode; // 기본값은 현재 코드

    if (codeMatch) {
      refinedCode = codeMatch[1];
    } else {
      // 마크다운 블록이 없으면 전체를 코드로 간주
      // "【변경 사항】" 이후부터가 코드일 가능성
      const afterSummary = text.split(/【수정된\s*코드】/)[1];
      if (afterSummary) {
        refinedCode = afterSummary.trim();
      }
    }

    // 버전 ID 생성
    const versionId = nanoid(10);

    console.log('Code refined successfully. Changes:', changesSummary);

    return NextResponse.json({
      code: refinedCode,
      changesSummary,
      versionId
    });
  } catch (error) {
    console.error('Refine Code API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '코드 수정 중 오류가 발생했습니다'
      },
      { status: 500 }
    );
  }
}

