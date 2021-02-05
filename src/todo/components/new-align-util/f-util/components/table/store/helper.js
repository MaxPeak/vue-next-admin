import Store from './index'

export function createStore(table) {
  const store = new Store()
  store.table = table
  return store
}

export function mapStates(mapper) {
  const res = {}
  Object.keys(mapper).forEach(key => {
    const value = mapper[key]
    res[key] = function() {
      return this.store.states[value]
    }
  })
  return res
}
