// 合并mixin
export default {
  methods: {
    merge() {
      const { indexList, column } = this.currentInfo
      const currentInfoCopy = { ...this.currentInfo }
      const multipleRowCopy = [...this.multipleRow]
      if (indexList.length < 2) return
      const index = indexList[0]
      let befoerOperating = []
      let afterOperating
      if (column.prop === 'no') {
        let sourceContent = ''
        let targetContent = ''
        befoerOperating = [[], []]
        indexList.forEach(index => {
          sourceContent += this.sourceList[index] || ''
          targetContent += this.targetList[index] || ''
          befoerOperating[0].push(this.sourceList[index])
          befoerOperating[1].push(this.targetList[index])
        })
        afterOperating = [sourceContent, targetContent]
        this.sourceList.splice(indexList[0], indexList.length, sourceContent)
        this.targetList.splice(indexList[0], indexList.length, targetContent)
      } else {
        let content = ''
        indexList.forEach(index => {
          content += this[`${column.prop}List`][index]
          befoerOperating.push(this[`${column.prop}List`][index])
        })
        afterOperating = content
        this[`${column.prop}List`].splice(
          indexList[0],
          indexList.length,
          content
        )
      }
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      // 修改选中行信息
      this.multipleRow = [index]
      this.currentInfo.indexList = [index]
      this.changeActive(column)
      // 更新缓存
      this.updateHistory({
        type: 'merge', // 操作类型
        befoerOperating, // 操作前的数据
        afterOperating, // 操作后的数据
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
