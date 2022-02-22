// import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router

import { createRouter, createWebHistory } from "vue-router";
//routeCpns
const News = () => import("../components/08_router使用/links/News.vue");
const Category = () => import("../components/08_router使用/links/Category.vue");
const Detail = () => import("../components/08_router使用/links/Detail.vue");

let routes = [
  {
    path: "/",
    redirect: {
      path: "news",
      query: { name: "新闻资讯" },
    },
  },
  {
    path: "/news",
    component: News,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/detail",
    component: Detail,
  },
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
