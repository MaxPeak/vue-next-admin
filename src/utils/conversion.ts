/**
 * 进制转换
 * @example conversion(255, 16)
 */
export const conversion = (number: number, radix = 2) => {
  const stack = [];
  //16进制需要用到字母
  const sign = "0123456789abcdef";
  let result = "";
  //取所有余数
  while (number > 0) {
    //余数入栈
    stack.push(sign[number % radix]);
    //每次取商
    number = Math.floor(number / radix);
  }
  //余数出栈
  while (stack.length) {
    result += stack.pop();
  }
  return result;
};

/**
 * 单位转换
 * @example bytesToSize(1024)
 */
export const bytesToSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const base = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const index = Math.floor(Math.log(bytes) / Math.log(base));
  return (bytes / base ** index).toFixed(2) + " " + sizes[index];
};

/**
 * 下划线转驼峰
 * @example underline2Hump('my_fn')
 */
export const underline2Hump = (str: string) =>
  str.replace(/_(\w)/g, ($0, $1) => $1.toUpperCase());

/**
 * 驼峰转下划线
 * @example hump2Underline('myFn')
 */
export const hump2Underline = (str: string) =>
  str.replace(/([A-Z])/g, $0 => `_${$0.toLowerCase()}`);

/**
 * string转ArrayBuffer对象
 */
export const stringToArrayBuffer = (str: string) => {
  return new Promise(resolve => {
    //字符串转blob类文件对象
    const blob = new Blob([str]);
    //利用FileReader操作这个对象
    const file = new FileReader();
    //把blob对象转成ArrayBuffer对象
    file.readAsArrayBuffer(blob);
    file.onload = res => {
      // const result = res.currentTarget.result;
      const result = res.target?.result;
      resolve(result);
    };
  });
};

/**
 * ArrayBuffer转string
 */
export const arrayBufferToString = (buffer: ArrayBuffer) => {
  let result;
  if (window.TextDecoder) {
    const win1251decoder = new TextDecoder("windows-1251");
    //利用TextDecoder对象直接转码，无需转换成Uint8Array，但不支持ie
    result = win1251decoder.decode(buffer);
  } else {
    //兼容ie和现代浏览器
    //在进行一次Uint8Array的转换，因为直接传ArrayBuffer，fromCharCode方法不支持
    const data = new Uint8Array(buffer);
    //利用fromCharCode方法转码到原始字符串数据
    result = String.fromCharCode.apply(null, data);
  }
  return result;
};

/**
 * base64转换成2进制字符串
 */
export const base64ToBinaryString = (base64: string) => {
  let str = "";
  for (const item of base64) {
    str += item.charCodeAt(0).toString(2);
  }
  return str;
};

/**
 * base64转换成Blob对象
 * base64数据由 A-Z a-z 0~9 + / = 64位字符组成
 */
export const base64ToBlob = (base64: string) => {
  const [first, last] = base64.split(",");
  const [, mime] = first.match(/:(.*?);/) || [];
  const bstr = atob(last);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
