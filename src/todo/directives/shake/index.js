import './style.scss'
const removehandleMouseenter = '@@shakeMouseenter'
const removehandleMouseleave = '@@shakeMouseleave'
const removehandleClick = '@@shakeClick'
const handleMouseenter = el => {
  const handle = () => {
    el.classList.add('shake')
  }
  el[removehandleMouseenter] = handle
  return handle
}
const handleMouseleave = el => {
  const handle = () => {
    el.classList.remove('shake')
  }
  el[removehandleMouseleave] = handle
  return handle
}
const handleClick = el => {
  let addTimer = null
  let removeTimer = null
  const handle = () => {
    el.classList.remove('shake')
    clearTimeout(addTimer)
    clearTimeout(removeTimer)
    addTimer = setTimeout(() => {
      el.classList.add('shake')
    }, 13)
    removeTimer = setTimeout(() => {
      el.classList.remove('shake')
    }, 500)
  }
  el[removehandleClick] = handle
  return handle
}
export default {
  name: 'shake',
  bind(el, { value = 'click' }) {
    if (value === 'click') {
      el.addEventListener('click', handleClick(el), false)
    }
    if (value === 'hover') {
      el.addEventListener('mouseenter', handleMouseenter(el), false)
      el.addEventListener('mouseleave', handleMouseleave(el), false)
    }
  },
  unbind(el) {
    el.removeEventListener('mouseenter', el[removehandleMouseenter], false)
    el.removeEventListener('mouseleave', el[removehandleMouseleave], false)
    Reflect.deleteProperty(el, removehandleMouseenter)
    Reflect.deleteProperty(el, removehandleMouseleave)
  }
}
