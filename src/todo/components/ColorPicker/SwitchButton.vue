<template>
  <div class="v-switch-btn">
    <i class="top" @click="handleClick(true)" />
    <i class="bottom" @click="handleClick(false)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup(_, { emit }) {
    const handleClick = (direction: boolean) => {
      emit("change", direction);
    };
    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
.v-switch-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20px;
  height: 100%;
  .top,
  .bottom {
    height: 0;
    width: 0;
    border: 5px solid transparent;
    cursor: pointer;
  }
  .top {
    border-bottom-color: #c0c4cc;
    border-top: 0;
    margin-bottom: 3px;
    &:hover {
      border-bottom-color: #409eff;
    }
  }
  .bottom {
    border-bottom: 0;
    border-top-color: #c0c4cc;
    &:hover {
      border-top-color: #409eff;
    }
  }
}
</style>
