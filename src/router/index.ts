import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import watch from "./watch";

/**
 * 获取页面路由
 */
const getPageRouters = () => {
  const context = require.context("@views", true, /router.ts/);
  return context.keys().reduce((routes, path) => {
    routes.push(context(path).default);
    return routes;
  }, [] as RouteRecordRaw[]);
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },
  ...getPageRouters(),
  {
    path: "/:pathMatch(.*)*",
    redirect: "/not-found"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

watch(router);

export default router;
