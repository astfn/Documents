<template>
  <div class="child">
    <h4>{{ title }}</h4>

    <div class="content">
      <h4>content具名、作用域插槽</h4>
      <slot name="content" :message="message">
        content具名、作用域插槽默认内容
      </slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "Child_CPN",
    setup() {
      let title = ref("Child cpn");
      let message = "子组件作用域插槽，向父组件传递的数据";
      return {
        title,
        message,
      };
    },
  });
</script>

<style lang="postcss" scoped>
  .child {
    width: 300px;
    padding: 5px;
    box-shadow: 0px 0px 10px 0px #aaa;
  }

  .content {
    margin: 5px 5px;
    padding: 5px 5px;
    box-shadow: 0px 0px 10px 0px skyblue;
  }
</style>
