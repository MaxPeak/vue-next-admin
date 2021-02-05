<template>
  <div :class="{ border }" class="f-table-footer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FTableFooter',
  computed: {
    border() {
      return this.$parent.border && this.$parent.footerBorder
    }
  }
}
</script>

<style lang="scss">
.f-table-footer {
  &.border {
    border: 1px solid #ebeef5;
    border-top: none;
  }
}
</style>
