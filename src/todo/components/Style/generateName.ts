import murmurhash from "./murmurhash";

const count = (() => {
  let total = 0;
  return () => ++total;
})();

const getAlphabeticChar = (code: number) =>
  String.fromCharCode(code + (code > 25 ? 39 : 97));

const generateAlphabeticName = (code: number) => {
  const charsLength = 52;
  let name = "";
  let x = null;
  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = getAlphabeticChar(x % charsLength) + name;
  }
  return getAlphabeticChar(x % charsLength) + name;
};

const generateName = (str: string) => {
  const hashCode = murmurhash(`${str}${count()}`);
  return generateAlphabeticName(hashCode);
};

export default generateName;
