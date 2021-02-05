<template>
  <div :class="{ border }" class="f-table-header">
    <slot>
      <table cellspacing="0" cellpadding="0" border="0">
        <colgroup>
          <col
            v-for="(item, index) in columns"
            :key="index"
            :width="item.width"
          />
        </colgroup>
        <tr>
          <th
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="[$parent.headerCellClassName({ column, columnIndex })]"
          >
            <div :class="column.headerAlign || column.align" class="cell">
              <render-slot
                v-if="
                  column.renderHeader(_renderProxy, $createElement, { column })
                "
                :slot-content="
                  column.renderHeader(_renderProxy, $createElement, { column })
                "
              ></render-slot>
              <template v-else>{{ column.label }}</template>
            </div>
          </th>
        </tr>
      </table>
    </slot>
  </div>
</template>

<script>
import RenderSlot from './renderSlot'
import { mapStates } from './store/helper'
export default {
  name: 'FTableHeader',
  components: {
    [RenderSlot.name]: RenderSlot
  },
  computed: {
    store() {
      return this.$parent.store
    },
    border() {
      return this.$parent.border && this.$parent.headerBorder
    },
    ...mapStates({
      columns: 'columns',
      originColumns: 'originColumns'
    })
  }
}
</script>

<style lang="scss">
.f-table-header {
  &.border {
    border: 1px solid #ebeef5;
    border-bottom: none;
    th:not(:first-child) {
      border-left: 1px solid #ebeef5;
    }
  }
  table {
    th {
      height: 40px;
    }
  }
}
</style>
