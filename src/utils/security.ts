/**
 * encodeURI 用于对url进行转码，但是只转译中文
 * decodeURI 用于对url进行解码，但是只转译中文
 * btoa 将字符串转换成base64，但是不能对中文转码
 * atob 将base64转换成原始字符串，但是不能对中文转码
 * charCodeAt 返回给定索引处的UTF-16代码单元
 * String.fromCharCode 返回UTF-16代码单元对应的字符
 */

/**
 * 对字符串进行加密
 */
export const encryption = (str: string) => {
  const text = btoa(encodeURI(str));
  const len = text.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(text.charCodeAt(i));
  }
  return result.join(",");
};

/**
 * 对字符串进行解密
 */
export const decryption = (str: string) => {
  const arr = str.split(",").map(word => Number(word));
  const result = String.fromCharCode(...arr);
  return decodeURI(atob(result));
};
