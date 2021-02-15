<template>
  <div class="v-table-empty">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "VTableEmpty",
  props: {},
  setup() {
    return {};
  }
});
</script>

<style>
.v-table-empty {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
}
</style>
