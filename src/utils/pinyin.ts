import PinYin from "./PinYin.json";

/**
 * 中文转拼音
 */
const Chinese2pinyin = (name: string) => {
  for (const key in PinYin) {
    if (
      Object.prototype.hasOwnProperty.call(PinYin, key) &&
      PinYin[key].match(name)
    ) {
      return key;
    }
  }
  return "";
};

/**
 * 自动填充补齐
 */
const autoPad = (name: string, length: number) => {
  if (name.length > length) return name;
  const num = length - name.length - 2 <= 0 ? 0 : length - name.length - 2;
  return `${name}_${"".padEnd(num, "0")}1`;
};

/**
 * 生成新的名字
 */
export const generateName = (name: string, length = 6) => {
  const ChineseReg = /[\u4e00-\u9fa5]/;
  const newName = name
    .split("")
    .map(word => {
      const result = word.match(ChineseReg);
      if (!result) return word;
      const [Chinese] = result;
      const [firstPinyin] = Chinese2pinyin(Chinese);
      return firstPinyin;
    })
    .join("");
  return autoPad(newName, length);
};
