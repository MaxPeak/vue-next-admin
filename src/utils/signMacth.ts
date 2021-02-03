/**
 * 括号匹配
 * @example signMacth("[](){{{()}}}")
 */
export const signMacth = (str: string) => {
  //记录左右括号对应符号
  const leftSign = ["(", "[", "{"],
    rightSign = [")", "]", "}"];
  //栈
  const stack = [];
  //逐字检测
  for (let i = 0, len = str.length; i < len; i++) {
    const s = str.charAt(i);
    //检测是否左括号
    if (leftSign.indexOf(s) !== -1) {
      //入栈
      stack.push(s);
    }
    //检测是否右括号
    else if (rightSign.indexOf(s) !== -1) {
      //检测栈顶符号是否和当前符号匹配
      if (leftSign.indexOf(stack.pop() as string) !== rightSign.indexOf(s)) {
        return false;
      }
    }
  }
  return !stack.length;
};
