<template>
  <div>
    <h3>{{ title }}</h3>
    <hr />
    <grandson />
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs, inject } from "vue";
  import Grandson from "./Grandson.vue";
  export default defineComponent({
    components: {
      Grandson,
    },
    setup(props, { emit }) {
      const state = reactive({
        title: "我是child组件",
      });

      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style scoped>
  div {
    background: yellowgreen;
  }
</style>
