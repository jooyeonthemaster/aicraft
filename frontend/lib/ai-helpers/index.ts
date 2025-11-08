/**
 * ✨ 스마트 헬퍼 선택기
 * 고객 질문에 따라 필요한 헬퍼만 제공
 */

import { CustomerQuestion } from '@/types/templates';
import { NATIONALITY_HELPER } from './nationality';
import { BUDGET_HELPER, ALLERGEN_HELPER, DIETARY_HELPER } from './filtering';
import { JSON_PARSER_HELPER } from './json-parser';

/**
 * 고객 질문을 분석하여 필요한 헬퍼 함수들만 선택
 */
export function getRequiredHelpers(customerQuestions: CustomerQuestion[] = []): string {
  const helpers: string[] = [];
  
  // 항상 포함: JSON 파서 (필수)
  helpers.push(JSON_PARSER_HELPER);
  
  // 질문 분석
  const hasNationality = customerQuestions.some(q => 
    q.id === 'nationality' || q.label.includes('국적') || q.label.toLowerCase().includes('nationality')
  );
  
  const hasBudget = customerQuestions.some(q => 
    q.id === 'budget' || q.label.includes('예산') || q.label.toLowerCase().includes('budget')
  );
  
  const hasAllergens = customerQuestions.some(q => 
    q.id === 'allergens' || q.label.includes('알러지') || q.label.toLowerCase().includes('allergen')
  );
  
  const hasDietary = customerQuestions.some(q => 
    q.id === 'dietary' || q.label.includes('식단') || q.label.toLowerCase().includes('dietary')
  );
  
  // 필요한 헬퍼만 추가
  if (hasNationality) helpers.push(NATIONALITY_HELPER);
  if (hasBudget) helpers.push(BUDGET_HELPER);
  if (hasAllergens) helpers.push(ALLERGEN_HELPER);
  if (hasDietary) helpers.push(DIETARY_HELPER);
  
  return helpers.join('\n\n');
}

/**
 * 질문 타입별 완벽한 JSX 렌더링 코드
 */
export function getInputFieldCode(question: CustomerQuestion): string {
  const { id, label, fieldType, options, required, placeholder } = question;
  
  switch (fieldType) {
    case 'select':
      return `
<div className="mb-4">
  <label className="block mb-2 text-sm font-semibold">
    ${label} ${required ? '<span className="text-red-500">*</span>' : ''}
  </label>
  <select
    value={userInput.${id}}
    onChange={(e) => setUserInput({...userInput, ${id}: e.target.value})}
    className="w-full px-4 py-3 border-2 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
    ${required ? 'required' : ''}
  >
    <option value="">${placeholder || '선택하세요'}</option>
    ${options?.map(opt => `<option value="${opt}">${opt}</option>`).join('\n    ')}
  </select>
</div>`;

    case 'multiselect':
      return `
<div className="mb-4">
  <label className="block mb-2 text-sm font-semibold">${label}</label>
  <div className="space-y-2 max-h-40 overflow-y-auto p-3 border-2 rounded-lg">
    ${options?.map(opt => `
    <label className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-2 rounded">
      <input
        type="checkbox"
        checked={(userInput.${id} || []).includes('${opt}')}
        onChange={(e) => {
          const current = userInput.${id} || [];
          setUserInput({
            ...userInput,
            ${id}: e.target.checked 
              ? [...current, '${opt}']
              : current.filter(item => item !== '${opt}')
          });
        }}
        className="w-4 h-4 text-teal-600 rounded"
      />
      <span className="text-sm">${opt}</span>
    </label>`).join('\n    ')}
  </div>
</div>`;

    case 'number':
      return `
<div className="mb-4">
  <label className="block mb-2 text-sm font-semibold">
    ${label} ${required ? '<span className="text-red-500">*</span>' : ''}
  </label>
  <input
    type="number"
    value={userInput.${id}}
    onChange={(e) => setUserInput({...userInput, ${id}: parseInt(e.target.value) || 0})}
    placeholder="${placeholder || label}"
    className="w-full px-4 py-3 border-2 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
    ${required ? 'required' : ''}
  />
</div>`;

    case 'range':
      return `
<div className="mb-4">
  <label className="block mb-2 text-sm font-semibold">
    ${label}: {userInput.${id} || 0}
  </label>
  <input
    type="range"
    min="0"
    max="10"
    value={userInput.${id} || 0}
    onChange={(e) => setUserInput({...userInput, ${id}: parseInt(e.target.value)})}
    className="w-full"
  />
</div>`;

    case 'text':
    default:
      return `
<div className="mb-4">
  <label className="block mb-2 text-sm font-semibold">
    ${label} ${required ? '<span className="text-red-500">*</span>' : ''}
  </label>
  <input
    type="text"
    value={userInput.${id}}
    onChange={(e) => setUserInput({...userInput, ${id}: e.target.value})}
    placeholder="${placeholder || label}"
    className="w-full px-4 py-3 border-2 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
    ${required ? 'required' : ''}
  />
</div>`;
  }
}

