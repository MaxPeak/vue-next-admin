<template>
  <div class="cca-bubble">
    <slot></slot>
    <span :class="['arrow', arrowModel]"></span>
  </div>
</template>

<script>
export default {
  name: 'VBubble',
  props: {
    model: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    arrowModel() {
      return this.model ? 'right' : 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
.cca-bubble {
  position: relative;
  display: inline-block;
  max-width: 300px;
  margin: 5px 0;
  padding: 10px;
  background-color: #e2e2e2;
  border-color: #e2e2e2;
  color: #2c2c2c;
  text-align: justify;
  word-break: break-word;
  border-radius: 5px;
  .arrow {
    position: absolute;
    left: -10px;
    top: 5px;
    border: 5px solid transparent;
    border-top-color: inherit;
    &.left {
      border-right-color: inherit;
    }
    &.right {
      left: 100%;
      border-left-color: inherit;
    }
  }
}
</style>
