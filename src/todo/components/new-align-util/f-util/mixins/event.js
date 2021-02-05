import { debounce, getOS } from '../utils/common'
// 需要验证的事件
const validataList = [
  'merge',
  'remove',
  'insert',
  'move',
  'split',
  'swop',
  'editor'
]
// 初始化全局事件mixin
export default {
  data() {
    return {
      // 光标的字符长度
      selectPosition: 0,
      // 光标选中的内容
      selectContent: {}
    }
  },
  mounted() {
    this.initEvent()
  },
  destroyed() {
    this.removeEvent()
  },
  methods: {
    // 添加事件
    initEvent() {
      document.addEventListener('selectionchange', this.selectionchange)
      document.body.addEventListener('keydown', this.keyboard)
    },
    // 卸载事件
    removeEvent() {
      document.removeEventListener('selectionchange', this.selectionchange)
      document.body.removeEventListener('keydown', this.keyboard)
    },
    // 快捷键
    keyboard(event) {
      const map = {
        Window: 'ctrlKey',
        Mac: 'metaKey'
      }
      const ctrlKey = map[getOS()]
      switch (true) {
        case event[ctrlKey] && event.shiftKey === false && event.keyCode === 90:
          this.goback()
          break
        case event[ctrlKey] && event.shiftKey && event.keyCode === 90:
          this.goahead()
          break
        case event.ctrlKey && event.keyCode === 77:
          this.handleEvent('merge')
          break
        case event[ctrlKey] && event.keyCode === 38:
          event.preventDefault()
          this.handleEvent('move', 'up')
          break
        case event[ctrlKey] && event.keyCode === 40:
          event.preventDefault()
          this.handleEvent('move', 'down')
          break
        case event.keyCode === 46:
          this.handleEvent('remove')
          break
      }
    },
    // 事件包装器
    handleEvent: debounce(function(eventName, ...rest) {
      if (validataList.includes(eventName) && !this.currentInfo) {
        return this.$message.warning('请选中行在进行操作')
      }
      this[eventName](...rest)
    }),
    // 监听光标
    selectionchange: debounce(function() {
      if (!(this.currentInfo && this.isEdit)) return
      this.selectPosition = this.getSelectPosition(
        this.currentInfo.event.target
      )
      this.selectContent.text = this.getSelectContent()
    }),
    // 获取光标位置值
    getSelectPosition(el) {
      const range = window.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(el)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      return preCaretRange.toString().trim().length
    },
    // 获取光标选中的内容
    getSelectContent() {
      return window.getSelection().toString()
    }
  }
}
