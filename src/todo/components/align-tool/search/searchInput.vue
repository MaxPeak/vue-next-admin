<template>
  <div :class="{ border }" class="f-input">
    <input
      ref="input"
      @input="handleInput"
      @keydown.enter="handleEnter"
      @blur="handleBlur"
      @focus="handleFocus"
      v-model="nativeInputValue"
      :class="{ icon }"
      v-bind="$attrs"
      type="text"
    />
    <f-search-checkbox
      v-show="showIcon"
      v-model="check"
      @change="handleChange"
      :icon="icon"
      :title="$t('alignUtil.aseSensitive')"
      class="icon"
    ></f-search-checkbox>
  </div>
</template>

<script>
import SearchCheckbox from './searchCheckbox'
export default {
  name: 'FSearchInput',
  components: {
    [SearchCheckbox.name]: SearchCheckbox
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    focus: Boolean
  },
  data() {
    return {
      border: false,
      check: false
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
    },
    showIcon() {
      return this.icon && this.value
    }
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
  methods: {
    handleEnter({ target }) {
      this.$emit('enter', target.value)
    },
    handleInput({ target }) {
      this.$emit('input', target.value)
    },
    handleChange(val) {
      this.$emit('case-change', val)
    },
    handleBlur() {
      this.border = false
    },
    handleFocus() {
      this.border = true
    }
  }
}
</script>

<style lang="scss" scoped>
.f-input {
  display: inline-block;
  position: relative;
  width: 170px;
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
    padding: 0 10px;
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
  .icon {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
}
</style>
