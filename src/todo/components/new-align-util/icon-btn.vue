<template>
  <button
    :style="calcColor"
    :disabled="disabled"
    class="icon-btn"
    @click="handleClick"
  >
    <ctc-iconfont :icon="icon" :style="calcColor"></ctc-iconfont>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Iconfont from '../../bases/iconfont'
export default {
  name: 'IconBtn',
  components: {
    [Iconfont.name]: Iconfont
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '5b8df3'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    calcColor() {
      return { color: this.color }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-btn {
  color: #373737;
  font-size: 14px;
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: #5b8df3;
  }
  &:disabled {
    cursor: not-allowed;
  }
}
</style>
