<template>
  <div
    :style="{ maxHeight: $parent.height }"
    :class="{ border: $parent.border }"
    @scroll="handleScroll"
    class="f-table-body"
  >
    <table cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col
          v-for="(item, index) in columns"
          :key="index"
          :width="item.width"
        />
      </colgroup>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="[$parent.rowClassName({ row, rowIndex })]"
          @dblclick="handleEvent($event, row, rowIndex)"
          @click="handleEvent($event, row, rowIndex)"
          @contextmenu="handleEvent($event, row, rowIndex)"
          @mouseenter="handleEvent($event, row, rowIndex)"
          @mouseleave="handleEvent($event, row, rowIndex)"
        >
          <td
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="[
              $parent.cellClassName({ row, rowIndex, column, columnIndex })
            ]"
            :data-column-id="column.id"
          >
            <render-slot
              :slot-content="
                column.renderCell.call(_renderProxy, $createElement, {
                  row,
                  rowIndex,
                  column
                })
              "
            ></render-slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RenderSlot from './renderSlot'
import { mapStates } from './store/helper'
export default {
  name: 'FTableBody',
  components: {
    [RenderSlot.name]: RenderSlot
  },
  computed: {
    store() {
      return this.$parent.store
    },
    ...mapStates({
      data: 'data',
      columns: 'columns'
    })
  },
  mounted() {
    window.eventBus.$on('toUp', () => {
      let { scrollTop } = this.$el
      const toUp = () => {
        scrollTop -= 100
        this.$el.scrollTop = scrollTop
        if (scrollTop > 0) {
          requestAnimationFrame(toUp)
        }
      }
      toUp()
    })
  },
  methods: {
    handleEvent(event, row, rowIndex) {
      const table = this.store.table
      const cell = this.getCell(event)
      let column
      if (cell) {
        column = this.getColumnByCell(table, cell)
        if (column) {
          table.$emit(`cell-${event.type}`, {
            row,
            rowIndex,
            column,
            cell,
            event
          })
        }
      }
      table.$emit(`row-${event.type}`, { row, rowIndex, column, event })
    },
    getCell(event) {
      let cell = event.target
      while (cell && cell.tagName.toUpperCase() !== 'HTML') {
        if (cell.tagName.toUpperCase() === 'TD') {
          return cell
        }
        cell = cell.parentNode
      }
      return null
    },
    getColumnByCell(table, cell) {
      const columnId = parseInt(cell.dataset.columnId, 10)
      if (columnId) {
        return this.getColumnById(table, columnId)
      }
      return null
    },
    getColumnById(table, columnId) {
      let column = null
      table.columns.forEach(item => item.id === columnId && (column = item))
      return column
    },
    getElement(index) {
      return document.getElementsByTagName('tr')[index]
    },
    handleScroll({ target }) {
      // 距离必须是header高度+一个偏差值（列表三行高度）
      window.eventBus.$emit(target.scrollTop < 66 + 3 * 30 ? 'show' : 'hide')
    }
  }
}
</script>

<style lang="scss">
.f-table-body {
  box-sizing: border-box;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  overflow-y: auto;
  transition: all linear 0.3s;
  tr:not(:last-child) {
    td {
      border-bottom: 1px solid #ebeef5;
    }
  }
  &.border {
    border: 1px solid #ebeef5;
    td:not(:first-child) {
      border-left: 1px solid #ebeef5;
    }
  }
}
</style>
