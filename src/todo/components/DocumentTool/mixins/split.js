export default {
  data() {
    this.selectPosition = 0
    return {}
  },
  methods: {
    handleSplit() {
      console.log('split')
      // const val = this.editorDom.textContent.trim()
      // const currentVal = val.slice(0, this.selectPosition)
      // const insertVal = val.slice(this.selectPosition)
      // this.updateHistory({
      //   handle: 'split',
      //   type,
      //   id: row.id,
      //   oldVal: val,
      //   newVal: [currentVal, insertVal]
      // })
    },
    handleSelectionchange() {
      const range = window.getSelection().getRangeAt(0)
      const clone = range.cloneRange()
      clone.selectNodeContents(this.editorDom)
      clone.setEnd(range.endContainer, range.endOffset)
      this.selectPosition = clone.toString().trim().length
    }
  }
}
