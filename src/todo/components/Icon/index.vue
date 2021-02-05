<template>
  <svg class="v-icon" aria-hidden="true">
    <use :xlink:href="nativeIcon" />
  </svg>
</template>

<script>
/**
 * 三种使用方式
 * 1、直接使用阿里cdn
 * 2、把阿里cdn链接的资源下载到本地
 * 3、下载svg到本地，配合require.context和svg-sprite-loader一起使用
 */
export default {
  name: 'VIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    nativeIcon() {
      return `#icon${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-icon {
  overflow: hidden;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
}
</style>
