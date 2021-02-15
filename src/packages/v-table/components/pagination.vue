<template>
  <div class="v-table-pagination">pagination</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "VTablePagination",
  props: {},
  setup() {
    return {};
  }
});
</script>

<style>
.v-table-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0;
}
</style>
