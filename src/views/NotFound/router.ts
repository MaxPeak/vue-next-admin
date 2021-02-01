import { RouteRecordRaw } from "vue-router";
export default {
  path: "/not-found",
  meta: {
    layout: "default",
    title: "未找到页面"
  },
  component: () => import(/* webpackChunkName: "not-found" */ "./index.vue")
} as RouteRecordRaw;
