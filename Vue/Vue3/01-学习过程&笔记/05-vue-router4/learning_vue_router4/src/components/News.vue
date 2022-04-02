<template>
  <div id="news-cpn">
    <h4>News页面</h4>
    <p>{{ title }}</p>
  </div>
</template>
<script>
  import { computed, defineComponent, ref, watch } from "vue";
  import { useRoute, onBeforeRouteLeave } from "vue-router";

  export default defineComponent({
    name: "news-cpn",
    setup() {
      onBeforeRouteLeave((to, from, next) => {
        console.log(to.path, from.path);
        next();
      });

      const route = useRoute();

      /* 保证获取最新的 title */

      //方法1
      const title = computed(() => route.query.title);

      //方法2
      // const title = ref(route.query.title);
      // watch(
      //   () => route.query.title,
      //   (newTitle) => {
      //     title.value = newTitle;
      //   }
      // );

      return { title };
    },
  });
</script>
<style lang="postcss" scoped></style>
