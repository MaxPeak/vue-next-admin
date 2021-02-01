import { RouteRecordRaw } from "vue-router";
export default {
  path: "/login",
  meta: {
    layout: "default",
    title: "登录"
  },
  component: () => import(/* webpackChunkName: "login" */ "./index.vue")
} as RouteRecordRaw;
