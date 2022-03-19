<template>
  <div id="app">
    <h3>{{ title }}</h3>
    <child>
      <p>App组件向匿名插槽插入内容</p>

      <template v-slot:header>
        <p>App组件向 header 具名插槽插入内容</p>
      </template>

      <template v-slot:footer="footerData">
        <p>App组件向 footer 具名、作用域插槽插入内容</p>
        {{ footerData.message }}
      </template>
    </child>
  </div>
</template>

<script>
  import { defineAsyncComponent, defineComponent, ref } from "vue";
  const Child = defineAsyncComponent(() => import("./Child.vue"));

  export default defineComponent({
    name: "App_CPN",
    components: { Child },
    setup() {
      let title = ref("App Component");
      return {
        title,
      };
    },
  });
</script>

<style lang="postcss" scoped>
  #app {
    padding: 5px;
    box-shadow: 0px 0px 5px 0px black;
  }
</style>
