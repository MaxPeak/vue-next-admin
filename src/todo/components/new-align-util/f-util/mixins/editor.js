// 编辑模式mixin
export default {
  data() {
    return {
      // 是否是编辑模式
      isEdit: false
    }
  },
  methods: {
    // 双击事件处理程序
    cellDblclick() {
      if (!this.currentInfo) return
      const { row, column } = this.currentInfo
      if (row[`${column.prop}Disabled`]) return
      this.editor()
    },
    // 进入编辑模式
    editor() {
      const { event, rowIndex, column } = this.currentInfo
      if (column.prop === 'no') return
      this.isEdit = true
      this.$set(this.tableData[rowIndex], 'editor', true)
      this.$nextTick(this.selectChangeEnd.bind(this, event.target))
    },
    // 取消编辑模式
    cancelEditor(rowIndex) {
      this.$set(this.tableData[rowIndex], 'editor', false)
    },
    // 光标移动到末尾
    selectChangeEnd(el) {
      const range = window.getSelection() // 创建range
      range.selectAllChildren(el) // range 选择obj下所有子内容
      range.collapseToEnd() // 光标移至最后
    },
    // 更新当前条数据
    updateRow() {
      const { event, rowIndex, column } = this.currentInfo
      const currentInfoCopy = { ...this.currentInfo }
      const multipleRowCopy = [...this.multipleRow]
      this.isEdit = false
      this.cancelEditor(rowIndex)
      if (this.isSplit) return (this.isSplit = false)
      const newVal = event.target.textContent.trim()
      const oldVal = this[`${column.prop}List`][rowIndex]
      if (newVal === oldVal) return
      this[`${column.prop}List`].splice(rowIndex, 1, newVal)
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      // 更新缓存
      this.updateHistory({
        type: 'editor', // 操作类型
        befoerOperating: oldVal, // 操作前的数据
        afterOperating: newVal, // 操作后的数据
        currentIndex: rowIndex, // 操作的当前索引
        operationSource: column.prop, // 操作的数据类型
        befoerMultipleRow: multipleRowCopy,
        befoerCurrentInfo: currentInfoCopy,
        afterMultipleRow: this.multipleRow,
        afterCurrentInfo: this.currentInfo
      })
    }
  }
}
