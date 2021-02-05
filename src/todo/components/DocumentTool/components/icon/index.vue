<template>
  <svg aria-hidden="true" class="icon" v-on="$listeners">
    <use :xlink:href="href" />
  </svg>
</template>

<script>
export default {
  name: 'VIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    href() {
      return `#icon${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
