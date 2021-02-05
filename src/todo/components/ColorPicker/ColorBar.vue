<template>
  <div class="v-color-bar" @click="handleClick">
    <v-thumb :x="x" ref="thumb" @click.stop />
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
  props: {},
  setup() {
    const thumb = ref<ComponentPublicInstance>();
    const { x } = useDraggable(thumb);
    const handleClick = (e: MouseEvent) => {
      const { clientX, target } = e;
      const { left } = (target as Element).getBoundingClientRect();
      const { width: targetWidth } = thumb.value?.$el.getBoundingClientRect();
      x.value = clientX - left - targetWidth / 2;
    };
    return { x, thumb, handleClick };
  },
});
</script>

<style lang="scss" scoped>
.v-color-bar {
  position: relative;
  width: 100%;
  height: 15px;
  background: linear-gradient(
    to left,
    red 0px,
    rgb(255, 0, 153) 10%,
    rgb(205, 0, 255) 20%,
    rgb(50, 0, 255) 30%,
    rgb(0, 102, 255) 40%,
    rgb(0, 255, 253) 50%,
    rgb(0, 255, 102) 60%,
    rgb(53, 255, 0) 70%,
    rgb(205, 255, 0) 80%,
    rgb(255, 153, 0) 90%,
    red 100%
  );
  cursor: pointer;
}
</style>
