/**
 * 템플릿 기반 AI 앱 생성 API
 * Gemini AI를 사용하여 템플릿 + 데이터 + 사용자 입력으로 코드 생성
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { getTemplate } from '@/lib/templates';
import { IndustryType, UITheme } from '@/types/templates';
import { getRequiredHelpers, getInputFieldCode, getPromptBuildingGuide } from '@/lib/ai-helpers';

export async function POST(request: Request) {
  try {
    // 런타임에 환경변수 체크
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY가 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 시연용 최대 토큰 설정 - 최고 품질 보장
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-pro',
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 64000, // 최대 출력 토큰
      },
    });
    
    const { industry, theme, data, businessInfo, appSettings } = await request.json();

    // 검증
    if (!industry || !theme) {
      return NextResponse.json(
        { error: '업종과 테마를 선택해주세요' },
        { status: 400 }
      );
    }

    // 데이터는 선택사항 - 없어도 진행 가능
    const hasData = data && data.length > 0;

    // 템플릿 가져오기
    const template = getTemplate(industry as IndustryType);
    const themeConfig = template.themes[theme as UITheme];

    // 업체 정보와 앱 설정을 프롬프트에 통합
    const businessInfoText = businessInfo ? `

【업체 정보】
- 업체명: ${businessInfo.businessName}
- 대표자: ${businessInfo.ownerName || '미입력'}
- 연락처: ${businessInfo.phone}
- 주소: ${businessInfo.address}
- 영업시간: ${businessInfo.hours}
- 소개: ${businessInfo.description || '미입력'}
- 특징: ${businessInfo.features.join(', ') || '없음'}
- 로고: ${businessInfo.logoEmoji}

이 정보를 앱의 헤더와 푸터에 반드시 포함하세요!
` : '';

    // ✨ 스마트 헬퍼 시스템: 필요한 것만 선택적으로 제공
    const customerQuestions = appSettings?.customerQuestions || [];
    const customerQuestionsText = customerQuestions.length > 0 ? `

【⭐⭐⭐ 고객 입력 필드 시스템】

사용자가 ${customerQuestions.length}개의 질문을 설정했습니다. 반드시 앱에 포함하세요!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 설정된 질문 목록:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${customerQuestions.map((q: any, i: number) => `${i + 1}. ${q.label} (${q.fieldType}) ${q.required ? '- 필수' : ''}
   AI 활용: ${q.aiInstruction}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛠️ 헬퍼 함수 라이브러리 (복사해서 사용하세요)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${getRequiredHelpers(customerQuestions)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 State 초기화 (정확한 타입으로)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const [userInput, setUserInput] = useState({
${customerQuestions.map((q: any) => {
  if (q.fieldType === 'multiselect') return `  ${q.id}: [], // ${q.label}`;
  else if (q.fieldType === 'number' || q.fieldType === 'range') return `  ${q.id}: 0, // ${q.label}`;
  else if (q.fieldType === 'select') return `  ${q.id}: '${q.options?.[0] || ''}', // ${q.label}`;
  else return `  ${q.id}: '', // ${q.label}`;
}).join('\n')}
});

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 입력 필드 JSX (복사해서 사용하세요)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<form onSubmit={handleSubmit} className="space-y-4 p-6">
${customerQuestions.map((q: any) => getInputFieldCode(q)).join('\n')}

  <button 
    type="submit" 
    disabled={loading}
    className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold"
  >
    {loading ? '${customerQuestions.some((q: any) => q.id === 'nationality') ? 'phrases.loading' : "'추천 생성 중...'"} : '${customerQuestions.some((q: any) => q.id === 'nationality') ? 'phrases.submit' : "'추천받기'"}'}
  </button>
</form>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 완벽한 handleSubmit 구현 (복사해서 사용하세요)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${getPromptBuildingGuide(customerQuestions)}

⚠️⚠️⚠️ 위 헬퍼 함수들을 앱 최상단에 정의하고 사용하세요!
` : '';

    const appSettingsText = appSettings ? `

【앱 설정】
- 앱 제목: ${appSettings.appTitle}
- 환영 메시지: ${appSettings.welcomeMessage || '환영합니다!'}
- 주 색상: ${appSettings.primaryColor}
- AI 캐릭터: ${appSettings.aiCharacter} (${
  appSettings.aiCharacter === '친근함' ? '부드럽고 따뜻한 말투' :
  appSettings.aiCharacter === '전문적' ? '신뢰감 있는 전문가 톤' :
  '재미있고 경쾌한 톤'
})
- 추천 개수: ${appSettings.recommendationCount}개
- 추가 지침: ${appSettings.additionalInstructions || '없음'}

반드시 이 설정대로 앱을 만들어주세요!
` : '';

    // AI 프롬프트 생성
    const systemPrompt = `${template.promptTemplate.systemPrompt}
${businessInfoText}
${appSettingsText}
${customerQuestionsText}

당신은 이제 React 웹 앱 코드를 생성해야 합니다.

다음 UI 테마를 적용하세요:
- 테마명: ${themeConfig.name}
- 주 색상: ${themeConfig.colors.primary}
- 배경색: ${themeConfig.colors.background}
- 텍스트: ${themeConfig.colors.text}
- 버튼 스타일: ${themeConfig.components.buttonStyle}
- 카드 스타일: ${themeConfig.components.cardStyle}
- 컨테이너 최대 너비: ${themeConfig.layout.containerMaxWidth}

중요한 규칙:
1. **import 문을 절대 사용하지 마세요!** 대신:
   \`\`\`javascript
   const { useState, useEffect } = React;
   \`\`\`

2. **export 문도 사용하지 마세요!** 함수명은 반드시 "App"으로:
   \`\`\`javascript
   function App() {
     // ...
   }
   \`\`\`

3. **chatWithAI 함수 사용법**:
   \`\`\`javascript
   // 프롬프트 생성 (배열.join 사용!)
   const prompt = [
     "당신은 전문 추천 AI입니다.",
     "",
     "사용자 요청: " + userInput,
     "",
     "다음 JSON 형식으로 응답하세요:",
     "{",
     "  \\"recommendations\\": [...]",
     "}",
     "",
     "반드시 valid JSON만 반환하세요."
   ].join('\\n');

   // API 호출
   const response = await chatWithAI(prompt);
   const result = JSON.parse(response.content[0].text);
   \`\`\`

4. **UI 컴포넌트 구조**:
   \`\`\`javascript
   function App() {
     const [input, setInput] = useState('');
     const [result, setResult] = useState(null);
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
       
       try {
         const response = await chatWithAI(prompt);
         const data = JSON.parse(response.content[0].text);
         setResult(data);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     };

     return (
       <div className="min-h-screen" style={{
         background: '${themeConfig.colors.background}'
       }}>
         {/* 헤더 - 업체 정보 표시 */}
         <header className="p-6 border-b" style={{ 
           background: '${themeConfig.colors.surface}',
           borderColor: '${themeConfig.colors.border}'
         }}>
           <div className="max-w-4xl mx-auto">
             <h1 className="text-2xl font-bold" style={{ color: '${appSettings?.primaryColor || themeConfig.colors.primary}' }}>
               ${businessInfo?.logoEmoji || '🏪'} ${businessInfo?.businessName || '우리 가게'}
             </h1>
             ${appSettings?.welcomeMessage ? `<p className="text-sm mt-2" style={{ color: '${themeConfig.colors.textSecondary}' }}>${appSettings.welcomeMessage}</p>` : ''}
           </div>
         </header>

         {/* 메인 컨텐츠 */}
         <main className="max-w-4xl mx-auto p-6">
           {/* 입력 폼 */}
           <form onSubmit={handleSubmit}>
             {/* ... */}
           </form>

           {/* 결과 표시 */}
           {result && (
             <div>
               {/* JSON 데이터를 UI로 렌더링 */}
             </div>
           )}
         </main>

         {/* 푸터 - 업체 정보 표시 */}
         <footer className="mt-12 p-6 border-t" style={{ 
           background: '${themeConfig.colors.surface}',
           borderColor: '${themeConfig.colors.border}'
         }}>
           <div className="max-w-4xl mx-auto text-center">
             <p className="text-sm" style={{ color: '${themeConfig.colors.textSecondary}' }}>
               ${businessInfo?.businessName || '우리 가게'}
             </p>
             ${businessInfo?.phone ? `<p className="text-xs mt-1" style={{ color: '${themeConfig.colors.textSecondary}' }}>📞 ${businessInfo.phone}</p>` : ''}
             ${businessInfo?.address ? `<p className="text-xs mt-1" style={{ color: '${themeConfig.colors.textSecondary}' }}>📍 ${businessInfo.address}</p>` : ''}
             ${businessInfo?.hours ? `<p className="text-xs mt-1" style={{ color: '${themeConfig.colors.textSecondary}' }}>🕐 ${businessInfo.hours}</p>` : ''}
           </div>
         </footer>
       </div>
     );
   }
   \`\`\`

5. **절대 금지**:
   - import/export 문 사용
   - 템플릿 리터럴 내 실제 줄바꿈 (\\n 사용)
   - useEffect로 외부 라이브러리 로드
   - API 키 하드코딩

6. **코드만 반환하세요. 설명이나 마크다운 없이 순수 JavaScript 코드만 반환하세요.**`;

    // 데이터가 있으면 템플릿 프롬프트 사용, 없으면 일반 프롬프트
    const userPrompt = hasData 
      ? template.promptTemplate.userPromptTemplate(data, {})
      : `데이터가 제공되지 않았습니다. 일반적인 ${template.name} 앱을 생성하세요. 
         사용자가 입력을 하면 AI가 응답하는 형태로 만들어주세요.`;

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}\n\n위 정보를 바탕으로 완전한 React 앱 코드를 생성하세요. 마크다운 없이 순수 코드만 반환하세요.`;

    // Gemini AI 호출
    console.log('Generating code for:', industry, theme);
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    let code = response.text();

    // 마크다운 코드 블록 제거
    const codeMatch = code.match(/```(?:javascript|jsx|tsx?)?\n([\s\S]*?)\n```/);
    if (codeMatch) {
      code = codeMatch[1];
    }

    // 응답 반환
    return NextResponse.json({
      code,
      templateUsed: industry,
      themeUsed: theme,
      dataCount: hasData ? data.length : 0
    });
  } catch (error) {
    console.error('Generate Template API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '코드 생성 중 오류가 발생했습니다'
      },
      { status: 500 }
    );
  }
}

