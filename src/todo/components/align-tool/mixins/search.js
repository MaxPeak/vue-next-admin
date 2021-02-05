// 查找替换mixin
export default {
  data() {
    return {
      search: {
        type: 'search',
        visible: false,
        list: [],
        index: 0
      }
    }
  },
  computed: {
    calcCuttentIndex() {
      if (this.search.list.length) {
        // +1是为了符合计数直觉，从1开始，而不是计算机的从0开始
        return this.search.index + 1
      }
      return this.search.list.length
    }
  },
  methods: {
    // 切换dialog
    toggleDialog(type) {
      if (type !== this.search.type && this.search.visible) {
        this.search.type = type
        return
      }
      this.search.type = type
      this.search.visible = !this.search.visible
    },
    // 查找
    searchHandle(reg) {
      // 搜索到的匹配项
      console.log('search', reg)
    },
    // 查找下一个
    searchNext() {
      console.log('searchNext')
    },
    // 查找上一个
    searchPrev() {
      console.log('searchPrev')
    },
    // 大小写敏感
    caseChange(reg) {
      console.log('caseChange', reg)
    },
    // 替换
    replace(replaceText) {
      console.log('replace', replaceText)
    },
    // 替换所有
    replaceAll(replaceText) {
      console.log('replaceAll', replaceText)
    }
  }
}
