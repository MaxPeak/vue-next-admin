<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="f-util">
    <slot :methods="headerSlotProps" name="header"></slot>
    <f-table
      ref="f-table"
      :data="tableData"
      :border="true"
      :show-header="false"
      :height="height"
      :cell-class-name="cellClassName"
      :row-class-name="rowClassName"
      v-menu="contextmenu"
      class="no-select"
    >
      <f-table-column prop="no" label="No" align="center" width="50">
        <template #default="prop">
          <div class="base" @click.stop="cellClick($event, prop)">
            {{ prop.rowIndex + 1 }}
          </div>
        </template>
      </f-table-column>
      <f-table-column :label="$t('cloudLibrary.srcLanguage')" prop="source">
        <template #default="prop">
          <div
            :contenteditable="prop.row.editor"
            class="base"
            @click.stop="cellClick($event, prop)"
            @dblclick.stop="cellDblclick"
            @blur="updateRow"
            @keydown.stop.meta.enter="handleEvent('split')"
            @keydown.stop.ctrl.enter="handleEvent('split')"
            v-html="prop.row.sourceContent"
          ></div>
        </template>
      </f-table-column>
      <f-table-column :label="$t('cloudLibrary.tarLanguage')" prop="target">
        <template #default="prop">
          <div
            :contenteditable="prop.row.editor"
            class="base"
            @click.stop="cellClick($event, prop)"
            @dblclick.stop="cellDblclick"
            @blur="updateRow"
            @keydown.stop.meta.enter="handleEvent('split')"
            @keydown.stop.ctrl.enter="handleEvent('split')"
            v-html="prop.row.targetContent"
          ></div>
        </template>
      </f-table-column>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </f-table>
    <slot :methods="footerSlotProps" name="footer"></slot>
    <!-- 搜索替换框 -->
    <f-search
      :visible.sync="searchVisible"
      :type.sync="searchType"
      :current-index="calcCuttentIndex"
      :total="serachList.length"
      @search="search"
      @search-next="searchNext"
      @search-prev="searchPrev"
      @case-change="caseChange"
      @replace="replace"
      @replace-all="replaceAll"
    ></f-search>
  </div>
</template>

<script>
import { getOS } from './utils/common'
// mixins
const mixin = require.context('./mixins', false, /\.js$/)
const mixins = mixin.keys().map(key => mixin(key).default)
export default {
  name: 'FUtil',
  mixins: [...mixins],
  data() {
    return {
      OS: null
    }
  },
  computed: {
    contextmenu() {
      if (this.OS === null) return
      const ctrlKey = this.OS === 'Mac' ? '⌘' : 'Ctrl'
      const shiftKey = this.OS === 'Mac' ? '⇧' : 'shift'
      return [
        {
          icon: '#iconhuitui',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.fallback'),
          after: `${ctrlKey}+Z`,
          handle: () => {
            this.goback()
          }
        },
        {
          icon: '#iconqianjin',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.forward'),
          after: `${ctrlKey}+${shiftKey}+Z`,
          handle: () => {
            this.goahead()
          }
        },
        {
          icon: '#iconhebingduanla',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.merge'),
          after: 'Ctrl+M',
          handle: () => {
            this.handleEvent('merge')
          }
        },
        {
          icon: '#iconzhuanchaifen',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.breakUp'),
          handle: () => {
            this.handleEvent('split')
          }
        },
        {
          icon: '#iconmoveup',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.moveUp'),
          after: `${ctrlKey}+↑`,
          handle: () => {
            this.handleEvent('move', 'up')
          }
        },
        {
          icon: '#iconmovedown',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.moveDown'),
          after: `${ctrlKey}+↓`,
          handle: () => {
            this.handleEvent('move', 'down')
          }
        },
        {
          icon: '#icontiaohuansu',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.switch'),
          handle: () => {
            this.handleEvent('swop')
          }
        },
        {
          icon: '#iconcharu',
          iconColor: '#5b8df3',
          label: this.$t('alignUtil.insert'),
          handle: () => {
            this.handleEvent('insert')
          }
        },
        {
          icon: '#iconchuyidong',
          iconColor: '#D35060',
          label: this.$t('alignUtil.del'),
          after: 'Delete',
          handle: () => {
            this.handleEvent('remove')
          }
        }
      ]
    }
  },
  mounted() {
    this.OS = getOS()
  }
}
</script>

<style lang="scss" scoped>
.f-util {
  // 禁止选中
  .no-select {
    user-select: none;
  }
  ::v-deep.clear-padding {
    padding: 0 !important;
  }
  ::v-deep.base {
    padding: 5px;
    font-size: 17px;
    outline: none;
    font-family: 'Times New Roman', '宋体', 'PingFang SC', 'Microsoft YaHei',
      Arial;
    &:focus {
      box-shadow: 0 0 5px #1890ff inset;
    }
  }
  // 搜索高亮
  ::v-deep.search-highlight {
    background-color: #fff470;
  }
  // 禁用态
  ::v-deep.disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
  }
  // 激活态
  ::v-deep.active {
    background-color: #def;
  }
}
</style>
