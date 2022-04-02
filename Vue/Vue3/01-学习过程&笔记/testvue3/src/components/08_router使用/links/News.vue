<template>
  <main id="NewsCPN">我是{{ message }}页面</main>
</template>
<script>
  import { defineComponent, reactive, ref, toRefs } from "vue";
  import { useRoute, onBeforeRouteLeave } from "vue-router";

  export default defineComponent({
    name: "NewsCPN",
    data: () => {
      return {
        name: "NewsCPN",
      };
    },

    setup() {
      const $route = useRoute();
      onBeforeRouteLeave((to, from) => {
        const answer = window.confirm(
          "Do you really want to leave? you have unsaved changes!"
        );
        // 取消导航并停留在同一页面上
        if (!answer) return false;
      });
      return {
        message: $route.query.name,
      };
    },
  });
</script>
<style scoped>
  #NewsCPN {
    flex: 1;
    color: white;
    background: orange;
  }
</style>
