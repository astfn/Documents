<template>
  <div id="category-cpn">
    <h4>Category页面</h4>
    <p>{{ title }}</p>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import { useRoute } from "vue-router";

  export default defineComponent({
    name: "category-cpn",
    setup() {
      const { title } = useRoute().query;
      return { title };
    },
  });
</script>
<style lang="postcss" scoped></style>
