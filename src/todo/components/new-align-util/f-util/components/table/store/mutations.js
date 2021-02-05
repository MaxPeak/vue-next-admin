export default {
  setData(states, value) {
    states.data = value
  },
  insertColumn(states, column, index) {
    const array = states._columns
    if (typeof index !== 'undefined') {
      array.splice(index, 0, column)
    } else {
      array.push(column)
    }
    this.updateColumns()
  },
  removeColumn(states, column) {
    const array = states._columns
    if (array) {
      array.splice(array.indexOf(column), 1)
    }
    this.updateColumns()
  }
}
