<template>
  <div class="demo">
    <div class="header" />
    <div class="body" ref="body">
      <table cellspacing="0" cellpadding="0" border="0" :style="offset">
        <tbody>
          <item
            v-for="(item, index) in visibleList"
            :key="item.id"
            :item="item"
            :index="startIndex + index"
          />
        </tbody>
      </table>
    </div>
    <div class="footer" />
  </div>
</template>

<script>
import Item from './item'
export default {
  components: {
    Item
  },
  data() {
    this.itemsPosition = []
    this.lastScrollTop = 0
    this.top = 0
    this.numberOfContainer = 0
    return {
      list: Array.from({ length: 10000 }).map((_, index) => ({
        id: index + 1,
        s: `source ${index + 1}`,
        t: `target ${index + 1}`
      })),
      beforeBufferSize: 3,
      afterBufferSize: 3,
      itemMinHeight: 30,

      visibleList: [],
      startIndex: 0,
      listOffset: {
        startOffset: 0,
        endOffset: 0
      }
    }
  },
  computed: {
    offset() {
      return {
        paddingTop: `${this.listOffset.startOffset}px`,
        paddingBottom: `${this.listOffset.endOffset}px`
      }
    }
  },
  mounted() {
    this.init()
    this.updateVisibleList()
    this.$refs.body.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    init() {
      const { height, top } = this.$refs.body.getBoundingClientRect()
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
          const nodeOffsetY = nodeRect.top + this.$refs.body.scrollTop
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
      if (!node) return
      this.addObserver(node, index)
      const cachedPosition = this.itemsPosition.find(p => p.index === index)
      if (cachedPosition) {
        if (isDomtreeChanged) {
          this.cacheChangedPosition(node, index)
        }
        return
      }
      const { top, height } = node.getBoundingClientRect()
      const nodeOffsetY = top + this.$refs.body.scrollTop
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
.demo {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  .header,
  .footer {
    height: 30px;
    width: 100%;
    background-color: skyblue;
  }
  .body {
    flex: 1;
    overflow-y: auto;
    table {
      table-layout: fixed;
      width: 100%;
      user-select: none;
    }
  }
}
</style>
