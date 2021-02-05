<template>
  <input type="text" class="v-input" v-model="nativeValue" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: ["modelValue"],
  setup(props, { emit }) {
    const nativeValue = computed({
      get: () => props.modelValue,
      set: (newValue) => emit("update:modelValue", newValue),
    });
    return { nativeValue };
  },
});
</script>

<style lang="scss" scoped>
.v-input {
  box-sizing: border-box;
  width: 100%;
  height: 28px;
  line-height: 28px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  padding: 0 5px;
  outline: none;
  color: #606266;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    border-color: #c0c4cc;
  }
  &:focus {
    border-color: #409eff;
  }
}
</style>
