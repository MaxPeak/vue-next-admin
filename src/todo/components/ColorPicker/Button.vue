<template>
  <button class="v-bottom">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.v-bottom {
  box-sizing: border-box;
  height: 30px;
  background: #fff;
  border: 1px solid #dcdfe6;
  outline: none;
  padding: 0 15px;
  margin: 0;
  color: #606266;
  text-align: center;
  line-height: 30px;
  font-weight: 500;
  font-size: 12px;
  transition: 0.1s;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }
  &:active {
    border-color: #3a8ee6;
    color: #3a8ee6;
  }
}
</style>
