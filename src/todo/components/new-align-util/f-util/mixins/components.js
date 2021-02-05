import Table from '../components/table/table'
import TableColumn from '../components/table/tableColumn'
import Search from '../components/search'

// 组件注册导入mixin
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Search.name]: Search
  }
}
