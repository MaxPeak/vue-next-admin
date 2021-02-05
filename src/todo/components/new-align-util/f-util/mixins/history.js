import { setStorage, getStorage, removeStorage } from '../utils/localstorage'
import { myDate } from '../utils/myDate'
// 历史记录mixin
export default {
  methods: {
    // 前进
    goahead() {
      let { steps = -1 } = getStorage(this.cacheName)
      const { record = [] } = getStorage(this.cacheName)
      if (!record.length) return console.log('历史栈没有数据')
      steps++
      if (steps > record.length - 1) return console.log('最后一条了')
      const {
        type,
        afterOperating,
        currentIndex,
        operationSource,
        length,
        afterMultipleRow,
        afterCurrentInfo
      } = record[steps]
      switch (true) {
        case type === 'editor':
          this[`${operationSource}List`].splice(currentIndex, 1, afterOperating)
          break
        case type === 'split':
          this[`${operationSource}List`].splice(
            currentIndex,
            1,
            ...afterOperating
          )
          break
        case type === 'merge':
          if (operationSource === 'no') {
            this.sourceList.splice(currentIndex[0], length, afterOperating[0])
            this.targetList.splice(currentIndex[0], length, afterOperating[1])
          } else {
            this[`${operationSource}List`].splice(
              currentIndex[0],
              length,
              afterOperating
            )
          }
          break
        case type === 'remove':
          if (operationSource === 'no') {
            this.sourceList.splice(currentIndex[0], length)
            this.targetList.splice(currentIndex[0], length)
          } else {
            this[`${operationSource}List`].splice(currentIndex[0], length)
          }
          break
        case type === 'insert':
          if (operationSource === 'no') {
            this.sourceList.splice(currentIndex, 0, afterOperating)
            this.targetList.splice(currentIndex, 0, afterOperating)
          } else {
            this[`${operationSource}List`].splice(
              currentIndex,
              0,
              afterOperating
            )
          }
          break
        case type === 'move':
          if (operationSource === 'no') {
            const [sourceVal] = this.sourceList.splice(currentIndex[0], 1)
            const [targetVal] = this.targetList.splice(currentIndex[0], 1)
            this.sourceList.splice(currentIndex[1], 0, sourceVal)
            this.targetList.splice(currentIndex[1], 0, targetVal)
          } else {
            const [val] = this[`${operationSource}List`].splice(
              currentIndex[0],
              1
            )
            this[`${operationSource}List`].splice(currentIndex[1], 0, val)
          }
          break
        case type === 'swop':
          currentIndex.forEach(index => {
            ;[this.sourceList[index], this.targetList[index]] = [
              this.targetList[index],
              this.sourceList[index]
            ]
          })
          break
        // 没有defaults
      }
      // 重新组装table数据
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      // 高亮
      this.multipleRow = afterMultipleRow
      this.currentInfo = afterCurrentInfo
      this.changeActive({ prop: operationSource })
      // 定位dom到页面
      const index = Array.isArray(currentIndex) ? currentIndex[0] : currentIndex
      this.rowScrollInView(index)
      const updateInfo = {
        date: myDate(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        sourceList: this.sourceList,
        targetList: this.targetList,
        record,
        steps
      }
      setStorage(this.cacheName, updateInfo)
    },
    // 后退
    goback() {
      let { steps = -1 } = getStorage(this.cacheName)
      const { record = [] } = getStorage(this.cacheName)
      if (!record.length) return console.log('历史栈没有数据')
      if (steps < 0) return console.log('第一条了')
      const {
        type,
        befoerOperating,
        currentIndex,
        operationSource,
        length,
        befoerMultipleRow,
        befoerCurrentInfo
      } = record[steps]
      switch (true) {
        case type === 'editor':
          this[`${operationSource}List`].splice(
            currentIndex,
            1,
            befoerOperating
          )
          break
        case type === 'split':
          this[`${operationSource}List`].splice(
            currentIndex,
            length,
            befoerOperating
          )
          break
        case type === 'merge':
          if (operationSource === 'no') {
            this.sourceList.splice(currentIndex[0], 1, ...befoerOperating[0])
            this.targetList.splice(currentIndex[0], 1, ...befoerOperating[1])
          } else {
            this[`${operationSource}List`].splice(
              currentIndex[0],
              1,
              ...befoerOperating
            )
          }
          break
        case type === 'remove':
          if (operationSource === 'no') {
            this.sourceList.splice(currentIndex[0], 0, ...befoerOperating[0])
            this.targetList.splice(currentIndex[0], 0, ...befoerOperating[1])
          } else {
            this[`${operationSource}List`].splice(
              currentIndex[0],
              0,
              ...befoerOperating
            )
          }
          break
        case type === 'insert':
          if (operationSource === 'no') {
            this.sourceList.splice(currentIndex, 1)
            this.targetList.splice(currentIndex, 1)
          } else {
            this[`${operationSource}List`].splice(currentIndex, 1)
          }
          break
        case type === 'move':
          if (operationSource === 'no') {
            const [sourceVal] = this.sourceList.splice(currentIndex[1], 1)
            const [targetVal] = this.targetList.splice(currentIndex[1], 1)
            this.sourceList.splice(currentIndex[0], 0, sourceVal)
            this.targetList.splice(currentIndex[0], 0, targetVal)
          } else {
            const [val] = this[`${operationSource}List`].splice(
              currentIndex[1],
              1
            )
            this[`${operationSource}List`].splice(currentIndex[0], 0, val)
          }
          break
        case type === 'swop':
          currentIndex.forEach(index => {
            ;[this.sourceList[index], this.targetList[index]] = [
              this.targetList[index],
              this.sourceList[index]
            ]
          })
          break
        // 没有default
      }
      steps--
      // 重新组装table数据
      this.tableData = this.transformData({
        sourceList: this.sourceList,
        targetList: this.targetList
      })
      // 高亮
      this.multipleRow = befoerMultipleRow
      this.currentInfo = befoerCurrentInfo
      this.changeActive({ prop: operationSource })
      // 定位dom到页面
      const index = Array.isArray(currentIndex) ? currentIndex[0] : currentIndex
      this.rowScrollInView(index)
      const updateInfo = {
        date: myDate(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        sourceList: this.sourceList,
        targetList: this.targetList,
        record,
        steps
      }
      setStorage(this.cacheName, updateInfo)
    },
    // 初始化
    initHistory() {
      const cache = getStorage(this.cacheName) || {}
      const info = {
        sourceList: this.sourceList,
        targetList: this.targetList,
        date: myDate(new Date()).format('YYYY-MM-DD hh:mm:ss')
      }
      setStorage(this.cacheName, Object.assign(cache, info))
    },
    // 重置
    resetHistory() {
      removeStorage(this.cacheName)
    },
    // 修改
    updateHistory(data) {
      let { record = [], steps = -1 } = getStorage(this.cacheName)
      // 如果进行了回退的操作，应该清除后面的记录
      if (steps < record.length - 1) {
        // 因为slice是左闭右开区间，所以要+1
        record = record.slice(0, steps + 1)
      }
      record.push(data)
      steps++
      // 操作最大条数就删除前面的记录
      if (record.length > this.maxSteps) {
        record = record.slice(-this.maxSteps)
        steps = record.length - 1
      }
      const updateInfo = {
        date: myDate(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        sourceList: this.sourceList,
        targetList: this.targetList,
        record,
        steps
      }
      setStorage(this.cacheName, updateInfo)
    },
    // 检测是否存在缓存
    hasHistory() {
      return getStorage(this.cacheName)
    }
  }
}
