<template>
  <div :style="lineStyle()" @mousedown="mousedown" class="line" />
</template>

<script>
export default {
  name: 'FLine',
  data() {
    return {
      left: 0
    }
  },
  mounted() {
    this.$nextTick(this.initLineStyle)
    this.initEvent()
  },
  destroyed() {
    this.removeEvent()
  },
  methods: {
    initLineStyle() {
      const { right } = this.$parent.$refs.td[0].getBoundingClientRect()
      const {
        top,
        left: tableLeft,
        right: tableRight
      } = this.$parent.$refs.table.getBoundingClientRect()
      const { height } = this.$parent.$el.getBoundingClientRect()
      this.min = tableLeft + 50 + 100
      this.max = tableRight - 100
      this.left = right - 1
      this.height = height - 14 * 2
      this.top = top
    },
    lineStyle() {
      return {
        left: `${this.left}px`,
        top: `${this.top}px`,
        height: `${this.height}px`
      }
    },
    initEvent() {
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    removeEvent() {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
    mousedown({ target }) {
      this.isDown = true
      this.downLeft = target.getBoundingClientRect().left
    },
    mousemove({ clientX }) {
      if (!this.isDown) return
      let left = this.downLeft + clientX - this.downLeft
      left = Math.min(this.max, Math.max(this.min, left))
      this.left = left
      this.$emit('update:td-width', `${left - this.min + 100}px`)
    },
    mouseup() {
      this.isDown = false
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  position: absolute;
  width: 1px;
  background-color: #ebeef5;
  cursor: col-resize;
}
</style>
