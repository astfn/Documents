<template>
  <main>
    <h2>{{ title }}</h2>
    <Child :list="list" />
    <Child :list="list" />
  </main>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Child from "./Child.vue";
  export default defineComponent({
    components: {
      Child,
    },
    setup() {
      const state = reactive({
        title: "App",
        list: ["新闻", "娱乐", "科技"],
      });

      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style scoped>
  main {
    background: pink;
  }
</style>
