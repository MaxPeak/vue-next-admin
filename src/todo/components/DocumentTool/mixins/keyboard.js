import { getOS } from '../utils'
function keyboardDebounce(fn, time = 200) {
  let timer = null
  return function(event) {
    clearTimeout(timer)
    const { shiftKey, keyCode } = event
    // 在这里进行验证和判断，只把我们自己定义的快捷键默认行为屏蔽掉
    if (
      keyCode === 46 ||
      (this.handleKeyMap[keyCode] && event[this.ctrlKey] && !shiftKey)
    ) {
      event.preventDefault()
      timer = setTimeout(() => {
        fn.apply(this, [event])
      }, time)
    }
  }
}
export default {
  data() {
    const ctrlMap = {
      Window: 'ctrlKey',
      Mac: 'metaKey'
    }
    this.ctrlKey = ctrlMap[getOS()]
    // 大部分的组合键都有系统级的默认功能，无法修改，经测试，这是一些能修改且不影响功能的快捷键
    this.handleKeyMap = {
      90: this.goBack,
      85: this.goAhead,
      69: this.handleMerge,
      73: this.handleInsert,
      38: this.handleMoveUp,
      40: this.handleMoveDown,
      74: this.handleSwop,
      70: this.openFind,
      71: this.openReplace
    }
    return {}
  },
  mounted() {
    document.body.addEventListener('keydown', this.handleKeyboard)
  },
  destroyed() {
    document.body.removeEventListener('keydown', this.handleKeyboard)
  },
  methods: {
    handleKeyboard: keyboardDebounce(function(event) {
      const { keyCode } = event
      if (keyCode === 70 || keyCode === 71) {
        if (!this.validateTableData()) return
      } else {
        if (!this.validateSelect()) return
        if (keyCode === 46) {
          this.handleDelete()
        }
      }
      this.handleKeyMap[keyCode]()
    })
  }
}
