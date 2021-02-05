<template>
  <div class="line" :style="style" @mousedown="handleMousedown" />
</template>

<script>
export default {
  name: 'VLine',
  props: ['value'],
  computed: {
    style() {
      return {
        left: `${this.left - 1}px`,
        height: this.height
      }
    }
  },
  data() {
    this.isMove = false
    return {
      left: 0,
      height: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calcPosition()
      this.initEvent()
    })
  },
  destroyed() {
    this.removeEvent()
  },
  methods: {
    calcPosition() {
      const {
        items: [item],
        header,
        body,
        footer
      } = this.$parent.$refs
      const first = item.$refs.target
      this.left = first.offsetLeft
      this.$emit('input', this.left - 50)
      this.height = this.$parent.fixed
        ? `calc(100% - ${footer.$el.offsetHeight}px)`
        : `${header.$el.offsetHeight + body.$el.offsetHeight}px`
      this.tableLeft = this.$parent.$el.offsetLeft
      this.tableWidth = this.$parent.$el.offsetWidth
      this.offset = 100
    },
    handleMousedown() {
      this.isMove = true
    },
    handleMousemove({ clientX }) {
      if (!this.isMove) return
      let left = clientX - this.tableLeft
      left = Math.min(
        this.tableWidth - this.offset,
        Math.max(50 + this.offset, left)
      )
      this.left = left
      this.$emit('input', left - 50)
    },
    handleMouseup() {
      this.isMove = false
    },
    initEvent() {
      window.addEventListener('resize', this.calcPosition)
      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
    },
    removeEvent() {
      window.removeEventListener('resize', this.calcPosition)
      document.removeEventListener('mousemove', this.handleMousemove)
      document.removeEventListener('mouseup', this.handleMouseup)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';

.line {
  position: absolute;
  top: 0;
  width: 1px;
  background-color: $table-border-color;
  cursor: col-resize;
}
</style>
