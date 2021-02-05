export default {
  data() {
    // id到index的映射表
    this.map = {}
    return {
      tableData: []
    }
  },
  watch: {
    source() {
      this.tableData = this.transformData()
    },
    target() {
      this.tableData = this.transformData()
    }
  },
  methods: {
    transformData() {
      const maxLength = Math.max(this.source.length, this.target.length)
      const fn = (_, index) => {
        this.map[index] = index
        return {
          id: index,
          sourceContent: this.source[index],
          targetContent: this.target[index],
          sourceSelect: false,
          targetSelect: false,
          sourceEnter: false,
          targetEnter: false,
          sourceOverlap: false,
          targetOverlap: false,
          editor: false
        }
      }
      return Array.from({ length: maxLength }, fn)
    }
  }
}
