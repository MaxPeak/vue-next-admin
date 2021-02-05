import { isObject } from './common'

/**
 * 获取localStorage
 * @param {String} name
 * @returns {String,Object}
 */
export function getStorage(name) {
  const tempVal = localStorage.getItem(name)
  return tempVal && JSON.parse(tempVal)
}

/**
 * 设置localStorage
 * @param {String} name
 * @param {String,Object} value
 */
export function setStorage(name, value) {
  const tempVal = isObject(value) ? JSON.stringify(value) : value
  localStorage.setItem(name, tempVal)
}

/**
 * 删除localStorage
 * @param {String} name
 */
export function removeStorage(name) {
  localStorage.removeItem(name)
}
