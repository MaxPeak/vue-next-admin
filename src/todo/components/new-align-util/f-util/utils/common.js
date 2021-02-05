/**
 * 是否是对象
 * @param {Object} obj
 * @returns {Boolean}
 */
// eslint-disable-next-line valid-typeof
export const isObject = obj => typeof obj !== null && typeof obj === 'object'

/**
 * 防抖
 * @param {Function} fn 需要防抖的函数
 * @param {Date} time 时间间隔，默认200ms
 * @returns {Function}
 */
export function debounce(fn, time = 200) {
  let timer = null
  return function(...rest) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, rest)
    }, time)
  }
}

/**
 * 获取操作系统
 */
export const getOS = () => {
  const { userAgent } = navigator
  if (userAgent.includes('Window')) return 'Window'
  if (userAgent.includes('Mac OS X')) return 'Mac'
}
