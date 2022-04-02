import { createRouter, createWebHistory } from "vue-router";

const Category_CPN = () => import("../components/Category.vue");
const Detail_CPN = () => import("../components/Detail.vue");
const News_CPN = () => import("../components/News.vue");

const routes = [
  {
    path: "/",
    redirect: {
      path: "/news",
      query: {
        title: "新闻资讯",
      },
    },
  },
  {
    path: "/news",
    component: News_CPN,
  },
  {
    path: "/detail",
    component: Detail_CPN,
  },
  {
    path: "/category",
    component: Category_CPN,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
