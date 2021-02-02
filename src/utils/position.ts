/**
 * 鼠标方向获取
 * @example const result = getPosition(event);
 */
export const getPosition = (event: MouseEvent) => {
  const { clientX, clientY, target } = event;
  const {
    left,
    right,
    top,
    bottom
  } = (target as HTMLElement).getBoundingClientRect();
  const { abs } = Math;
  const positionMap = {
    top: clientY - top,
    bottom: abs(clientY - bottom),
    left: clientX - left,
    right: abs(clientX - right)
  };
  const entires = Object.entries(positionMap);
  const defaultValue = entires[0][1];
  const result = entires.reduce(
    (a, b) => {
      if (b[1] <= a.value) {
        a.value = b[1];
        a.type = b[0];
      }
      return a;
    },
    { value: defaultValue, type: "" }
  );
  return result.type;
};
