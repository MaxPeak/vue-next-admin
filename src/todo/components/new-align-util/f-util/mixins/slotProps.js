// slots相关mixin
export default {
  data() {
    return {
      headerSlotProps: {},
      footerSlotProps: {}
    }
  },
  mounted() {
    this.setSlotProps()
  },
  methods: {
    setSlotProps() {
      this.headerSlotProps = {
        merge: () => {
          this.handleEvent('merge')
        },
        remove: () => {
          this.handleEvent('remove')
        },
        split: () => {
          this.handleEvent('split')
        },
        insert: () => {
          this.handleEvent('insert')
        },
        move: direction => {
          this.handleEvent('move', direction)
        },
        swop: () => {
          this.handleEvent('swop')
        },
        editor: () => {
          this.handleEvent('editor')
        },
        toggleDialog: type => {
          this.toggleDialog(type)
        },
        goahead: () => {
          this.goahead()
        },
        goback: () => {
          this.goback()
        },
        reset: () => {
          this.resetHistory()
        }
      }
      this.footerSlotProps = {
        search: index => {
          index = index - 1
          if (index < 0) {
            this.multipleRow = []
            this.changeActive()
            this.currentInfo = null
            return
          }
          this.multipleRow = [index]
          this.changeActive()
          this.rowScrollInView(index)
          this.currentInfo = {
            indexList: this.oldMultipleRow,
            column: { prop: 'no' },
            row: this.tableData[index],
            rowIndex: index
          }
        },
        sourceLength: () => this.sourceList.length,
        targetLength: () => this.targetList.length
      }
    }
  }
}
