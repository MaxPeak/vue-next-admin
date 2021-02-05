<template>
  <div class="drag-demo">
    <table cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col width="50px" />
        <col />
        <col />
      </colgroup>
      <tbody ref="tbody">
        <tr
          v-for="(row, index) in tableData"
          :key="row.id"
          :class="{
            select: row.selectRow,
            drag: row.dragRow,
            merge: row.isOverlap,
            enter: row.isEnter
          }"
        >
          <td
            @click.exact="radioHandle(row, index, 'selectRow')"
            @click.shift.exact="checkHandle(row, index, 'selectRow')"
            @mousedown.exact="mousedown(row, index, $event)"
          >
            {{ index + 1 }}
          </td>
          <td
            :class="{ select: row.selectSource }"
            @click.exact="radioHandle(row, index, 'selectSource')"
            @click.shift.exact="checkHandle(row, index, 'selectSource')"
          >
            {{ row.source }}
          </td>
          <td
            :class="{ select: row.selectTarget }"
            @click.exact="radioHandle(row, index, 'selectTarget')"
            @click.shift.exact="checkHandle(row, index, 'selectTarget')"
          >
            {{ row.target }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AtHandle',
  data() {
    return {
      tableData: Array.from({ length: 30 }).map((item, index) => ({
        id: index + 1,
        source: `source ${index + 1}`,
        target: `target ${index + 1}`,
        selectSource: false,
        selectTarget: false,
        selectRow: false,
        dragSource: false,
        dragTarget: false,
        dragRow: false,
        isEnter: false,
        isOverlap: false
      }))
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.mousemove)
    document.addEventListener('mouseup', this.mouseup)
  },
  methods: {
    // 单选
    radioHandle(row, index, type) {
      // 重置上次选中的值
      this.resetOldSelect()
      // 修改本次选中的值
      row[type] = true
      // 更新上次被选中的值
      this.oldSelectIndex = [index]
    },
    // 多选
    checkHandle(row, index, type) {
      if (this.oldSelectIndex === undefined) {
        // 还没有选过，那么执行单选操作
        this.radioHandle(row, index, type)
        return
      }
      // 重置上次多选的值
      const { startIndex, min, max } = this.resetOldSelect()
      // 修改本次多选的值
      this.tableData
        .slice(min(startIndex, index), max(startIndex, index) + 1)
        .forEach(item => (item[type] = true))
      // 更新多选值
      this.oldSelectIndex = [startIndex, index]
    },
    // 重置上次选中的值
    resetOldSelect() {
      if (this.oldSelectIndex === undefined) return
      const [startIndex, endIndex = 0] = this.oldSelectIndex
      const { min, max } = Math
      this.tableData
        .slice(min(startIndex, endIndex), max(startIndex, endIndex) + 1)
        .forEach(item => {
          item.selectRow = false
          item.selectSource = false
          item.selectTarget = false
        })
      return { startIndex, min, max }
    },

    mousedown(row, index, { clientX, clientY }) {
      if (this.oldSelectIndex === undefined) return
      // 开启拖拽模式
      this.isDown = true
      const [startIndex, endIndex = startIndex] = this.oldSelectIndex
      const { min, max } = Math

      // 当前元素
      const eles = [...document.querySelectorAll('tbody > tr')].slice(
        min(startIndex, endIndex),
        max(startIndex, endIndex) + 1
      )

      // 储存矩阵信息
      this.mousedownData = eles.map(ele => {
        const { left, top, width, height } = ele.getBoundingClientRect()
        return { left, top, width, height, clientX, clientY }
      })

      // 克隆元素
      const copyEles = eles.map(ele => {
        const temp = ele.cloneNode(true)
        temp.className = ''
        return temp
      })

      // 添加元素到页面
      this.div = document.createElement('div')
      this.div.className = 'drag-ele'
      copyEles.forEach(ele => {
        this.div.appendChild(ele)
      })
      this.$refs.tbody.appendChild(this.div)
    },
    mousemove({ clientX, clientY }) {
      if (!this.isDown) return

      // 切换为隐藏态
      const [startIndex, endIndex = startIndex] = this.oldSelectIndex
      const { min, max } = Math
      this.tableData
        .slice(min(startIndex, endIndex), max(startIndex, endIndex) + 1)
        .forEach(item => (item.dragRow = true))

      // 计算影子位图信息
      const rect = this.mousedownData.reduce((acc, cur, idx) => {
        const left = cur.left + clientX - cur.clientX
        const top = cur.top + clientY - cur.clientY
        if (idx === 0) {
          acc.top = top
        }
        if (acc.height !== undefined) {
          acc.height += cur.height
        } else {
          acc.height = cur.height
        }
        acc.left = left
        acc.width = cur.width
        return acc
      }, {})

      // 更新影子位置
      this.div.style.cssText = `top:${rect.top}px;left:${rect.left}px;width:${rect.width}px;height:${rect.height}px`

      if (this.oldSelectIndex.length > 1) {
        const diff = 5
        ;[...document.querySelectorAll('tbody > tr')].forEach((item, index) => {
          const { top, height, left, width } = item.getBoundingClientRect()

          this.isEnter =
            startIndex !== index &&
            rect.left < left + width - diff &&
            rect.left + rect.width > left + diff &&
            rect.top < top + height - diff &&
            rect.top + rect.height > top + diff

          if (this.isEnter) {
            // console.log('进入', index)
            this.tableData[this.oldIndex || 0].isOverlap = false
            this.tableData[this.oldIndex || 0].isEnter = false
            this.tableData[index].isEnter = true
            this.oldIndex = index
          }
        })
      } else {
        const diff = 5
        const srcXCenter = rect.left + rect.width / 2
        const srcYCenter = rect.top + rect.height / 2

        ;[...document.querySelectorAll('tbody > tr')].forEach((item, index) => {
          const { top, height, left, width } = item.getBoundingClientRect()
          const tarXCenter = left + width / 2
          const tarYCenter = top + height / 2
          this.isOverlap =
            startIndex !== index &&
            srcXCenter >= tarXCenter - diff &&
            srcXCenter <= tarXCenter + diff &&
            srcYCenter >= tarYCenter - diff &&
            srcYCenter <= tarYCenter + diff

          this.isEnter =
            startIndex !== index &&
            rect.left < left + width - diff &&
            rect.left + rect.width > left + diff &&
            rect.top < top + height - diff &&
            rect.top + rect.height > top + diff

          if (this.isEnter) {
            // console.log('进入', index)
            this.tableData[this.oldIndex || 0].isOverlap = false
            this.tableData[this.oldIndex || 0].isEnter = false
            this.tableData[index].isEnter = true
            this.oldIndex = index
          }

          if (this.isOverlap) {
            // console.log('合并', index)
            this.tableData[this.oldIndex || 0].isOverlap = false
            this.tableData[this.oldIndex || 0].isEnter = false
            this.tableData[index].isOverlap = true
            this.oldIndex = index
          }
        })
      }
    },
    mouseup() {
      if (!this.isDown) return

      // 切换为可见态
      const [startIndex, endIndex = startIndex] = this.oldSelectIndex
      const { min, max } = Math
      this.tableData
        .slice(min(startIndex, endIndex), max(startIndex, endIndex) + 1)
        .forEach(item => (item.dragRow = false))

      // 回收相关的变量和节点
      this.isDown = null
      this.mousedownData = null
      this.$refs.tbody.removeChild(this.div)
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-demo {
  padding: 14px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  table {
    table-layout: fixed;
    width: 100%;
    border: 1px solid #ebeef5;
    user-select: none;
    tr {
      &.select {
        td {
          background: skyblue;
        }
      }
      &.drag {
        visibility: hidden;
      }
      &.merge {
        td {
          &:first-child {
            border-left: 2px dashed red;
          }
          &:last-child {
            border-right: 2px dashed red;
          }
          border-top: 2px dashed red;
          border-bottom: 2px dashed red !important;
        }
      }
      &.enter {
        td {
          border-bottom: 2px dashed red !important;
        }
      }
      td {
        box-sizing: border-box;
        padding: 10px;
        word-break: break-word;
        &.select {
          background: skyblue;
        }
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
    }
  }
}

/deep/.drag-ele {
  position: fixed;
  box-shadow: 0 0 10px 0 rgba(#000, 0.2);
  pointer-events: none;
  z-index: 2020;
  td {
    background-color: rgba(#fff, 0.8) !important;
    border: none !important;
    &:first-child {
      text-align: center;
      width: 50px;
    }
    &:last-child {
      display: none;
    }
  }
}
</style>
