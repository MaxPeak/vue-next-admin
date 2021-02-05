export default {
  data() {
    this.editorDom = null
    return {}
  },
  methods: {
    handleEditor({ row, event }) {
      this.tableData[this.map[row.id]].editor = true
      this.editorDom = event.target
      this.$nextTick(() => {
        const range = window.getSelection()
        range.selectAllChildren(this.editorDom)
        range.collapseToEnd()
        document.addEventListener('selectionchange', this.handleSelectionchange)
      })
    },
    handleCancelEditor({ row, type, event }) {
      this.tableData[this.map[row.id]].editor = false
      this.editorDom = null
      document.removeEventListener(
        'selectionchange',
        this.handleSelectionchange
      )
      const newVal = event.target.textContent.trim()
      const oldVal = this.tableData[this.map[row.id]][`${type}Content`]
      if (newVal === oldVal) return
      this.updateHistory({
        handle: 'editor',
        type,
        id: row.id,
        oldVal,
        newVal
      })
    }
  }
}
