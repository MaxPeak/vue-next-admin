// 移动mixin
export default {
  methods: {
    move(direction) {
      const isUp = direction === 'up'
      const { indexList, column } = this.currentInfo
      const currentInfoCopy = { ...this.currentInfo }
      const multipleRowCopy = [...this.multipleRow]
      const newIndexList = isUp
        ? indexList.map(index => index - 1)
        : indexList.map(index => index + 1)
      const min = 0
      const first = newIndexList[0]
      const last = newIndexList[newIndexList.length - 1]
      if (isUp && first < min) return console.log('已经到第一条数据了')
      const deleteIndex = isUp
        ? indexList[0] - 1
        : indexList[indexList.length - 1] + 1
      const insertIndex = isUp ? indexList[indexList.length - 1] : indexList[0]
      if (column.prop === 'no') {
        const max = Math.min(this.sourceList.length, this.targetList.length) - 1
        if (last > max) return console.log('已经到最后一条数据了')
        const [sourceVal] = this.sourceList.splice(deleteIndex, 1)
        const [targetVal] = this.targetList.splice(deleteIndex, 1)
        this.sourceList.splice(insertIndex, 0, sourceVal)
        this.targetList.splice(insertIndex, 0, targetVal)
      } else {
        const max = this[`${column.prop}List`].length - 1
        if (last > max) return console.log('已经到最后一条数据了')
        const [val] = this[`${column.prop}List`].splice(deleteIndex, 1)
        this[`${column.prop}List`].splice(insertIndex, 0, val)
      }
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      this.multipleRow = newIndexList
      this.currentInfo.indexList = newIndexList
      this.changeActive(column)
      // 更新缓存
      this.updateHistory({
        type: 'move', // 操作类型
        currentIndex: [deleteIndex, insertIndex], // 操作的当前索引
        operationSource: column.prop, // 操作的数据类型
        befoerMultipleRow: multipleRowCopy,
        befoerCurrentInfo: currentInfoCopy,
        afterMultipleRow: this.multipleRow,
        afterCurrentInfo: this.currentInfo
      })
    }
  }
}
