<template>
  <div class="v-results">
    <div class="result">
      <v-value
        v-model="modelValue"
        v-model:current-data="currentData"
        :type-index="typeIndex"
      />
      <v-switch-button @change="handleSwitch" />
    </div>
    <v-button @click="$emit('ok')">确定</v-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import VButton from "./Button.vue";
import VSwitchButton from "./SwitchButton.vue";
import VValue from "./Value.vue";
export default defineComponent({
  components: {
    VButton,
    VSwitchButton,
    VValue,
  },
  props: ["modelValue", "currentData"],
  setup(props, { emit }) {
    const typeIndex = ref(0);
    const handleSwitch = (direction: boolean) => {
      if (direction) {
        typeIndex.value--;
        if (typeIndex.value < 0) {
          typeIndex.value = props.modelValue.length - 1;
        }
      } else {
        typeIndex.value++;
        typeIndex.value %= props.modelValue.length;
      }
      emit("update:currentData", props.modelValue[typeIndex.value]);
    };
    onMounted(() =>
      emit("update:currentData", props.modelValue[typeIndex.value])
    );
    return { handleSwitch, typeIndex };
  },
});
</script>

<style lang="scss" scoped>
.v-results {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .result {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-right: 20px;
  }
}
</style>
