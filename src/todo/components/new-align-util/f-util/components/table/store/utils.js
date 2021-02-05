export const doFlattenColumns = columns => {
  const result = []
  columns.forEach(column => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children))
    } else {
      result.push(column)
    }
  })
  return result
}
