<template>
  <main>
    <h2>{{ title }}</h2>
    <Child v-show="isShow" />
  </main>
</template>
<script>
  import { defineComponent, reactive, toRefs, provide } from "vue";
  import Child from "./Child.vue";

  export default defineComponent({
    components: {
      Child,
    },
    data() {
      return {
        title: "App",
        isShow: true,
      };
    },
    methods: {
      changeShow(message) {
        this.isShow = !this.isShow;
        console.log(message);
      },
    },

    // provide: {
    //   title: "App",
    //   message: "App共享的数据",
    //   changeShow: () => {
    //     console.log("changeShow");
    //   },
    // },

    //若要共享组件实例中的数据（访问this），需要将provide配置为：返回一个对象的函数。
    provide() {
      return {
        title: "App",
        message: "App共享的数据",
        changeShow: this.changeShow,
      };
    },
  });
</script>
<style scoped>
  main {
    background: pink;
  }
</style>
