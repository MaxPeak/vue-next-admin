<template>
  <div class="handle">
    <table
      ref="table"
      v-menu="createMenu"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <colgroup>
        <col width="50px" />
        <col :width="tdWidth" />
        <col />
      </colgroup>
      <tbody>
        <tr
          v-for="(row, index) in tableData"
          :key="row.id"
          @dragstart="dragstart(index, $event)"
          @drag="drag"
          @dragend="dragend"
          @dragenter="dragenter(index, $event)"
          @dragover.prevent
          :class="{ 'is-enter': row.isEnter, 'is-merge': row.isMerge }"
          draggable="true"
        >
          <td>{{ index }}</td>
          <td ref="td">{{ row.source }}</td>
          <td>{{ row.target }}</td>
        </tr>
      </tbody>
    </table>

    <f-line ref="f-line" :td-width.sync="tdWidth" />

    <f-search
      :visible.sync="search.visible"
      :type.sync="search.type"
      :current-index="search.index"
      :total="search.list.length"
      @search="searchHandle"
      @search-next="searchNext"
      @search-prev="searchPrev"
      @case-change="caseChange"
      @replace="replace"
      @replace-all="replaceAll"
    />
  </div>
</template>

<script>
const mixin = require.context('./mixins', false, /\.js$/)
const mixins = mixin.keys().map(key => mixin(key).default)
export default {
  name: 'AtHandle',
  mixins: [...mixins],
  data() {
    return {
      tableData: Array.from({ length: 30 }).map((item, index) => ({
        id: index + 1,
        source: `source Lorem ipsum, dolor sit. amet consectetur adipisicing elit. Pariatur fugit exercitationem molestiae totam consequuntur laborum corrupti autem nesciunt eaque voluptas?${index +
          1}`,
        target: `target 自动算法后对齐的差错率要在千分之五以下，1000句自动对齐后（以马总提供的5篇中英对照文档作为验收测试文件?${index +
          1}`,
        isEnter: false,
        isMerge: false
      })),
      tdWidth: null
    }
  },
  mounted() {},
  methods: {
    toggle() {
      this.$nextTick(this.$refs['f-line'].initLineStyle)
    },
    dragend() {
      if (this.isMerge) {
        const startRow = this.tableData[this.startIndex]
        const targetRow = this.tableData[this.endIndex]
        this.tableData.splice(this.endIndex, 1, {
          id: targetRow.id,
          isEnter: false,
          isMerge: false,
          source: `${targetRow.source}${startRow.source}`,
          target: `${targetRow.target}${startRow.target}`
        })
        this.tableData.splice(this.startIndex, 1)
      } else {
        const [removeRow] = this.tableData.splice(this.startIndex, 1)
        this.tableData.splice(this.endIndex, 0, {
          ...removeRow,
          isEnter: false
        })
      }
    },
    dragenter(index, { clientX, clientY }) {
      this.endIndex = index
    },
    dragstart(index, { clientX, clientY }) {
      this.startIndex = index
      const { left, top, height, width } = document
        .querySelectorAll('tr')
        [index].getBoundingClientRect()
      this.clickData = {
        x: left + width / 2,
        y: top + height / 2,
        clientX,
        clientY
      }
    },
    drag({ clientX, clientY }) {
      if (this.endIndex === undefined) return
      const { top, height, left, width } = document
        .querySelectorAll('tr')
        [this.endIndex].getBoundingClientRect()

      const targetData = {
        x: left + width / 2,
        y: top + height / 2
      }

      const yCenter = this.clickData.y + clientY - this.clickData.clientY
      const xCenter = this.clickData.x + clientX - this.clickData.clientX
      const diff = 5

      this.isMerge =
        xCenter >= targetData.x - diff &&
        xCenter <= targetData.x + diff &&
        yCenter >= targetData.y - diff &&
        yCenter <= targetData.y + diff

      this.tableData[this.oldIndex || 0].isMerge = false
      this.tableData[this.oldIndex || 0].isEnter = false

      if (this.isMerge) {
        // console.log('合并')
        this.tableData[this.endIndex].isMerge = true
      } else {
        // console.log('移动')
        this.tableData[this.endIndex].isEnter = true
      }

      this.oldIndex = this.endIndex
    }
    // dragstart(index, { clientX, clientY }) {
    //   this.startIndex = index
    //   const { left, top, height, width } = document
    //     .querySelectorAll('tr')
    //     [index].getBoundingClientRect()
    //   this.clickData = {
    //     left,
    //     top,
    //     height,
    //     width,
    //     x: clientX,
    //     y: clientY
    //   }
    // },
    // drag({ clientX, clientY }) {
    //   if (this.endIndex === undefined) return
    //   const targetDom = document.querySelectorAll('tr')[this.endIndex]
    //   const {
    //     top: targetTop,
    //     bottom: targetBottom,
    //     left: targetLeft,
    //     right: targetRight
    //   } = targetDom.getBoundingClientRect()
    //   const top = this.clickData.top + clientY - this.clickData.y
    //   const bottom = top + this.clickData.height
    //   const left = this.clickData.left + clientX - this.clickData.x
    //   const right = left + this.clickData.width
    //   this.isMerge =
    //     top >= targetTop &&
    //     bottom <= targetBottom &&
    //     left >= targetLeft &&
    //     right <= targetRight

    // this.tableData[this.oldIndex || 0].isMerge = false
    // this.tableData[this.oldIndex || 0].isEnter = false

    // if (this.isMerge) {
    //   // console.log('合并')
    //   this.tableData[this.endIndex].isMerge = true
    // } else {
    //   // console.log('移动')
    //   this.tableData[this.endIndex].isEnter = true
    // }

    // this.oldIndex = this.endIndex
    // }
  }
}
</script>

<style lang="scss" scoped>
.handle {
  padding: 14px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: skyblue;
  table {
    table-layout: fixed;
    width: 100%;
    border: 1px solid #ebeef5;
    user-select: none;
    tr {
      td {
        box-sizing: border-box;
        padding: 10px;
        word-break: break-word;
        &:first-child {
          text-align: center;
        }
        &:not(:last-child) {
          border-right: 1px solid #ebeef5;
        }
      }
      &:not(:last-child) {
        td {
          border-bottom: 1px solid #ebeef5;
        }
      }
      &.is-enter {
        td {
          border-bottom: 2px dashed red;
        }
      }
      &.is-merge {
        td {
          &:first-child {
            border-left: 2px dashed red;
          }
          &:last-child {
            border-right: 2px dashed red;
          }
          border-top: 2px dashed red;
          border-bottom: 2px dashed red;
        }
      }
    }
  }
}
</style>
