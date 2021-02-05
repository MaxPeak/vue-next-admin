export default {
  methods: {
    validateSelect() {
      const result = !!this.select.length
      if (!result) {
        this.$emit('error', '必须选中行')
      }
      return result
    },
    validateTableData() {
      const result = !!this.tableData.length
      if (!result) {
        this.$emit('error', '请上传文档')
      }
      return result
    }
  }
}
