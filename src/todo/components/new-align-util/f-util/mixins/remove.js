// 删除mixin
export default {
  methods: {
    remove() {
      const { indexList, column } = this.currentInfo
      const currentInfoCopy = { ...this.currentInfo }
      const multipleRowCopy = [...this.multipleRow]
      const index = indexList[0]
      const length = indexList.length
      let befoerOperating
      if (column.prop === 'no') {
        const source = this.sourceList.splice(index, length)
        const target = this.targetList.splice(index, length)
        befoerOperating = [source, target]
      } else {
        const result = this[`${column.prop}List`].splice(index, length)
        befoerOperating = result
      }
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      // 重置选中行相关信息
      this.currentInfo = null
      this.multipleRow = []
      this.changeActive(column)
      // 更新缓存
      this.updateHistory({
        type: 'remove', // 操作类型
        befoerOperating, // 操作前的数据
        currentIndex: indexList, // 操作的当前索引
        length: indexList.length, // 条数
        operationSource: column.prop, // 操作的数据类型
        befoerMultipleRow: multipleRowCopy,
        befoerCurrentInfo: currentInfoCopy,
        afterMultipleRow: this.multipleRow,
        afterCurrentInfo: this.currentInfo
      })
    }
  }
}