/**
 * AI 프롬프트 생성 가이드
 */
export function getPromptBuildingGuide(customerQuestions: CustomerQuestion[]): string {
  const hasNationality = customerQuestions.some(q => 
    q.id === 'nationality' || q.label.includes('국적')
  );
  const hasBudget = customerQuestions.some(q => 
    q.id === 'budget' || q.label.includes('예산')
  );
  const hasAllergens = customerQuestions.some(q => 
    q.id === 'allergens' || q.label.includes('알러지')
  );

  let guide = `
// ═══════════════════════════════════════════════════════════════
// 📝 AI 프롬프트 구성 (완벽한 패턴)
// ═══════════════════════════════════════════════════════════════

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    // 프롬프트 배열 구성
    const promptParts = [];
    `;

  if (hasNationality) {
    guide += `
    
    // 🌍 국적→언어 (최우선)
    const language = getNationalityLanguage(userInput.nationality || userInput.국적);
    const phrases = getLanguagePhrases(language);
    promptParts.push("⚠️⚠️⚠️ 매우 중요: 반드시 " + language + "로만 응답하세요! ⚠️⚠️⚠️");
    promptParts.push("");`;
  }

  guide += `
    
    // 기본 역할
    promptParts.push("당신은 전문 메뉴 추천 AI입니다.");
    promptParts.push("");
    
    // 고객 정보
    promptParts.push("【고객 정보】");`;

  customerQuestions.forEach(q => {
    if (q.aiInstruction) {
      guide += `
    promptParts.push("- ${q.label}: " + (userInput.${q.id} || '없음') + " → ${q.aiInstruction}");`;
    }
  });

  guide += `
    promptParts.push("");
    
    // JSON 구조 명시
    promptParts.push("다음 JSON 형식으로만 응답:");
    promptParts.push("{");`;

  if (hasNationality || hasBudget || hasAllergens) {
    guide += `
    promptParts.push('  "meta": {');`;
    if (hasNationality) guide += `
    promptParts.push('    "language": "응답언어",');`;
    if (hasBudget) guide += `
    promptParts.push('    "budgetLimit": ' + (userInput.budget || 0) + ',');`;
    if (hasAllergens) guide += `
    promptParts.push('    "excludedAllergens": ' + JSON.stringify(userInput.allergens || []) + ',');`;
    guide += `
    promptParts.push('    "totalRecommendations": 숫자');
    promptParts.push('  },');`;
  }

  guide += `
    promptParts.push('  "recommendations": [');
    promptParts.push('    { "name": "메뉴명", "price": 가격, "description": "설명", "reason": "이유" }');
    promptParts.push('  ]');
    promptParts.push('}');
    promptParts.push("");
    promptParts.push("⚠️ valid JSON만 반환. 설명 금지!");
    
    // 프롬프트 완성
    const finalPrompt = promptParts.join('\\n');
    
    // AI 호출
    const response = await chatWithAI(finalPrompt);
    const result = safeParseAIResponse(response);
    
    if (!result) {
      ${hasNationality ? 'setError(phrases.error);' : 'setError("오류가 발생했습니다.");'}
      return;
    }
    
    setResult(result);
    
  } catch (error) {
    console.error(error);
    ${hasNationality ? 'setError(phrases.error);' : 'setError("오류가 발생했습니다.");'}
  } finally {
    setLoading(false);
  }
};`;

  return guide;
}

