const REGEX_FORMAT = /Y{2,4}|M{1,2}|D{1,2}|h{1,2}|m{1,2}|s{1,2}/g
const REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?$/
const FORMAT_DEFAULT = 'YYYY-MM-DD hh:mm:ss'

/**
 * 补零
 * @param {Number} tar -> 需要补丁的数字
 * @param {Number} len -> 补零位数
 * @param {String} pad -> 填充字符
 */
const zeroPadding = (tar, len = 2, pad = '0') => {
  const str = String(tar)
  if (!str || str.length >= len) return tar
  return `${Array(len + 1 - str.length).join(pad)}${tar}`
}

/**
 * 格式化：三种格式
 * 1.new Date() -> 时间对象
 * 2.Date.now() -> 时间戳
 * 3."2019-10-11 16:53:33" -> 时间格式的字符串
 * @param {Date|String|Number} date
 * @returns {Date}
 */
const parseDate = date => {
  if (date === null) return new Date(NaN)
  if (date instanceof Date) return new Date(date)
  if (typeof date === 'string') {
    const d = date.match(REGEX_PARSE)
    if (d) {
      return new Date(
        d[1],
        d[2] - 1,
        d[3] || 1,
        d[4] || 0,
        d[5] || 0,
        d[6] || 0,
        d[7] || 0
      )
    }
  }
  return new Date(date)
}

// 主函数
export const myDate = (date = new Date()) => {
  // init
  const $d = parseDate(date)
  const Y = $d.getFullYear()
  const M = $d.getMonth() + 1 // 0-11
  const D = $d.getDate()
  const h = $d.getHours()
  const m = $d.getMinutes()
  const s = $d.getSeconds()
  // format
  const format = (formatStr = FORMAT_DEFAULT) => {
    const matches = {
      YY: String(Y).slice(-2),
      YYYY: Y,
      M,
      MM: zeroPadding(M),
      D,
      DD: zeroPadding(D),
      h,
      hh: zeroPadding(h),
      m: String(m),
      mm: zeroPadding(m),
      s: String(s),
      ss: zeroPadding(s)
    }
    return formatStr.replace(REGEX_FORMAT, match => matches[match])
  }
  return {
    format
  }
}
