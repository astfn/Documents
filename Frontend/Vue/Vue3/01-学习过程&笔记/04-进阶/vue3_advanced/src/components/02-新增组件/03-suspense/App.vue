<template>
  <div id="main">
    <h2>{{ title }}</h2>
    <suspense>
      <template v-slot:default>
        <child />
      </template>
      <template v-slot:fallback>
        <load />
      </template>
    </suspense>
  </div>
</template>
<script>
  import { defineAsyncComponent, defineComponent, reactive, toRefs } from "vue";
  import Child from "./Child.vue";
  // const Child = defineAsyncComponent(() => import("./Child.vue"));
  import Load from "./Load.vue";
  export default defineComponent({
    name: "App",
    components: {
      Child,
      Load,
    },
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
