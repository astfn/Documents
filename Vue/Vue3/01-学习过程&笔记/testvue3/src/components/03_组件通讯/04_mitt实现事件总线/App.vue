<template>
  <main>
    <h2>{{ title }}</h2>
    <Child v-show="isShow" />
  </main>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Child from "./Child.vue";
  import EventBus from "./mitt.js";

  export default defineComponent({
    components: {
      Child,
    },
    setup() {
      const state = reactive({
        title: "App",
        isShow: true,
      });
      EventBus.on("hidden", (isShow) => {
        state.isShow = isShow;
        console.log(isShow);
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
