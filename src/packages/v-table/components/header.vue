<template>
  <div class="v-table-header">
    <table cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :width="column.width"
        />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :width="column.width"
          >
            <slot :name="headerSlotName(column.prop)">
              <span>{{ column.label }}</span>
            </slot>
            <span v-if="column.resizeCell" class="col-resize" />
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from "vue";
import headerSlotName from "../utils/headerSlotName";
export default defineComponent({
  name: "VTableHeader",
  setup() {
    const instance = getCurrentInstance();
    const columns = computed(() => instance?.parent?.props.columns);
    return { columns, headerSlotName };
  }
});
</script>

<style>
.v-table-header th {
  position: relative;
  font-weight: 500;
}
.v-table-header .col-resize {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -4px;
  width: 7px;
  background-color: skyblue;
  cursor: col-resize;
  z-index: 1;
}
</style>
