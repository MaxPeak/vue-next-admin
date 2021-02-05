<template>
  <div class="v-alpha-bar" @click="handleClick">
    <div class="content" />
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
.v-alpha-bar {
  position: relative;
  width: 100%;
  height: 15px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==");
  cursor: pointer;
  .content {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, red);
  }
}
</style>
