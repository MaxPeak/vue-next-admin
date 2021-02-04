// 因为localstorage存值和取值都是字符串，所以需要序列化和反序列化

/**
 * 获取localstorage
 */
export const getLocal = (key: string) => {
  if (!localStorage.getItem(key)) return;
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export type ValueType =
  | string
  | number
  | boolean
  | { [key: string]: ValueType };
/**
 * 设置localstorage
 */
export const setLocal = (key: string, value: ValueType) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 删除localstorage
 */
export const removeLocal = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * 清空localstorage
 */
export const clearLocal = () => {
  localStorage.clear();
};

/**
 * cookie默认是浏览器关闭就删除
 * cookie只有在服务器环境才可以使用
 */

/**
 * 获取cookie
 */
export const getCookie = (key: string) => {
  const arr = document.cookie.match(new RegExp("\\b" + key + "=([^;]+)(;|$)"));
  return arr ? arr[1] : null;
};

/**
 * 设置cookie
 */
export const setCookie = (obj: { [key: string]: ValueType }, time = 0) => {
  const timer = new Date(Date.now() + time * 1000 * 60 * 60 * 24).toUTCString();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      document.cookie = `${key}=${obj[key]};expires=${timer}`;
    }
  }
};

/**
 * 删除cookie
 */
export const removeCookie = (key: string) => {
  const obj = { [key]: "" };
  setCookie(obj, -1);
};

/**
 * 清空cookie
 */
export const clearCookie = () => {
  document.cookie = ``;
};
