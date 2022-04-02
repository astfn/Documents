<template>
  <main id="DetailCPN">我是{{ message }}页面</main>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import { useRoute } from "vue-router";

  export default defineComponent({
    name: "NewsCPN",
    setup() {
      const $route = useRoute();
      return {
        message: $route.query.name,
      };
    },
  });
</script>
<style scoped>
  #DetailCPN {
    flex: 1;
    color: white;
    background: orange;
  }
</style>
