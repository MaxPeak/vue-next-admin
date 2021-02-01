import { Router } from "vue-router";
/**
 * 设置网页title
 */
const setTitle = (title: string) => {
  if (!title) return;
  document.title = title;
};

/**
 * 观察全局路由
 */
const watch = (router: Router) => {
  router.beforeEach((to, from, next) => {
    setTitle(to.meta.title);
    next();
  });

  router.afterEach(() => {
    // 处理埋点等一些操作
    // code...
  });
};
export default watch;
