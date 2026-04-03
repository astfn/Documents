<template>
  <main id="mian">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="val in links" @click="jumpRouter(val)" :key="val.path">
        {{ val.name }}
      </li>
    </ul>
    <router-view />
  </main>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import { useRouter } from "vue-router";
  export default defineComponent({
    name: "App",
    setup() {
      const state = reactive({
        title: "Ashuntefannao",
      });
      const links = [
        { name: "新闻资讯", path: "/news" },
        { name: "详情", path: "/detail" },
        { name: "分类", path: "/category" },
      ];
      const $router = useRouter();
      const jumpRouter = (link) => {
        $router.replace({ path: link.path, query: { name: link.name } });
        console.log(link);
      };
      return {
        ...toRefs(state),
        links,
        jumpRouter,
      };
    },
  
  });
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #mian {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #eee;
    display: flex;
  }
</style>
