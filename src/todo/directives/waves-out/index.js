import './style.scss'

const removeHandle = '@@wavesOutHandle'

const handleClick = (ele, color = '#1890ff') => {
  const handle = () => {
    if (!ele) return
    ele.style.position = 'relative'
    let ripple = ele.querySelector('.waves-out')
    if (ripple) {
      ripple.classList.remove('active')
    } else {
      ripple = document.createElement('span')
      ripple.classList.add('waves-out')
      ele.appendChild(ripple)
    }
    ripple.style.borderColor = color
    ripple.offsetWidth
    ripple.classList.add('active')
  }

  ele[removeHandle] = handle
  return handle
}

export default {
  name: 'waves-out',
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
