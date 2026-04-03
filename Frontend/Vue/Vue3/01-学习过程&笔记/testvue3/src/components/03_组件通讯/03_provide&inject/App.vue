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
    setup() {
      const state = reactive({
        title: "App",
        isShow: true,
      });

      const changeIsShow = (isShow) => {
        console.log(isShow);
        state.isShow = isShow;
      };
      provide("changeIsShow", changeIsShow);
      provide("title", state.title);
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
