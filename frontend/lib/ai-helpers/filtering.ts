/**
 * 🔍 필터링 헬퍼 (예산, 알러지, 식단)
 * 해당 질문이 있을 때만 사용
 */

export const BUDGET_HELPER = `
// 💰 예산 필터링
function filterByBudget(items, budget) {
  if (!budget || budget <= 0) return items;
  return items.filter(item => {
    const price = item.price || item.cost || 0;
    return price <= budget;
  });
}
`;

export const ALLERGEN_HELPER = `
// 🚫 알러지 제외
function filterByAllergens(items, userAllergens) {
  if (!userAllergens || userAllergens.length === 0) return items;
  return items.filter(item => {
    const allergens = item.allergens || [];
    const allergenArray = Array.isArray(allergens) ? allergens : [];
    return !allergenArray.some(a => userAllergens.includes(a));
  });
}
`;

export const DIETARY_HELPER = `
// 🥗 식단 제한
function filterByDietary(items, restrictions) {
  if (!restrictions || restrictions.length === 0) return items;
  return items.filter(item => {
    for (const r of restrictions) {
      if ((r === '채식' || r === 'Vegetarian') && item.isVegetarian === false) return false;
      if ((r === '비건' || r === 'Vegan') && item.isVegan === false) return false;
      if ((r === '글루텐 프리' || r === 'Gluten Free') && item.isGlutenFree === false) return false;
      if ((r === '키토' || r === 'Keto') && item.isKeto === false) return false;
    }
    return true;
  });
}
`;

