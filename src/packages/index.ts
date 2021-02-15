import { App } from "vue";
import { version } from "@root/package.json";

const context = require.context("./", true, /index\.ts/);
const components = context
  .keys()
  .filter(path => path !== "./index.ts")
  .map(path => context(path).default);

const install = (app: App): App => {
  components.forEach(component => {
    app.use(component);
  });
  return app;
};

export default {
  install,
  version
};
