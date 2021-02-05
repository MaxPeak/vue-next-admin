<template>
  <button v-on="$listeners" v-bind="$attrs" class="f-button">
    <f-icon :icon="icon"></f-icon>
  </button>
</template>

<script>
import Icon from './icon'
export default {
  name: 'FSearchButton',
  components: {
    [Icon.name]: Icon
  },
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.f-button {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  outline: none;
  border: none;
  font-size: 12px;
  border-radius: 50%;
  color: #73767b;
  padding: 0;
  transition: 0.3s;
  background-color: transparent;
  cursor: pointer;
  &:hover:not(:disabled) {
    background-color: #f5f7fa;
  }
  &:disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
