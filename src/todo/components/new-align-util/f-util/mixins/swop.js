// 调换mixin
export default {
  methods: {
    swop() {
      const { column, indexList } = this.currentInfo
      const currentInfoCopy = { ...this.currentInfo }
      const multipleRowCopy = [...this.multipleRow]
      if (column.prop !== 'no') return
      indexList.forEach(index => {
        const row = this.tableData[index]
        // 调换的另一边如果是禁用，此时不应该调换
        if (row.sourceDisabled || row.targetDisabled) return
        ;[this.sourceList[index], this.targetList[index]] = [
          this.targetList[index],
          this.sourceList[index]
        ]
      })
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      this.multipleRow = indexList
      this.currentInfo.indexList = indexList
      this.changeActive(column)
      // 更新缓存
      this.updateHistory({
        type: 'swop', // 操作类型
        currentIndex: indexList, // 操作的当前索引
        befoerMultipleRow: multipleRowCopy,
        befoerCurrentInfo: currentInfoCopy,
        afterMultipleRow: this.multipleRow,
        afterCurrentInfo: this.currentInfo
      })
    }
  }
}
