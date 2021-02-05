<template>
  <div :class="['v-scroll-bar', bar.key]" @mousedown="clickTrackHandler">
    <div
      class="v-scroll-thumb"
      ref="thumb"
      :style="{ ...renderThumbStyle({ size, move, bar }) }"
      @mousedown="clickThumbHandler"
    ></div>
  </div>
</template>

<script>
const map = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}
export default {
  name: 'VScrollBar',
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  computed: {
    wrap() {
      return this.$parent.wrap
    },
    bar() {
      return map[this.vertical ? 'vertical' : 'horizontal']
    }
  },
  destroyed() {
    document.removeEventListener('mouseup', this.mouseUpDocumentHandler)
  },
  methods: {
    renderThumbStyle({ move, size, bar }) {
      const style = {}
      const translate = `translate${bar.axis}(${move}%)`
      style[bar.size] = size
      style.transform = translate
      style.msTransform = translate
      style.webkitTransform = translate
      return style
    },
    clickTrackHandler(e) {
      const offset = Math.abs(
        e.target.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]
      )
      const thumbHalf = this.$refs.thumb[this.bar.offset] / 2
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / this.$el[this.bar.offset]

      this.wrap[this.bar.scroll] =
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
    },
    clickThumbHandler(e) {
      this.startDrag(e)
      this[this.bar.axis] =
        e.currentTarget[this.bar.offset] -
        (e[this.bar.client] -
          e.currentTarget.getBoundingClientRect()[this.bar.direction])
    },
    startDrag(e) {
      e.stopImmediatePropagation()
      this.cursorDown = true
      document.addEventListener('mousemove', this.mouseMoveDocumentHandler)
      document.addEventListener('mouseup', this.mouseUpDocumentHandler)
      document.onselectstart = () => false
    },
    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return
      const prevPage = this[this.bar.axis]

      if (!prevPage) return

      const offset =
        (this.$el.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]) *
        -1
      const thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / this.$el[this.bar.offset]

      this.wrap[this.bar.scroll] =
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
    },

    mouseUpDocumentHandler() {
      this.cursorDown = false
      this[this.bar.axis] = 0
      document.removeEventListener('mousemove', this.mouseMoveDocumentHandler)
      document.onselectstart = null
    }
  }
}
</script>

<style lang="scss" scoped>
.v-scroll-bar {
  position: absolute;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.12s ease-out;
  & > div {
    border-radius: inherit;
    background-color: hsla(220, 4%, 58%, 0.3);
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      background-color: hsla(220, 4%, 58%, 0.5);
    }
  }
  &.vertical {
    top: 0;
    right: 0;
    width: 6px;
    height: 100%;
    .v-scroll-thumb {
      width: 100%;
    }
  }
  &.horizontal {
    left: 0;
    bottom: 0;
    height: 6px;
    width: 100%;
    .v-scroll-thumb {
      height: 100%;
    }
  }
}
</style>
