<template>
  <div :style="{ height }" class="f-table">
    <div ref="hiddenColumns" hidden>
      <slot></slot>
    </div>
    <f-table-header v-if="showHeader">
      <slot name="header"></slot>
    </f-table-header>
    <f-table-body v-if="data.length" ref="f-table-body"></f-table-body>
    <slot v-if="!data.length" name="empty">
      <div class="empty">
        {{ $t('alignUtil.empty') }}
      </div>
    </slot>
    <f-table-footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </f-table-footer>
  </div>
</template>

<script>
import TableFooter from './tableFooter'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import { createStore, mapStates } from './store/helper'
export default {
  name: 'FTable',
  componentName: 'FTable',
  components: {
    [TableBody.name]: TableBody,
    [TableHeader.name]: TableHeader,
    [TableFooter.name]: TableFooter
  },
  props: {
    height: {
      type: String,
      default: ''
    },
    border: Boolean,
    headerBorder: {
      type: Boolean,
      default: true
    },
    footerBorder: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    rowClassName: {
      type: Function,
      default() {}
    },
    cellClassName: {
      type: Function,
      default() {}
    },
    headerCellClassName: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      store: createStore(this)
    }
  },
  computed: {
    ...mapStates({
      columns: 'columns'
    })
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value)
      }
    }
  },
  methods: {
    getElement(index) {
      return this.$refs['f-table-body'].getElement(index)
    }
  }
}
</script>

<style lang="scss">
.f-table {
  table {
    table-layout: fixed;
    width: 100%;
    height: 100%;
    th,
    td {
      box-sizing: border-box;
      padding: 5px;
      min-height: 27px;
      font-weight: normal;
    }
    .cell {
      text-align: justify;
      word-break: break-word;
      font-size: 12px;
      &.center {
        text-align: center;
      }
      &.left {
        text-align: left;
      }
      &.right {
        text-align: right;
      }
    }
  }
  .empty {
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.25);
    border: 1px solid #ebeef5;
  }
}
</style>
