<template>
  <svg class="v-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: ["icon"],
  setup(props) {
    const iconName = computed(() => `#icon-${props.icon}`);
    return { iconName };
  },
});
</script>

<style lang="scss" scoped>
.v-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
