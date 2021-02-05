<template>
  <tr class="item" :style="minHeight">
    <td>{{ item.id }}</td>
    <td>{{ item.s }}</td>
    <td>{{ item.t }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
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
.item {
  td {
    box-sizing: border-box;
    padding: 5px;
    word-break: break-word;
    &:first-child {
      text-align: center;
    }
    &:not(:last-child) {
      border-right: 1px solid #ebeef5;
    }
  }
  &:not(:last-child) {
    td {
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>
