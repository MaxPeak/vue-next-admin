/**
 * 节流
 */
export const throttle = (fn: () => void, time = 500) => {
  let startTime = Date.now();
  return function(...rest: []) {
    const time_ = Date.now() - startTime >= time;
    if (!time_) return;
    fn.apply(this, rest);
    startTime = Date.now();
  };
};
