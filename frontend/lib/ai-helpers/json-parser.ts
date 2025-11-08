/**
 * 🛡️ 안전한 JSON 파싱
 * 항상 포함
 */

export const JSON_PARSER_HELPER = `
// ═══════════════════════════════════════════════════════════════
// 🛡️ 안전한 JSON 파싱
// ═══════════════════════════════════════════════════════════════

function safeParseAIResponse(response) {
  try {
    let text = response?.content?.[0]?.text || '';
    
    // 마크다운 코드 블록 제거
    const codeMatch = text.match(/\\\`\\\`\\\`(?:json)?\\s*([\\s\\S]*?)\\s*\\\`\\\`\\\`/);
    if (codeMatch) text = codeMatch[1];
    
    // 앞쪽 설명 텍스트 제거 (JSON 시작점 찾기)
    const lines = text.split('\\n');
    let jsonStart = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('{') || lines[i].trim().startsWith('[')) {
        jsonStart = i;
        break;
      }
    }
    if (jsonStart > 0) text = lines.slice(jsonStart).join('\\n');
    
    // JSON 파싱
    const parsed = JSON.parse(text);
    
    // 기본 검증
    if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
      console.error('Invalid structure:', parsed);
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error('Parse error:', error);
    console.error('Raw text:', response?.content?.[0]?.text?.substring(0, 200));
    return null;
  }
}
`;

