/**
 * 对象拷贝
 */
export const objectCopy = (obj: { [key: string]: any }, deep: boolean) => {
  //初始化为json
  let result: { [key: string]: any } = {};
  //如果是数组，就初始化为数组
  if (Array.isArray(obj)) result = [];
  for (const key in obj) {
    const value = obj[key];
    const isObject = typeof value === "object" && value !== null;
    //检测是否启用深拷贝，如果是深拷贝就检测值是否对象，是对象就递归，否则就直接赋值
    result[key] = !!deep && isObject ? objectCopy(value, deep) : value;
  }
  return result;
};
