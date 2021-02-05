// 查找替换mixin
export default {
  data() {
    return {
      // 类型
      searchType: 'search',
      // 是否显示
      searchVisible: false,
      // 查找到的当前索引
      currentIndex: 0,
      // 查找到的list
      serachList: []
    }
  },
  computed: {
    calcCuttentIndex() {
      if (this.serachList.length) {
        // +1是为了符合计数直觉，从1开始，而不是计算机的从0开始
        return this.currentIndex + 1
      }
      return this.serachList.length
    }
  },
  methods: {
    // 切换dialog
    toggleDialog(type) {
      if (type !== this.searchType && this.searchVisible)
        return (this.searchType = type)
      this.searchType = type
      this.searchVisible = !this.searchVisible
    },
    // 查找
    search(reg) {
      // 搜索到的匹配项
      const tempSearchList = []
      let isMatch = false

      this.tableData.forEach((row, index) => {
        const source = row.sourceCopy
        const target = row.targetCopy
        // 每次高亮前先清空上次的结果
        this.$set(row, 'sourceContent', source)
        this.$set(row, 'targetContent', target)
        if (source && reg.test(source)) {
          const [content] = source.match(reg)
          const newContent = this.searchHighlight(source, reg, content)
          this.$set(row, 'sourceContent', newContent)
          tempSearchList.push(index)
          isMatch = true
        }
        if (target && reg.test(target)) {
          const [content] = target.match(reg)
          const newContent = this.searchHighlight(target, reg, content)
          this.$set(row, 'targetContent', newContent)
          tempSearchList.push(index)
          isMatch = true
        }
        if (!isMatch) {
          this.$set(row, 'sourceContent', source)
          this.$set(row, 'targetContent', target)
        }
      })
      // 没有匹配就重置会最初状态
      if (!isMatch) {
        this.currentIndex = 0
        this.serachList = []
        this.resetSearchResult()
        return
      }
      // 去重
      this.serachList = [...new Set(tempSearchList)]
      // 选中行
      this.rowHighlight(reg)
    },
    // 查找下一个
    searchNext() {
      if (this.currentIndex >= this.serachList.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
      this.rowHighlight()
    },
    // 查找上一个
    searchPrev() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.serachList.length - 1
      } else {
        this.currentIndex--
      }
      this.rowHighlight()
    },
    // 大小写敏感
    caseChange(reg) {
      this.search(reg)
    },
    // 替换
    replace(replaceText) {
      const reg = new RegExp(`<span class="search-highlight">(.*)</span>`)
      const currentIndex = this.serachList[this.currentIndex]
      const { sourceContent, targetContent } = this.tableData[currentIndex]
      if (reg.test(sourceContent)) {
        const newContent = sourceContent.replace(reg, replaceText)
        this.$set(this.tableData[currentIndex], 'sourceContent', newContent)
      }
      if (reg.test(targetContent)) {
        const newContent = targetContent.replace(reg, replaceText)
        this.$set(this.tableData[currentIndex], 'targetContent', newContent)
      }
    },
    // 替换所有
    replaceAll(replaceText) {
      const reg = new RegExp(`<span class="search-highlight">(.*)</span>`)
      this.serachList.forEach(index => {
        const { sourceContent, targetContent } = this.tableData[index]
        if (reg.test(sourceContent)) {
          const newContent = sourceContent.replace(reg, replaceText)
          this.$set(this.tableData[index], 'sourceContent', newContent)
        }
        if (reg.test(targetContent)) {
          const newContent = targetContent.replace(reg, replaceText)
          this.$set(this.tableData[index], 'targetContent', newContent)
        }
      })
    },
    // 搜索内容高亮
    searchHighlight(oldVal, reg, newVal) {
      return oldVal.replace(
        reg,
        `<span class="search-highlight">${newVal}</span>`
      )
    },
    // 行高亮
    rowHighlight(reg) {
      // 如果是关闭搜索框就取消搜索和高亮
      if (reg && reg.source === '(?:)') {
        this.resetSearchResult()
        return
      }
      const currentIndex = this.serachList[this.currentIndex]
      this.multipleRow = [currentIndex]
      this.changeActive()
      this.rowScrollInView(currentIndex)
      this.currentInfo = {
        indexList: this.oldMultipleRow,
        column: { prop: 'no' },
        row: this.tableData[currentIndex],
        rowIndex: currentIndex
      }
    },
    // 控制选中行在可视范围内
    rowScrollInView(index) {
      const rowEle = this.$refs['f-table'].getElement(index)
      rowEle && rowEle.scrollIntoView({ block: 'center' })
    },
    // 重置搜索结果
    resetSearchResult() {
      this.multipleRow = []
      this.currentInfo = null
      this.changeActive()
    }
  }
}
