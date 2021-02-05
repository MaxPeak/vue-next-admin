<template>
  <label :class="['checkbox', { check }]" @mousedown.prevent>
    <input
      type="checkbox"
      v-model="check"
      v-show="false"
      @change="handleChange"
    />
    <v-icon :icon="icon" />
  </label>
</template>

<script>
import VIcon from '../icon'
export default {
  name: 'VIconCheckbox',
  components: {
    VIcon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
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
.checkbox {
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
