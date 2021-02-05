<template>
  <svg aria-hidden="true" class="f-icon">
    <use :xlink:href="icon" />
  </svg>
</template>

<script>
/**
 * case 大小写
 * close 关闭
 * replace 替换
 * replaceAll 替换全部
 * arrowUp 上箭头
 * arrowDown 下箭头
 */
export default {
  name: 'FIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.f-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
