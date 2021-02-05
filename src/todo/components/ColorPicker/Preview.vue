<template>
  <div class="v-preview">
    <div class="copy" @click="handleCopy" @mouseleave="handleMouseleave">
      <v-icon :icon="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import VIcon from "./Icon.vue";
import { ColorData } from "./index.vue";
export default defineComponent({
  components: {
    VIcon,
  },
  props: ["currentData"],
  setup(props) {
    const iconStatus = ref(false);
    const icon = computed(() => (iconStatus.value ? "success" : "copy"));
    const handleCopy = () => {
      if (iconStatus.value) return;
      const result = copy(getColorString(props.currentData));
      iconStatus.value = result;
    };
    const getColorString = ({ type, value }: ColorData) => {
      if (type === "HEX") return value.toString();
      return `${type.toLowerCase()}(${value.toString()})`;
    };
    const handleMouseleave = () => {
      iconStatus.value = false;
    };
    const copy = (content: string) => {
      const oInput = document.createElement("input");
      oInput.value = content;
      document.body.appendChild(oInput);
      oInput.select();
      const result = document.execCommand("Copy");
      oInput.style.display = "none";
      document.body.removeChild(oInput);
      return result;
    };
    return {
      handleCopy,
      handleMouseleave,
      icon,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-preview {
  width: 35px;
  height: 100%;
  background-color: red;
  .copy {
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
  &:hover {
    .copy {
      display: flex;
    }
  }
}
</style>
