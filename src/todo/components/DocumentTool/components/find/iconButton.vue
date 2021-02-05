<template>
  <button v-bind="$attrs" v-on="$listeners" class="v-icon-btn">
    <v-icon :icon="icon" />
  </button>
</template>

<script>
import VIcon from '../icon'
export default {
  name: 'VIconButton',
  components: {
    VIcon
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
.v-icon-btn {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  margin: 0 2px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 12px;
  color: #73767b;
  border-radius: 50%;
  transition: 0.3s;
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
