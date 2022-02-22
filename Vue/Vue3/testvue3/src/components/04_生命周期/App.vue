<template>
  <main>
    <h2>{{ title }}</h2>
    <button @click="changeShow">点我隐藏Child</button>
    <child v-if="isShow" />
  </main>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Child from "./Child.vue";

  export default defineComponent({
    components: { Child },
    setup() {
      const state = reactive({
        title: "App",
        isShow: true,
      });
      const changeShow = () => {
        state.isShow = !state.isShow;
      };
      return {
        ...toRefs(state),
        changeShow,
      };
    },
  });
</script>
<style scoped>
  main {
    background: pink;
  }
</style>
