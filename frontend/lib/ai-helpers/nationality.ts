/**
 * 🌍 국적 & 다국어 처리 헬퍼
 * 국적 질문이 있을 때만 사용
 */

export const NATIONALITY_HELPER = `
// ═══════════════════════════════════════════════════════════════
// 🌍 국적→언어 변환
// ═══════════════════════════════════════════════════════════════

function getNationalityLanguage(nationality) {
  const languageMap = {
    '한국': '한국어', '미국': '영어', '영국': '영어', '캐나다': '영어',
    '호주': '영어', '일본': '일본어', '중국': '중국어', '대만': '중국어',
    '프랑스': '프랑스어', '독일': '독일어', '스페인': '스페인어',
    '이탈리아': '이탈리아어', '베트남': '베트남어', '태국': '태국어',
    '기타': '영어'
  };
  return languageMap[nationality] || '한국어';
}

function getLanguagePhrases(language) {
  const phrases = {
    '한국어': { loading: '추천 생성 중...', error: '오류가 발생했습니다.', submit: '추천받기', results: '추천 메뉴' },
    '영어': { loading: 'Generating...', error: 'Error occurred.', submit: 'Get Recommendations', results: 'Recommendations' },
    '일본어': { loading: '生成中...', error: 'エラー発生。', submit: 'おすすめを受け取る', results: 'おすすめメニュー' },
    '중국어': { loading: '生成中...', error: '发生错误。', submit: '获取推荐', results: '推荐菜单' },
    '프랑스어': { loading: 'Génération...', error: 'Erreur.', submit: 'Obtenir', results: 'Recommandations' },
    '독일어': { loading: 'Generierung...', error: 'Fehler.', submit: 'Empfehlung', results: 'Empfohlene' }
  };
  return phrases[language] || phrases['한국어'];
}
`;

