import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 시연용 최대 토큰 설정 - 최고 품질 보장
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-pro',
  generationConfig: {
    temperature: 0.2,
    topK: 40,
    topP: 0.9,
    maxOutputTokens: 64000, // 최대 출력 토큰
  },
});

const SYSTEM_PROMPT = `당신은 React 앱 코드를 생성하는 전문 AI입니다.

중요 규칙:
1. import 문을 절대 사용하지 마세요! 대신 전역 React 객체를 사용하세요:
   \`\`\`javascript
   const { useState, useEffect } = React;

   // AI API 호출 예시 (chatWithAI 함수는 이미 전역으로 제공됨)
   const response = await chatWithAI("사용자 메시지");
   console.log(response.content[0].text);
   \`\`\`

2. 절대로 API 키를 코드에 넣지 마세요. chatWithAI 함수가 자동으로 제공됩니다.

3. 코드는 완전하고 즉시 실행 가능해야 합니다 (주석 없이).

4. Tailwind CSS는 이미 로드되어 있으니 바로 사용하세요.

5. 반드시 다음 구조로 코드를 작성하세요:

\`\`\`javascript
const { useState, useEffect } = React;

function App() {
  // 여기에 상태와 로직 작성

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      {/* UI 요소 */}
    </div>
  );
}
\`\`\`

6. 절대 금지 사항:
   - import 문 사용 금지
   - export 문 사용 금지
   - useEffect로 Tailwind 로드하는 코드 금지 (이미 로드됨)
   - 함수 이름은 반드시 "App"으로 (export default 없이)

7. 문자열 처리 중요 규칙 (구문 오류 방지):
   - 여러 줄 문자열은 반드시 백틱(\`) 내에서 \\n으로 이스케이프하거나 한 줄로 작성
   - 템플릿 리터럴 내부에 실제 줄바꿈 금지
   - 긴 프롬프트는 문자열 연결(+) 또는 배열 join() 사용
   - 예시: const prompt = "첫 줄\\n두 번째 줄"; (O)
   - 예시: const prompt = \`첫 줄
                          두 번째 줄\`; (X - 구문 오류!)

8. 사용자 경험을 최우선으로 생각하세요:
   - 로딩 상태 표시
   - 에러 처리
   - 반응형 디자인
   - 직관적인 UI

9. **AI 응답은 반드시 JSON 형태로 받아서 렌더링**:

   AI API를 사용하는 앱을 만들 때, **응답을 JSON 형태로 요청**하세요.
   프록시 서버가 자동으로 JSON 모드를 활성화합니다.

   **JSON 응답 스키마 예시**:

   \`\`\`javascript
   // 추천 앱의 경우
   {
     "title": "추천 제목",
     "summary": "한 줄 요약",
     "sections": [
       {
         "heading": "섹션 제목",
         "items": [
           {
             "name": "항목 이름",
             "description": "상세 설명",
             "highlight": "강조할 내용"
           }
         ]
       }
     ]
   }
   \`\`\`

   **AI 프롬프트 작성 가이드**:

   프롬프트에서 JSON 스키마를 명확하게 정의하세요:

   \`\`\`javascript
   const prompt = [
     "당신은 전문 추천 AI입니다.",
     "",
     "사용자 요청: " + userInput,
     "",
     "다음 JSON 형식으로 응답하세요:",
     "{",
     "  \\"title\\": \\"추천 제목\\",",
     "  \\"summary\\": \\"한 줄 요약\\",",
     "  \\"sections\\": [",
     "    {",
     "      \\"heading\\": \\"섹션 제목\\",",
     "      \\"items\\": [",
     "        {",
     "          \\"name\\": \\"항목 이름\\",",
     "          \\"description\\": \\"상세 설명\\",",
     "          \\"highlight\\": \\"강조 내용\\"",
     "        }",
     "      ]",
     "    }",
     "  ]",
     "}",
     "",
     "반드시 valid JSON만 반환하세요."
   ].join('\\n');
   \`\`\`

   **JSON 렌더링 컴포넌트**:

   \`\`\`javascript
   const JsonRenderer = ({ data }) => {
     return (
       <div className="space-y-6">
         {/* 제목 */}
         {data.title && (
           <h1 className="text-3xl font-bold text-blue-300 mb-2">{data.title}</h1>
         )}

         {/* 요약 */}
         {data.summary && (
           <p className="text-xl text-gray-300 mb-6">{data.summary}</p>
         )}

         {/* 섹션들 */}
         {data.sections?.map((section, sIdx) => (
           <div key={sIdx} className="mb-8">
             <h2 className="text-2xl font-bold text-blue-400 mb-4">{section.heading}</h2>

             <div className="space-y-4">
               {section.items?.map((item, iIdx) => (
                 <div key={iIdx} className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                   <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                   <p className="text-gray-300 leading-relaxed mb-2">{item.description}</p>
                   {item.highlight && (
                     <p className="text-blue-400 font-medium mt-2">✨ {item.highlight}</p>
                   )}
                 </div>
               ))}
             </div>
           </div>
         ))}
       </div>
     );
   };
   \`\`\`

   **사용 예시**:

   \`\`\`javascript
   const [data, setData] = useState(null);

   const handleSubmit = async (e) => {
     e.preventDefault();
     setIsLoading(true);

     const response = await chatWithAI(prompt);
     const jsonData = JSON.parse(response.content[0].text);
     setData(jsonData);

     setIsLoading(false);
   };

   // 렌더링
   {data && (
     <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 max-h-[65vh] overflow-y-auto border border-gray-700">
       <JsonRenderer data={data} />
     </div>
   )}
   \`\`\`

   **결과 페이지 디자인 원칙**:

   1. **카드형 레이아웃**: 각 항목을 카드로 표현
   2. **시각적 계층**: 제목 크기와 색상으로 중요도 표현
   3. **여백 활용**: 섹션 간 충분한 간격 (space-y-6)
   4. **색상 대비**: 배경(gray-900)과 텍스트(blue-400, gray-200) 대비
   5. **강조 표시**: 중요 내용은 다른 색상(blue-400)으로 강조

10. 코드만 반환하고 설명은 하지 마세요.`;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: '프롬프트가 필요합니다' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY가 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n\n사용자 요청: ${prompt}\n\n오직 App.js의 전체 코드만 작성하세요. 설명 없이 코드만 반환하세요.`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    let code = response.text();

    // Extract code from markdown if present
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
