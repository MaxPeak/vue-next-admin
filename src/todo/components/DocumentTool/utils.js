/**
 * 获取操作系统
 */
export const getOS = () => {
  const { userAgent } = navigator
  if (userAgent.includes('Window')) return 'Window'
  if (userAgent.includes('Mac OS X')) return 'Mac'
}
