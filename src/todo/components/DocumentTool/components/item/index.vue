<template>
  <tr
    :class="{ overlap: row.sourceOverlap && row.targetOverlap }"
    :style="minHeight"
  >
    <td
      :class="{
        select: row.sourceSelect && row.targetSelect,
        enter: row.sourceEnter && row.targetEnter
      }"
      @click="handleEvent($event.type, row, 'row', $event)"
      @mousedown="handleEvent($event.type, row, 'row', $event)"
    >
      {{ row.id + 1 }}
    </td>
    <td
      ref="source"
      :class="[
        'source',
        {
          select: row.sourceSelect,
          enter: row.sourceEnter,
          overlap: row.sourceOverlap
        }
      ]"
      :contenteditable="row.editor"
      @click="handleEvent($event.type, row, 'source', $event)"
      @dblclick="handleEvent($event.type, row, 'source', $event)"
      @blur="handleEvent($event.type, row, 'source', $event)"
      @keydown.meta.enter="handleEvent('enter', row, 'source', $event)"
      @keydown.ctrl.enter="handleEvent('enter', row, 'source', $event)"
      @mousedown="handleEvent($event.type, row, 'source', $event)"
    >
      {{ row.sourceContent }}
    </td>
    <td
      ref="target"
      :class="[
        'target',
        {
          select: row.targetSelect,
          enter: row.targetEnter,
          overlap: row.targetOverlap
        }
      ]"
      :contenteditable="row.editor"
      @click="handleEvent($event.type, row, 'target', $event)"
      @dblclick="handleEvent($event.type, row, 'target', $event)"
      @blur="handleEvent($event.type, row, 'target', $event)"
      @keydown.meta.enter="handleEvent('enter', row, 'target', $event)"
      @keydown.ctrl.enter="handleEvent('enter', row, 'target', $event)"
      @mousedown="handleEvent($event.type, row, 'target', $event)"
    >
      {{ row.targetContent }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'VItem',
  props: {
    row: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    minHeight() {
      return { minHeight: `${this.$parent.itemMinHeight}px` }
    }
  },
  mounted() {
    this.$parent.$parent.handleCalculatePosition(this.$el, this.index)
  },
  methods: {
    handleEvent(handleType, row, type, event) {
      this.$emit(handleType, { row, type, event })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
tr {
  td {
    box-sizing: border-box;
    padding: 5px;
    word-break: break-word;
    &:first-child {
      text-align: center;
    }
    &:not(:last-child) {
      border-right: $table-border;
    }
  }
  &:not(:last-child) {
    td {
      border-bottom: $table-border;
    }
  }
}

.select {
  background-color: $select-color;
}
.enter {
  border-bottom: $table-drag-border;
  td {
    border-bottom: $table-drag-border;
  }
}
tr.overlap {
  td {
    border: none;
    &:first-child {
      border-left: $table-drag-border;
    }
    &:last-child {
      border-right: $table-drag-border;
    }
    border-top: $table-drag-border;
    border-bottom: $table-drag-border;
  }
}
td.overlap {
  border: $table-drag-border;
}
</style>
