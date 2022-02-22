<template>
  <div id="main">
    <h2>{{ title }}</h2>
    <child />
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Child from "./Child.vue";
  export default defineComponent({
    name: "App",
    components: { Child },
    setup() {
      const state = reactive({
        title: "App组件",
      });
      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
    background: #bbb;
  }
  #main {
    color: white;
    background: #1abc9c;
  }
</style>
