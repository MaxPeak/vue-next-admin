import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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

/**
 * 设置网页title
 */
const setTitle = (title: string) => {
  if (!title) return;
  document.title = title;
};

router.beforeEach((to, from, next) => {
  setTitle(to.meta.title);
  next();
});

router.afterEach(() => {
  // 处理埋点等一些操作
  // code...
});

export default router;
