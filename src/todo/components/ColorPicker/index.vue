<template>
  <div class="v-color-picker">
    <v-main-panel v-model="modelValue" />
    <v-parameter-panel v-model="data" :current-data="currentData" />
    <v-results
      v-model="data"
      v-model:current-data="currentData"
      @ok="handleOk"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VMainPanel from "./MainPanel.vue";
import VParameterPanel from "./ParameterPanel.vue";
import VResults from "./Results.vue";
import { useColor } from "../../composables/useColor";
export default defineComponent({
  name: "VColorPicker",
  components: {
    VMainPanel,
    VParameterPanel,
    VResults,
  },
  props: ["modelValue"],
  setup(props) {
    const { colorEnum } = useColor("#000000");
    const currentData = ref(null);
    const handleOk = () => {
      console.log(colorEnum.value[0].value);
      console.log(colorEnum.value[1].value);
      console.log(colorEnum.value[2].value);
    };
    return { handleOk, colorEnum, currentData };
  },
});
</script>

<style lang="scss" scoped>
.v-color-picker {
  width: 320px;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  padding: 6px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
