<template>
  <main>
    <h2>{{ title }}</h2>
    <Child v-show="isShow" @hidden="hiddenChild" />
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
        isShow: true,
      });

      const hiddenChild = (isShow) => {
        state.isShow = isShow;
      };
      return {
        ...toRefs(state),
        hiddenChild,
      };
    },
  });
</script>
<style scoped>
  main {
    background: pink;
  }
</style>
