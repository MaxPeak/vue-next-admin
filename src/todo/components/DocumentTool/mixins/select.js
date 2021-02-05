export default {
  data() {
    this.oldSelect = []
    this.select = []
    this.elements = []
    return {}
  },
  mounted() {
    document.body.addEventListener('mousedown', this.clearActive)
  },
  destroyed() {
    document.body.removeEventListener('mousedown', this.clearActive)
  },
  methods: {
    clearActive({ target }) {
      if (!this.$refs.tbody) return
      const result = this.$refs.tbody.contains(target)
      if (result) return
      this.oldSelect.forEach(item => {
        this.tableData[item][`sourceSelect`] = false
        this.tableData[item][`targetSelect`] = false
      })
      this.oldSelect = []
      this.select = []
      this.elements = []
    },
    rowClick({ row, type, event }) {
      this.setSelect(event, this.map[row.id])
      this.setActive(type)
      this.setElements(type)
    },
    setActive(type) {
      this.oldSelect.forEach(item => {
        this.tableData[item][`sourceSelect`] = false
        this.tableData[item][`targetSelect`] = false
      })
      this.select.forEach(item => {
        if (type === 'row') {
          this.tableData[item][`sourceSelect`] = true
          this.tableData[item][`targetSelect`] = true
        } else {
          this.tableData[item][`${type}Select`] = true
        }
      })
      this.oldSelect = this.select
    },
    setSelect(event, index) {
      if (event.shiftKey) {
        this.select.push(index)
        const temp = [this.select[0], this.select[this.select.length - 1]]
        temp.sort((a, b) => a - b)
        const result = []
        for (let i = temp[0]; i <= temp[1]; i++) {
          result.push(i)
        }
        this.select = result
      } else if (event.ctrlKey || event.metaKey) {
        this.select.push(index)
      } else {
        this.select = [index]
      }
    },
    setElements(type) {
      this.elements = this.select.reduce((arr, idx) => {
        const dom =
          type === 'row'
            ? this.$refs.items[idx].$el
            : this.$refs.items[idx].$refs[type]
        arr.push(dom)
        return arr
      }, [])
    }
  }
}
