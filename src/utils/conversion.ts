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
