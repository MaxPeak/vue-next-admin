/**
 * promise 包装器
 */
export const promisify = fn => {
  return (...rest) => {
    return new Promise((resolve, reject) => {
      fn &&
        fn(...rest, (err, ...arg) => {
          if (err) {
            reject(err);
          } else {
            resolve(...arg);
          }
        });
    });
  };
};
