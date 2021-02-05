let isDown = false
let mousedownData = {}
let parent = document.body

const mousedown = ({ target, clientX, clientY }) => {
  isDown = true
  const { left, top, width, height } = target.getBoundingClientRect()
  const {
    width: parentWidth,
    height: parentHeight,
    left: parentLeft,
    top: parentTop
  } = parent.getBoundingClientRect()
  mousedownData = {
    target,
    left,
    top,
    width,
    height,
    clientX,
    clientY,
    parentWidth,
    parentHeight,
    parentLeft,
    parentTop
  }
}
const mousemove = ({ clientX, clientY }) => {
  if (!isDown) return
  document.body.style.userSelect = 'none'
  parent.style.position = 'relative'
  const {
    left: DL,
    top: DT,
    clientX: DX,
    clientY: DY,
    parentWidth: PW,
    parentHeight: PH,
    parentLeft: PL,
    parentTop: PT,
    width: DW,
    height: DH,
    target
  } = mousedownData
  let left = DL + clientX - DX - PL
  let top = DT + clientY - DY - PT
  left = Math.max(0, Math.min(left, PW - DW))
  top = Math.max(0, Math.min(top, PH - DH))
  target.style.cssText = `position:absolute;top:${top}px;left:${left}px`
}
const mouseup = () => {
  isDown = false
  mousedownData = {}
  document.body.style.userSelect = ''
}

export default {
  name: 'drag',
  bind(el) {
    el.addEventListener('mousedown', mousedown, false)
    document.addEventListener('mousemove', mousemove, false)
    document.addEventListener('mouseup', mouseup, false)
  },
  update(el, { value }) {
    parent = value.parent || document.body
  },
  unbind(el) {
    el.removeEventListener('mousedown', mousedown, false)
    document.removeEventListener('mousemove', mousemove, false)
    document.removeEventListener('mouseup', mouseup, false)
  }
}
