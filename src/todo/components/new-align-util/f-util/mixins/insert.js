// 插入mixin
export default {
  methods: {
    insert() {
      const { indexList, column } = this.currentInfo
      const currentInfoCopy = { ...this.currentInfo }
      const multipleRowCopy = [...this.multipleRow]
      const index = indexList[0]
      if (column.prop === 'no') {
        this.sourceList.splice(index, 0, '')
        this.targetList.splice(index, 0, '')
      } else {
        this[`${column.prop}List`].splice(index, 0, '')
      }
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      // 修改选中行信息
      const newIndexList = indexList.map(index => index + 1)
      this.multipleRow = newIndexList
      this.currentInfo.indexList = newIndexList
      this.changeActive(column)
      // 更新缓存
      this.updateHistory({
        type: 'insert', // 操作类型
        currentIndex: index, // 操作的当前索引
        afterOperating: '',
        operationSource: column.prop, // 操作的数据类型
        befoerMultipleRow: multipleRowCopy,
        befoerCurrentInfo: currentInfoCopy,
        afterMultipleRow: this.multipleRow,
        afterCurrentInfo: this.currentInfo
      })
    }
  }
}
