<template>
  <h2>App</h2>
  <ul>
    <li v-for="item in pathMap" @click="jumpRouter(item)">
      {{ item.title }}
    </li>
  </ul>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
  import { useRouter } from "vue-router";

  export default {
    name: "App",

    setup() {
      const pathMap = [
        {
          title: "to-Category",
          path: "/category",
          query: { title: "分类页面" },
        },
        {
          title: "to-Detial",
          path: "/detail",
          query: { title: "详情页面" },
        },
        {
          title: "to-News",
          path: "/news",
          query: { title: "新闻页面111" },
        },
      ];

      const router = useRouter();
      const jumpRouter = (item) => {
        const { path, query } = item;
        router.push({ path, query });
      };
      return {
        pathMap,
        jumpRouter,
      };
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
