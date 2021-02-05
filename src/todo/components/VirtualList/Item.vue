<template>
  <div class="v-virtual-list__item" :style="minHeight">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VVirtualListItem',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    minHeight() {
      return { minHeight: `${this.$parent.itemMinHeight}px` }
    }
  },
  mounted() {
    this.$parent.handleCalculatePosition(this.$el, this.index)
  }
}
</script>

<style lang="scss" scoped>
.v-virtual-list__item {
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  word-break: break-word;
}
</style>
