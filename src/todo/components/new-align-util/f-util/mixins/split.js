// 拆分mixin
export default {
  data() {
    return {
      // 是否是拆分模式 拆分模式不执行updateRow
      isSplit: false
    }
  },
  methods: {
    split() {
      const { event, rowIndex, column } = this.currentInfo
      const currentInfoCopy = { ...this.currentInfo }
      const multipleRowCopy = [...this.multipleRow]
      this.isSplit = true
      const content = event.target.textContent
      const currentVal = content.trim().slice(0, this.selectPosition)
      const insertVal = content.trim().slice(this.selectPosition)
      this[`${column.prop}List`].splice(rowIndex, 1, currentVal, insertVal)
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      const newIndexList = [rowIndex, rowIndex + 1]
      this.multipleRow = newIndexList
      this.currentInfo.indexList = newIndexList
      this.changeActive(column)
      this.cancelEditor(rowIndex)
      // 更新缓存
      this.updateHistory({
        type: 'split', // 操作类型
        befoerOperating: content, // 操作前的数据
        afterOperating: [currentVal, insertVal], // 操作后的数据
        currentIndex: rowIndex, // 操作的当前索引
        length: 2, // 条数
        operationSource: column.prop, // 操作的数据类型
        befoerMultipleRow: multipleRowCopy,
        befoerCurrentInfo: currentInfoCopy,
        afterMultipleRow: this.multipleRow,
        afterCurrentInfo: this.currentInfo
      })
    }
  }
}
