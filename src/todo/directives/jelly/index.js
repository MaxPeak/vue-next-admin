import './style.scss'
const removehandleMouseenter = '@@jellyMouseenter'
const removehandleMouseleave = '@@jellyMouseleave'
const removehandleClick = '@@jellyClick'
const handleMouseenter = el => {
  const handle = () => {
    el.classList.add('jelly')
  }
  el[removehandleMouseenter] = handle
  return handle
}
const handleMouseleave = el => {
  const handle = () => {
    el.classList.remove('jelly')
  }
  el[removehandleMouseleave] = handle
  return handle
}
const handleClick = el => {
  let addTimer = null
  let removeTimer = null
  const handle = () => {
    el.classList.remove('jelly')
    clearTimeout(addTimer)
    clearTimeout(removeTimer)
    addTimer = setTimeout(() => {
      el.classList.add('jelly')
    }, 13)
    removeTimer = setTimeout(() => {
      el.classList.remove('jelly')
    }, 500)
  }
  el[removehandleClick] = handle
  return handle
}
export default {
  name: 'jelly',
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
