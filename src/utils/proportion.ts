export type RectInfo = {
  width: number;
  height: number;
};
export type Type = "width" | "height";
/**
 * 等比例
 * @example sameProportion({ width: 600, height: 300 }, "width", 200)
 */
export const sameProportion = (native: RectInfo, type: Type, value: number) => {
  const nativeValue = native[type];
  const nativeTypeMap = {
    width: "height",
    height: "width"
  };
  const nativeType = nativeTypeMap[type];
  return {
    [nativeType]: native[nativeType as Type] / (nativeValue / value),
    [type]: value
  };
};
