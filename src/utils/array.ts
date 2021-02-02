/**
 * 数组升维
 */
export const restore = <T>(arr: T[], len: number) => {
  const result: T[][] = [];
  let index = 0;
  const num = arr.length / len;
  for (let i = 0; i < num; i++) {
    result.push(arr.slice(index, index + len));
    index += len;
  }
  return result;
};

/**
 * 数组扁平化
 */
export const flatten = <T>(arr: T[]) => {
  let result: T[] = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item as T[]));
    } else {
      result.push(item);
    }
  });
  return result;
};
