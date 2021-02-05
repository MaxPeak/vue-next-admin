<template>
  <div>
    <render-slot :slot-content="$slots.default"></render-slot>
  </div>
</template>

<script>
import RenderSlot from './renderSlot'
let columnIdSeed = 1
export default {
  name: 'FTableColumn',
  components: {
    [RenderSlot.name]: RenderSlot
  },
  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'left'
    },
    headerAlign: {
      type: String,
      default: ''
    }
  },
  created() {
    const defaults = {
      id: columnIdSeed++,
      label: this.label,
      prop: this.prop,
      width: this.width,
      align: this.align,
      headerAlign: this.headerAlign
    }
    const column = this.setColumnRenders(defaults)
    this.columnConfig = column
  },
  mounted() {
    const children = this.$parent.$refs.hiddenColumns.children
    const columnIndex = this.getColumnElIndex(children, this.$el)
    this.$parent.store.commit('insertColumn', this.columnConfig, columnIndex)
  },
  destroyed() {
    this.$parent.store.commit('removeColumn', this.columnConfig)
  },
  methods: {
    setColumnRenders(column) {
      const originRenderCell = column.renderCell || this.defaultRenderCell
      column.renderHeader = (h, scope) => {
        const renderHeader = this.$scopedSlots.header
        return renderHeader ? renderHeader(scope) : null
      }
      column.renderCell = (h, data) => {
        let children = null
        if (this.$scopedSlots.default) {
          children = this.$scopedSlots.default(data)
        } else {
          children = originRenderCell(h, data)
        }
        const props = {
          class: `cell ${column.align}`
        }
        return <div {...props}>{children}</div>
      }
      return column
    },
    getColumnElIndex(children, child) {
      return [].indexOf.call(children, child)
    },
    defaultRenderCell(h, { row, column }) {
      const property = column.prop
      const value = property && row[property]
      return value
    }
  }
}
</script>
