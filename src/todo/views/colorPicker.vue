<template>
  <div class="color-picker">
    <v-color-picker v-model="color" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VColorPicker from "@components/ColorPicker/index.vue";
export default defineComponent({
  components: {
    VColorPicker
  },
  setup() {
    const color = ref("#000000");
    return { color };
  }
});
</script>
