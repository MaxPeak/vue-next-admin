<template>
  <ul ref="contextmenu" v-show="isShow" class="v-contextmenu">
    <li
      @click="handleClick(menu)"
      v-for="(menu, index) in menus"
      :key="index"
      class="v-contextmenu_item"
    >
      <div class="before">
        {{ menu.label }}
      </div>
      <div v-if="menu.after" class="after">
        {{ menu.after }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VContextmenu',
  props: {
    position: {
      type: Object,
      default() {
        return {}
      }
    },
    menus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  watch: {
    isShow: {
      handler(val) {
        if (!val) return
        this.$nextTick(this.boundaryDetection)
      },
      immediate: true
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.handleMousedown, false)
  },
  destroyed() {
    document.removeEventListener('mousedown', this.handleMousedown, false)
  },
  methods: {
    handleClick(item) {
      item.handle && item.handle()
      this.handleClose()
    },
    handleMousedown(event) {
      const isClose = this.$el.contains(event.target)
      if (isClose) return
      this.handleClose()
    },
    handleClose() {
      this.isShow = false
    },
    // 边界检测
    boundaryDetection() {
      const menu = this.$refs.contextmenu
      const { x, y } = this.position
      const {
        width: menuWidth,
        height: menuHeight
      } = menu.getBoundingClientRect()
      const doc = document.documentElement
        ? document.documentElement
        : document.body
      const { width: docWidth, height: docHeight } = doc.getBoundingClientRect()
      const isX = docWidth - x > menuWidth
      const isY = docHeight - y > menuHeight
      const OFFSET = 2
      const left = isX ? x + OFFSET : x - menuWidth - OFFSET
      const top = isY
        ? y + OFFSET
        : y - menuHeight + (docHeight - y) - 10 - OFFSET
      menu.style.cssText = `top:${top}px;left:${left}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-contextmenu {
  position: fixed;
  box-sizing: border-box;
  max-height: 300px;
  overflow-y: auto;
  padding: 5px 0;
  background-color: #fff;
  z-index: 2020;
  color: #373737;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: 30px;
    padding: 0 10px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #eff5ff;
    }
    .before {
      text-align: left;
      color: #464646;
    }
    .after {
      min-width: 60px;
      margin-left: 12px;
      text-align: right;
      font-size: 12px;
      color: #95a0b0;
    }
  }
}
</style>
