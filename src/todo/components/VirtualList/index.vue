<template>
  <div class="v-virtual-list" :style="containerHeight">
    <div class="v-virtual-list__content" :style="offset">
      <v-virtual-list-item
        v-for="(item, index) in visibleList"
        :key="item.id"
        :index="startIndex + index"
      >
        <slot name="item" :item="item"></slot>
      </v-virtual-list-item>
    </div>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'VVirtualList',
  components: {
    [Item.name]: Item
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    beforeBufferSize: {
      type: Number,
      default: 3
    },
    afterBufferSize: {
      type: Number,
      default: 3
    },
    itemMinHeight: {
      type: Number,
      default: 10
    },
    height: {
      type: String,
      default: '100%'
    },
    offsetBottom: {
      type: Number,
      default: 300
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleList: [],
      startIndex: 0,
      listOffset: {
        startOffset: 0,
        endOffset: 0
      }
    }
  },
  watch: {
    beforeBufferSize() {
      this.updateVisibleList()
    },
    afterBufferSize() {
      this.updateVisibleList()
    },
    minHeight() {
      this.updateVisibleList()
    }
  },
  computed: {
    offset() {
      return {
        paddingTop: `${this.listOffset.startOffset}px`,
        paddingBottom: `${this.listOffset.endOffset}px`
      }
    },
    containerHeight() {
      return { height: this.height }
    }
  },
  mounted() {
    this.init()
    this.updateVisibleList()
    this.$el.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 不需要被双向绑定的数据
    init() {
      this.itemsPosition = []
      this.lastScrollTop = 0
      const { height, top } = this.$el.getBoundingClientRect()
      this.top = top
      const screenNumber = Math.ceil(height / this.itemMinHeight)
      this.numberOfContainer = Math.min(screenNumber, this.list.length)
    },
    updateVisibleList() {
      let endIndex =
        this.startIndex + this.numberOfContainer + this.afterBufferSize
      if (this.startIndex >= this.beforeBufferSize) {
        endIndex = endIndex + this.beforeBufferSize
      }
      if (endIndex >= this.list.length) {
        endIndex = this.list.length
      }

      let startOffset = 0
      let endOffset = (this.list.length - endIndex) * this.itemMinHeight

      const position = this.itemsPosition.find(p => p.index === this.startIndex)
      if (position) {
        startOffset = position.top - this.itemsPosition[0].top
      }
      this.listOffset = {
        startOffset: Math.max(0, startOffset),
        endOffset: Math.max(0, endOffset)
      }

      this.visibleList = this.list.slice(this.startIndex, endIndex)
    },
    handleScroll({ target }) {
      const { scrollTop } = target
      // 向下滚动
      if (scrollTop > this.lastScrollTop) {
        this.updateStartIndex(scrollTop)
        this.updateVisibleList()
        this.lastScrollTop = scrollTop
        if (this.listOffset.endOffset < this.offsetBottom && !this.finished) {
          // 懒加载
          this.$emit('load')
        }
      }

      // 向上滚动
      if (scrollTop < this.lastScrollTop) {
        this.updateStartIndex(scrollTop)
        this.updateVisibleList()
        this.lastScrollTop = scrollTop
      }
    },
    updateStartIndex(scrollTop) {
      const targetItemPosition = this.itemsPosition.find(
        ({ bottom }) => bottom > scrollTop + this.top
      )
      if (!targetItemPosition) return
      this.startIndex =
        targetItemPosition.index - this.beforeBufferSize >= 0
          ? targetItemPosition.index - this.beforeBufferSize
          : 0
    },
    addObserver(node, index) {
      if (node.mutationObserver) return
      let recordHeight = node.getBoundingClientRect().height
      node.mutationObserver = new MutationObserver(() => {
        const { height } = node.getBoundingClientRect()
        if (recordHeight === height) return
        recordHeight = height
        this.handleCalcPosition(node, index, true)
      })
      node.mutationObserver.observe(node, {
        childList: true, // 子节点的变动（新增、删除或者更改）
        attributes: true, // 属性的变动
        characterData: true, // 节点内容或节点文本的变动
        subtree: true // 是否将观察器应用于该节点的所有后代节点
      })
    },
    cacheChangedPosition(node, index) {
      let changedHeight = 0
      this.itemsPosition = this.itemsPosition.map(position => {
        const { top: originalTop, bottom: originalBottom } = position
        if (position.index === index) {
          const nodeRect = node.getBoundingClientRect()
          changedHeight = nodeRect.height - (position.bottom - position.top)
          const nodeOffsetY = nodeRect.top + this.$el.scrollTop
          const newPosition = {
            top: nodeOffsetY,
            bottom: nodeOffsetY + nodeRect.height,
            index: position.index
          }
          return newPosition
        } else if (position.index > index) {
          const newPosition = {
            top: originalTop + changedHeight,
            bottom: originalBottom + changedHeight,
            index: position.index
          }
          return newPosition
        }
        return position
      })
    },
    handleCalculatePosition(node, index, isDomtreeChanged) {
      if (!node || !MutationObserver) return
      this.addObserver(node, index)
      const cachedPosition = this.itemsPosition.find(p => p.index === index)
      if (cachedPosition) {
        if (isDomtreeChanged) {
          this.cacheChangedPosition(node, index)
        }
        return
      }
      const { top, height } = node.getBoundingClientRect()
      const nodeOffsetY = top + this.$el.scrollTop
      const position = {
        top: nodeOffsetY,
        bottom: nodeOffsetY + height,
        index
      }
      this.itemsPosition.push(position)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-virtual-list {
  width: 100%;
  overflow-y: auto;
}
</style>
