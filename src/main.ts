import { createApp } from "vue";
import App from "./App.vue";

// global plugins
import router from "./router";
import store from "./store";

// global styles
import "@styles";

// global components
import packages from "@packages/index";

// hot update
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const checkVersion = require("../scripts/hot-update");
// const enableApi = false;
// checkVersion(enableApi, () => {
//   console.log("reload");
// });

createApp(App)
  .use(store)
  .use(router)
  .use(packages)
  .mount("#app");
