export default {
  data() {
    this.isMove = false
    this.shadowEle = null
    this.mousedownInfo = null
    this.type = null
    this.offset = 5
    this.oldIndex = 0
    return {}
  },
  mounted() {
    document.body.addEventListener('mousemove', this.handleDragmove)
    document.body.addEventListener('mouseup', this.handleDragup)
  },
  destroyed() {
    document.removeEventListener('mousemove', this.handleDragmove)
    document.removeEventListener('mouseup', this.handleDragup)
  },
  methods: {
    handleDragdown({ row, type, event }) {
      const { clientX, clientY } = event
      if (!this.drag) return
      let contentType = null
      if (type === 'row') {
        contentType = `sourceContent`
        if (!(row.sourceSelect && row.targetSelect)) return
      } else {
        contentType = `${type}Content`
        if (!row[`${type}Select`]) return
      }
      this.type = type
      this.isMove = true
      this.shadowEle = document.createElement('div')
      this.shadowEle.className = 'shadow-ele'
      this.elements.forEach((element, index) => {
        const { width, height } = element.getBoundingClientRect()
        const item = document.createElement('div')
        item.style.cssText = `width:${width}px;height:${height}px;`
        item.textContent = this.tableData[this.select[index]][contentType]
        this.shadowEle.appendChild(item)
      })
      const [first] = this.elements
      const { top, left } = first.getBoundingClientRect()
      this.shadowEle.style.cssText = `left:${left}px;top:${top}px;`
      this.$refs.tbody.appendChild(this.shadowEle)
      const { width, height } = this.shadowEle.getBoundingClientRect()
      this.mousedownInfo = {
        downX: clientX,
        downY: clientY,
        downLeft: left,
        downTop: top,
        downHeight: height,
        downWidth: width
      }
    },
    handleDragmove({ clientX, clientY }) {
      if (!this.isMove) return
      const {
        downX,
        downY,
        downLeft,
        downTop,
        downHeight,
        downWidth
      } = this.mousedownInfo
      const [startIndex] = this.select
      const shadowLeft = downLeft + clientX - downX
      const shadowTop = downTop + clientY - downY
      this.shadowEle.style.cssText = `left:${shadowLeft}px;top:${shadowTop}px;`
      const sourceXCenter = shadowLeft + downWidth / 2
      const sourceYCenter = shadowTop + downHeight / 2
      this.$refs.items.forEach((item, index) => {
        const element = this.type === 'row' ? item.$el : item.$refs[this.type]
        const { top, left, width, height } = element.getBoundingClientRect()
        const isEnter =
          startIndex !== index &&
          shadowLeft < left + width - this.offset &&
          shadowLeft + downWidth > left + this.offset &&
          shadowTop < top + height - this.offset &&
          shadowTop + downHeight > top + this.offset
        const targetXCenter = left + width / 2
        const targetYCenter = top + height / 2
        const isOverlap =
          this.select.length === 1 &&
          startIndex !== index &&
          sourceXCenter >= targetXCenter - this.offset &&
          sourceXCenter <= targetXCenter + this.offset &&
          sourceYCenter >= targetYCenter - this.offset &&
          sourceYCenter <= targetYCenter + this.offset
        if (!(isEnter || isOverlap)) return
        this.tableData[this.oldIndex][`sourceEnter`] = false
        this.tableData[this.oldIndex][`targetEnter`] = false
        this.tableData[this.oldIndex][`sourceOverlap`] = false
        this.tableData[this.oldIndex][`targetOverlap`] = false
        if (isEnter) {
          if (this.type === 'tr') {
            this.tableData[index][`sourceEnter`] = true
            this.tableData[index][`targetEnter`] = true
          } else {
            this.tableData[index][`${this.type}Enter`] = true
          }
        }
        if (isOverlap) {
          if (this.type === 'tr') {
            this.tableData[index][`sourceOverlap`] = true
            this.tableData[index][`targetOverlap`] = true
          } else {
            this.tableData[index][`${this.type}Overlap`] = true
          }
        }
        this.oldIndex = index
      })
    },
    handleDragup() {
      if (!this.isMove) return
      this.$refs.tbody.removeChild(this.shadowEle)
      this.tableData[this.oldIndex][`sourceEnter`] = false
      this.tableData[this.oldIndex][`targetEnter`] = false
      this.tableData[this.oldIndex][`sourceOverlap`] = false
      this.tableData[this.oldIndex][`targetOverlap`] = false
      this.isMove = false
      this.shadowEle = null
      this.mousedownInfo = null
      this.type = null
      this.oldIndex = 0
    }
  }
}
