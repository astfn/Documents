<template>
  <div>
    <h3>{{ title }}</h3>
    <hr />
    <button @click="hidden">点我隐藏</button>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    setup(props, { emit }) {
      const state = reactive({
        title: "我是child组件",
      });

      const hidden = () => {
        emit("hidden", false);
      };
      return {
        ...toRefs(state),
        hidden,
      };
    },
  });
</script>
<style scoped>
  div {
    background: yellowgreen;
  }
</style>
