/**
 * 统计字符串次数
 */
export const lcs = (str: string) => {
  const res = str.split("").reduce((a, b) => {
    return (a[b] = a[b] ? ++a[b] : 1), a;
  }, {} as { [key: string]: number });
  return Object.entries(res).reduce(
    (obj, [key, value]) => {
      if (value > obj.max) {
        obj.max = value;
        obj.result = key;
      }
      return obj;
    },
    { max: 0, result: "" } as { max: number; result: string }
  );
};

export const toHyphenate = (str: string) => {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, "-$1").toLocaleLowerCase();
};

export const toCamelCase = (str: string) => {
  const camelCaseRE = /\-([a-z])/g;
  return str.replace(camelCaseRE, $1 =>
    $1.replace(/\-/, "").toLocaleUpperCase()
  );
};
