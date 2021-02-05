import Vue from 'vue'
import MenuConstructor from '@/components/Contextmenu'

const Menu = Vue.extend(MenuConstructor)
const removeHandle = '@@menuHandle'
let menu = null

const showMenu = ({ position, list }) => {
  menu = menu || new Menu()
  menu.position = position
  menu.menus = list
  menu.isShow = true
  menu.$mount()
  document.body.appendChild(menu.$el)
}

const handleContextmenu = (ele, value) => {
  const handle = event => {
    event.preventDefault()
    const { clientY, clientX } = event
    showMenu({
      position: { x: clientX, y: clientY },
      list: value
    })
  }
  ele[removeHandle] = handle
  return handle
}

Vue.prototype.$contextmenu = showMenu

export default {
  name: 'menu',
  bind(el, { value }) {
    el.addEventListener('contextmenu', handleContextmenu(el, value), false)
  },
  update(el, { value }) {
    el.removeEventListener('contextmenu', el[removeHandle], false)
    el.addEventListener('contextmenu', handleContextmenu(el, value), false)
  },
  unbind(el) {
    el.removeEventListener('contextmenu', el[removeHandle], false)
    Reflect.deleteProperty(el, removeHandle)
  }
}
