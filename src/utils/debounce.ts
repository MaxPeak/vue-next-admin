/**
 * 防抖
 */
export function debounce(fn: () => void, time = 200) {
  let timer: number;
  return function(...rest: []) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, rest);
    }, time);
  };
}
