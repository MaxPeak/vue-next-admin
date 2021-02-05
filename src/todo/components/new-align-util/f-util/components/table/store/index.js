import { doFlattenColumns } from './utils'
import mutations from './mutations'
import Vue from 'vue'

const Store = Vue.extend({
  data() {
    return {
      states: {
        data: [],
        columns: [],
        originColumns: [],
        _columns: []
      }
    }
  },
  methods: {
    // 更新列
    updateColumns() {
      const states = this.states
      const _columns = states._columns || []
      const notFixedColumns = _columns.filter(column => !column.fixed)
      states.originColumns = [].concat(notFixedColumns)
      const leafColumns = doFlattenColumns(notFixedColumns)
      states.leafColumnsLength = leafColumns.length
      states.columns = [].concat(leafColumns)
    }
  }
})

Store.prototype.commit = function(name, ...rest) {
  const mutations = this.mutations
  mutations[name] && mutations[name].call(this, this.states, ...rest)
}

Store.prototype.mutations = mutations

export default Store
