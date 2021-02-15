<template>
  <div class="v-table-body">
    <table cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :width="column.width"
        />
      </colgroup>
      <thead>
        <tr v-for="row in data" :key="row[rowKey]">
          <td v-for="(column, columnIndex) in columns" :key="columnIndex">
            {{ row[column.prop] }}
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from "vue";
export default defineComponent({
  name: "VTableBody",
  props: {},
  setup() {
    const instance = getCurrentInstance();
    const data = computed(() => instance?.parent?.props.data);
    const columns = computed(() => instance?.parent?.props.columns);
    const rowKey = computed(() => instance?.parent?.props.rowKey);
    return {
      columns,
      data,
      rowKey
    };
  }
});
</script>
