/**
 * query参数格式化
 * @example getQuery('https://baidu.com?foo=bar&baz=bing')
 */
export const getQuery = (url: string) => {
  const result: { [key: string]: string } = {};
  url.replace(/([^?&=]+)=([^&]+)/g, ($0, $1, $2) => (result[$1] = $2));
  return result;
};

/**
 * 把对象转换成url的query参数
 * @example queryString({a:1,b:2})
 */
export const queryString = (obj: { [key: string]: number | string }) => {
  let result = `?`;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result += `${key}=${obj[key]}&`;
    }
  }
  return result.replace(/&$/, "");
};
