<template>
  <div class="document-tool" :style="{ height }">
    <v-table v-if="$slots.header" ref="header" :sourceWidth="sourceWidth">
      <thead>
        <tr>
          <slot name="header" />
        </tr>
      </thead>
    </v-table>

    <v-table
      v-if="tableData.length"
      ref="body"
      :class="['table-body']"
      :sourceWidth="sourceWidth"
      :virtualOffset="virtualOffset"
      @scroll="handleScroll"
    >
      <tbody ref="tbody" v-contextmenu="contextmenu">
        <v-item
          ref="items"
          v-for="(row, index) in visibleList"
          :key="row.id"
          :row="row"
          :index="startIndex + index"
          @click="rowClick"
          @dblclick="handleEditor"
          @blur="handleCancelEditor"
          @enter="handleSplit"
          @mousedown="handleDragdown"
        />
      </tbody>
    </v-table>

    <div v-else class="empty">
      <slot name="empty">
        <v-icon icon="empty" style="font-size:100px" />
        <p>暂无数据</p>
      </slot>
    </div>

    <v-table
      v-if="$slots.footer && tableData.length"
      ref="footer"
      :sourceWidth="sourceWidth"
    >
      <tfoot>
        <tr>
          <slot name="footer" />
        </tr>
      </tfoot>
    </v-table>

    <v-line v-if="visibleList.length && moveLine" v-model="sourceWidth" />

    <v-find
      v-model="findType"
      :total="findResult.length"
      @next="nextFind"
      @prev="prevFind"
      @find="handleFind"
      @replace="handleReplace"
      @replace-all="handleReplaceAll"
    />
  </div>
</template>

<script>
// components
import VTable from './components/table'
import VLine from './components/line'
import VFind from './components/find'
import VIcon from './components/icon'
import VItem from './components/item'
// mixins
const mixin = require.context('./mixins', false, /\.js$/)
const mixins = mixin.keys().map(key => mixin(key).default)
// directives
import contextmenu from './directives/contextmenu'
export default {
  name: 'VDocumentTool',
  mixins: [...mixins],
  directives: {
    contextmenu
  },
  components: {
    VTable,
    VLine,
    VFind,
    VIcon,
    VItem
  },
  props: {
    // 表格高
    height: {
      type: String,
      default: '100%'
    },
    // 原文列表
    source: {
      type: Array,
      require: true
    },
    // 译文列表
    target: {
      type: Array,
      require: true
    },
    // 表格调整线
    moveLine: {
      type: Boolean,
      default: false
    },
    // 是否启动拖拽
    drag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sourceWidth: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scss/variables.scss';

.document-tool {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  border: $table-border;
  .table-body {
    flex: 1;
    overflow-y: auto;
  }
  .empty {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
::v-deep .shadow-ele {
  position: fixed;
  background-color: rgba(#fff, 0.8);
  box-shadow: 0 0 10px 0 rgba(#000, 0.2);
  pointer-events: none;
  z-index: 2020;
  div {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 5px;
    color: rgba(#000, 0.6);
  }
}
</style>
