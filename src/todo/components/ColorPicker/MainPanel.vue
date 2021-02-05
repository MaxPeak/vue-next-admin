<template>
  <div class="v-main-panel" @click="handleClick">
    <div class="white" />
    <div class="black" />
    <v-thumb :x="x" :y="y" type="round" ref="thumb" @click.stop />
  </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import VThumb from "./Thumb.vue";
import { useDraggable } from "../../composables/useDraggable";
export default defineComponent({
  components: {
    VThumb,
  },
  props: ["modelValue"],
  setup() {
    const thumb = ref<ComponentPublicInstance>();
    const { x, y } = useDraggable(thumb);
    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY, target } = e;
      const { left, top } = (target as Element).getBoundingClientRect();
      const {
        width: targetWidth,
        height: targetHeight,
      } = thumb.value?.$el.getBoundingClientRect();
      x.value = clientX - left - targetWidth / 2;
      y.value = clientY - top - targetHeight / 2;
    };
    return { x, y, thumb, handleClick };
  },
});
</script>

<style lang="scss" scoped>
.v-main-panel {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: red;
  cursor: pointer;
  .white,
  .black {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .white {
    background: linear-gradient(to right, #fff 0%, transparent 100%);
  }
  .black {
    background: linear-gradient(transparent 0px, #000 100%);
  }
}
</style>
