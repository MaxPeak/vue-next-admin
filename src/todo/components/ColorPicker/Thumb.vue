<template>
  <div :class="['v-thumb', type]" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "block",
      validator: (value: string) => ["round", "block"].includes(value),
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const left = computed(() => `${props.x}px`);
    const top = computed(() => `${props.y}px`);
    return { left, top };
  },
});
</script>

<style lang="scss" scoped vars="{left,top}">
.v-thumb {
  box-sizing: border-box;
  position: absolute;
  left: var(--left);
  top: var(--top);
  z-index: 1;
  cursor: pointer;
  &.block {
    width: 4px;
    height: 100%;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    border-radius: 1px;
  }
  &.round {
    width: 6px;
    height: 6px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }
}
</style>
