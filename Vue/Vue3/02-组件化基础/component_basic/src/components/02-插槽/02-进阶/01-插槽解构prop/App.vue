<template>
  <div id="app">
    <h3>{{ title }}</h3>
    <child>
      <!-- 支持结构作用域插槽传递的数据 -->
      <template v-slot:content="{ message }">
        {{ message }}
      </template>
      <!-- 
      <template v-slot:content="{contentData}">
        {{ contentData.message }}
      </template> 
      -->
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
