<template>
  <div :class="['v-table', { border }]">
    <div v-if="$slots.title" ref="titleRef" class="v-table-title">
      <slot name="title" />
    </div>

    <v-header v-if="header" ref="headerRef">
      <template
        v-for="(column, index) in columns"
        #[headerSlotName(column.prop)]
        :key="index"
      >
        <slot :name="headerSlotName(column.prop)" />
      </template>
    </v-header>

    <v-body v-if="data.length" />

    <v-empty v-else>
      <slot name="empty">empty</slot>
    </v-empty>

    <div v-if="$slots.footer" ref="footerRef" class="v-table-footer">
      <slot name="footer" />
    </div>

    <div
      v-if="data.length && pagination && pagination()"
      ref="paginationRef"
      class="v-table-pagination"
    >
      <slot name="pagination">
        <v-pagination />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * TODO:
 * 自定义表头 1
 * 高度 1
 * 自定义列
 * 自动省略号
 * 单选/多选
 * 拖拽行/列
 * 排序/筛选
 * 多级表头
 * 固定列/表头
 * 展开行
 * 树形数据与懒加载
 * 合并行/列
 * 表头分组
 * 嵌套子表格
 * 虚拟列表
 * 分页
 */
import { defineComponent, toRef } from "vue";
import headerSlotName from "../utils/headerSlotName";
import useTableHeight from "../composables/useTableHeight";
import VHeader from "./header.vue";
import VBody from "./body.vue";
import VEmpty from "./empty.vue";
import VPagination from "./pagination.vue";
export default defineComponent({
  name: "VTable",
  components: {
    VHeader,
    VBody,
    VEmpty,
    VPagination
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      required: true
    },
    pagination: {
      type: Function,
      default: () => ({})
    },
    height: {
      type: Number
    }
  },
  setup(props) {
    return {
      headerSlotName,
      ...useTableHeight(toRef(props, "height"))
    };
  }
});
</script>

<style>
:root {
  --border: 1px solid #ebedf0;
}
.v-table {
  background-color: #fff;
}
.v-table table {
  table-layout: fixed;
  width: 100%;
}
.v-table th,
.v-table td {
  box-sizing: border-box;
  padding: 10px;
  text-align: left;
  font-size: 14px;
}
.v-table tr:not(:last-child) td {
  border-bottom: var(--border);
}
.v-table-body {
  overflow-y: auto;
  border-top: var(--border);
  border-bottom: var(--border);
  height: v-bind(bodyHeight);
}
.v-table-footer {
  border-bottom: var(--border);
}

/* border */
.v-table.border th:not(:first-child),
.v-table.border td:not(:first-child) {
  border-left: var(--border);
}
.v-table.border .v-table-header,
.v-table.border .v-table-footer,
.v-table.border .v-table-body {
  border-left: var(--border);
  border-right: var(--border);
}
.v-table.border .v-table-header {
  border-top: var(--border);
}
</style>
