// 表格样式相关的mixin
export default {
  data() {
    return {
      // 表格最大高度
      maxHeight: 0,
      // 上一次的className
      oldActiveName: '',
      // 选中的索引集合
      multipleRow: [],
      // 上一次选中的索引集合
      oldMultipleRow: [],
      // 当前选中行的相关信息
      currentInfo: null
    }
  },
  methods: {
    // 列class
    cellClassName({ row, column }) {
      const baseClassName = 'clear-padding'
      const disabledClassName = this.isDisabled({ row, column })
      const activeClassName = this.isActive({ row, column })
      return `${baseClassName} ${disabledClassName} ${activeClassName}`
    },
    // 行class
    rowClassName({ row }) {
      return row.noActive ? 'active' : ''
    },
    // 列点击时的逻辑
    cellClick(event, { row, rowIndex, column }) {
      if (row[`${column.prop}Disabled`]) return
      if (event.shiftKey) {
        this.multipleRow.push(rowIndex)
      } else {
        this.multipleRow = [rowIndex]
      }
      this.changeActive(column)
      // 更新储存选中单元格的信息
      this.currentInfo = {
        indexList: this.oldMultipleRow,
        column,
        row,
        rowIndex,
        event
      }
    },
    // 改变选中的激活态
    changeActive(column = { prop: 'no' }) {
      const activeName = `${column.prop}Active`
      let newMultipleRow = []
      const multipleRowLength = this.multipleRow.length
      if (multipleRowLength >= 2) {
        this.multipleRow = [
          this.multipleRow[0],
          this.multipleRow[multipleRowLength - 1]
        ]
        newMultipleRow = this.fillMultipleRow(this.multipleRow)
      } else {
        newMultipleRow = this.multipleRow
      }
      this.oldMultipleRow.forEach(item => {
        this.tableData[item] &&
          this.$set(this.tableData[item], this.oldActiveName, false)
        this.tableData[item] && this.$set(this.tableData[item], 'active', false)
      })
      newMultipleRow.forEach(item => {
        this.tableData[item] &&
          this.$set(this.tableData[item], activeName, true)
        this.tableData[item] && this.$set(this.tableData[item], 'active', true)
      })
      this.oldMultipleRow = newMultipleRow
      this.oldActiveName = activeName
    },
    // 是否显示禁用态
    isDisabled({ column, row }) {
      return row[`${column.prop}Disabled`] &&
        row[`${column.prop}Content`] === undefined
        ? 'disabled'
        : ''
    },
    // 是否显示激活态
    isActive({ column, row }) {
      return row[`${column.prop}Active`] ? 'active' : ''
    },
    // 多选补全
    fillMultipleRow(multipleRow) {
      const result = []
      const clone = [...multipleRow].sort((a, b) => a - b)
      for (let i = clone[0]; i <= clone[1]; i++) {
        result.push(i)
      }
      return result
    }
  }
}
