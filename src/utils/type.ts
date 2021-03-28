export const isDOM = (target: HTMLElement) => {
  const isObj = typeof HTMLElement === "object";
  const checkInstance = target instanceof HTMLElement;
  const checkNodeProperty =
    target &&
    typeof target === "object" &&
    target.nodeType === 1 &&
    typeof target.nodeName === "string";

  return isObj ? checkInstance : checkNodeProperty;
};

export const isFunction = (fn: any) => {
  return (
    typeof fn === "function" &&
    Object.prototype.toString.call(fn) === "[object Function]"
  );
};
