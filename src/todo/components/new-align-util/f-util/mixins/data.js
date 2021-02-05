export default {
  data() {
    return {
      tableData: [],
      sourceList: [],
      targetList: []
    }
  },
  watch: {
    source: {
      handler(list) {
        this.sourceList = list.map(item => item)
        const params = {
          sourceList: this.sourceList,
          targetList: this.targetList
        }
        this.tableData = this.transformData(params)
        this.initHistory()
      }
    },
    target: {
      handler(list) {
        this.targetList = list.map(item => item)
        const params = {
          sourceList: this.sourceList,
          targetList: this.targetList
        }
        this.tableData = this.transformData(params)
        this.initHistory()
      }
    }
  },
  methods: {
    // 转换合并填充数据
    transformData({ sourceList = [], targetList = [] }) {
      const srcLength = sourceList.length
      const tarLength = targetList.length
      const maxLength = Math.max(srcLength, tarLength)
      const fn = (item, index) => ({
        sourceContent: sourceList[index],
        sourceCopy: sourceList[index],
        targetContent: targetList[index],
        targetCopy: targetList[index],
        sourceDisabled: sourceList[index] === undefined,
        targetDisabled: targetList[index] === undefined
      })
      return Array.from({ length: maxLength }, fn)
    }
  }
}
