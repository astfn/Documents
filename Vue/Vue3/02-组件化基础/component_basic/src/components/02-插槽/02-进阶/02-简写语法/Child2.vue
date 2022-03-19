<template>
  <div class="child2">
    <h4>{{ title }}</h4>
    <div class="content">
      <h4>匿名插槽</h4>
      <slot>匿名插槽默认内容</slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "Child2_CPN",
    setup() {
      let title = ref("Child2 cpn");
      let message = "子组件作用域插槽，向父组件传递的数据";
      return {
        title,
        message,
      };
    },
  });
</script>

<style lang="postcss" scoped>
  .child2 {
    margin: 10px 0px;
    width: 300px;
    padding: 5px;
    box-shadow: 0px 0px 10px 0px #bbb;
  }

  .content {
    margin: 5px 5px;
    padding: 5px 5px;
  }
</style>
