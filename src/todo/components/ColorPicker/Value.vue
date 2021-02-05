<template>
  <div class="v-value">
    <div class="inputs">
      <v-input v-for="(_, index) in data" :key="index" v-model="data[index]" />
    </div>
    <span class="type"> {{ type }} </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import VInput from "./Input.vue";
export default defineComponent({
  components: {
    VInput,
  },
  props: ["modelValue", "typeIndex"],
  setup(props) {
    const type = computed(() => props.modelValue[props.typeIndex].type);
    const data = computed(() => props.modelValue[props.typeIndex].value);
    return { type, data };
  },
});
</script>

<style lang="scss" scoped>
.v-value {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .inputs {
    flex: 1;
    display: flex;
    .v-input {
      margin: 0 2px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .type {
    display: block;
    width: 31px;
    margin-left: 5px;
    font-size: 12px;
    text-align: center;
    color: #606266;
  }
}
</style>
