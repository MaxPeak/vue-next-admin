<template>
  <div :class="['input', 'border']">
    <input
      ref="input"
      type="text"
      v-bind="$attrs"
      v-model="nativeInputValue"
      @keydown.enter="handleEnter"
    />
    <div class="append" v-if="$slots.append">
      <slot name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    focus: Boolean
  },
  watch: {
    // 自动获取焦点
    focus: {
      handler(val) {
        if (!val) return
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      },
      immediate: true
    }
  },
  computed: {
    nativeInputValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleEnter({ target }) {
      this.$emit('enter', target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: inline-flex;
  position: relative;
  width: 150px;
  height: 30px;
  &:after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    height: 1px;
    width: 0px;
    background-color: #c0c4cc;
    transition: all 0.3s;
    content: '';
  }
  &.border {
    &::after {
      width: 100%;
    }
  }
  input {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #73767b;
    padding: 0 5px;
    transition: 0.3s;
    &:placeholder-shown {
      text-overflow: ellipsis;
    }
    &::-webkit-input-placeholder {
      color: #c0c4cc;
    }
    &.icon {
      padding-right: 22px;
    }
  }
  .append {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
