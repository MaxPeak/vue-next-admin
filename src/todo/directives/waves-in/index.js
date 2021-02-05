import './style.scss'

const removeHandle = '@@wavesInHandle'

const handleClick = (ele, options) => {
  const handle = ({ clientY, clientX }) => {
    if (!ele) return
    const defaultOptions = {
      // hit 点击位置扩散 center中心点扩展
      type: 'hit',
      // 波纹颜色
      color: 'rgba(0, 0, 0, 0.15)'
    }
    const { type, color } = { ...defaultOptions, ...options }

    ele.style.cssText = `position:relative;overflow:hidden`
    let ripple = ele.querySelector('.waves-in')
    if (ripple) {
      ripple.classList.remove('active')
    } else {
      ripple = document.createElement('span')
      ripple.classList.add('waves-in')
      ele.appendChild(ripple)
    }
    const { width, height, left, top } = ele.getBoundingClientRect()
    const eleSize = Math.max(width, height)
    const body = document.documentElement || document.body
    const map = {
      center: {
        top: (height - eleSize) / 2,
        left: (width - eleSize) / 2
      },
      hit: {
        top: clientY - top - eleSize / 2 - body.scrollTop,
        left: clientX - left - eleSize / 2 - body.scrollLeft
      }
    }
    const topStr = `top:${map[type].top}px;`
    const leftStr = `left:${map[type].left}px;`
    const bgStr = `background-color:${color};`
    const heightStr = `height:${eleSize}px;`
    const widthStr = `width:${eleSize}px;`
    ripple.style.cssText = heightStr.concat(widthStr, topStr, leftStr, bgStr)
    ripple.classList.add('active')
  }

  ele[removeHandle] = handle
  return handle
}

export default {
  name: 'waves-in',
  bind(el, { value }) {
    el.addEventListener('click', handleClick(el, value), false)
  },
  update(el, { value }) {
    el.removeEventListener('click', el[removeHandle], false)
    el.addEventListener('click', handleClick(el, value), false)
  },
  unbind(el) {
    el.removeEventListener('click', el[removeHandle], false)
    Reflect.deleteProperty(el, removeHandle)
  }
}
