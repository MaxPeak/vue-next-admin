<template>
  <div class="ellipsis">
    <v-ellipsis :row="3">
      this is demo text this is demo text this is demo text this is demo text
      this is demo text this is demo text this is demo text this is demo text
      this is demo text this is demo text this is demo text this is demo text
      this is demo text this is demo text this is demo text this is demo
      textthis is demo text this is demo text this is demo text this is demo
      text this is demo text this is demo text this is demo text this is demo
      text this is demo text this is demo text this is demo text this is demo
      text this is demo text this is demo text this is demo text this is demo
      text this is demo text this is demo text this is demo text this is demo
      text this is demo text this is demo text this is demo text this is demo
      text this is demo text this is demo text this is demo text this is demo
      text this is demo text this is demo text this is demo text this is demo
      text
    </v-ellipsis>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VEllipsis from "@components/Ellipsis/index.vue";
export default defineComponent({
  components: {
    VEllipsis
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.ellipsis {
  width: 500px;
}
</style>
