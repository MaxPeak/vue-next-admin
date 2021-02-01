export default {
  path: "/home",
  meta: {
    layout: "sidebar",
    title: "首页"
  },
  component: () => import(/* webpackChunkName: "home" */ "./index.vue")
};
