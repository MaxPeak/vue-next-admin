/**
 * 随机数
 * Math.random是一个0-1的左闭右开区间(取得到0取不到1)，即 =>>> [0-1)这个样子,为了方便实用，可以利用计算来实现一个取随意区间的方法
 */

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

/**
 * 创建一个随机数数组
 */
export const randomArray = (
  min: number,
  max: number,
  leng: number,
  isRepeat: boolean
) => {
  let result: number[] = [];
  while (result.length < leng) {
    const num = random(min, max);
    result.push(num);
    if (isRepeat) result = [...new Set(result)];
  }
  return result;
};

/**
 * 创建一个随机的rgb颜色值
 * @returns {String}
 */
export const randomRGB = () =>
  `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

/**
 * 创建一个随机的rgba颜色值
 * @returns {String}
 */
export const randomRGBA = () => {
  return `rgba(${random(0, 255)},${random(0, 255)},${random(
    0,
    255
  )}),${Math.random().toFixed(1)}`;
};

/**
 * 创建一个随机的16进制颜色值
 * @returns {String}
 */
export const random16 = () => {
  //16进制的基本值
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  const len = arr.length - 1;
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += arr[random(0, len)];
  }
  return color;
};
