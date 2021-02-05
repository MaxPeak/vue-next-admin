<template>
  <div class="v-parameter-panel">
    <div class="bars">
      <v-color-bar v-model="modelValue" />
      <v-alpha-bar v-model="modelValue" />
    </div>
    <v-preview :current-data="currentData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VColorBar from "./ColorBar.vue";
import VAlphaBar from "./AlphaBar.vue";
import VPreview from "./Preview.vue";
export default defineComponent({
  components: {
    VColorBar,
    VAlphaBar,
    VPreview,
  },
  props: ["modelValue", "currentData"],
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.v-parameter-panel {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  margin: 5px 0;
  .bars {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 5px;
  }
}
</style>
