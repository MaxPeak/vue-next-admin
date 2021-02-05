<template>
  <label :class="{ check }" class="f-search-checkbox">
    <input v-model="check" type="checkbox" hidden @change="handleChange" />
    <f-icon :icon="icon"></f-icon>
  </label>
</template>

<script>
import Icon from './icon'
export default {
  name: 'FSearchCheckbox',
  components: {
    [Icon.name]: Icon
  },
  props: {
    value: Boolean,
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    check: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleChange({ target: { checked } }) {
      this.$emit('change', checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.f-search-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  font-size: 14px;
  border-radius: 50%;
  color: #73767b;
  transition: all 0.3s;
  cursor: pointer;
  &.check {
    background-color: #f5f7fa;
  }
}
</style>
