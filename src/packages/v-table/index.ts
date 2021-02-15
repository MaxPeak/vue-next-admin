import { App } from "vue";
import Table from "./components/table.vue";

Table.install = (app: App): App => {
  app.component(Table.name, Table);
  return app;
};

export default Table;
