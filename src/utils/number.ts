/**
 * 最大值
 */
export const max = (...rest: number[]) => {
  let [result] = rest;
  if (rest.length === 1) return result;
  for (const item of rest) {
    result = result >= item ? result : item;
  }
  return result;
};

/**
 * 最小值
 */
export const min = (...rest: number[]) => {
  let [result] = rest;
  if (rest.length === 1) return result;
  for (const item of rest) {
    result = result >= item ? item : result;
  }
  return result;
};
