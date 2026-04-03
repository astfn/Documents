<template>
  <div id="detail-cpn">
    <h4>Detail页面</h4>
    <p>{{ title }}</p>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import { useRoute } from "vue-router";

  export default defineComponent({
    name: "detail-cpn",
    setup() {
      const { title } = useRoute().query;
      return { title };
    },
  });
</script>
<style lang="postcss" scoped></style>
