<template>
  <div id="Grandson">
    <h3>{{ title }}</h3>
    <hr />
    <button @click="hidden">点我隐藏</button>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs, inject } from "vue";
  import EventBus from "./mitt.js";

  export default defineComponent({
    setup(props, { emit }) {
      const state = reactive({
        title: "我是Grandson组件",
      });

      const hidden = () => {
        EventBus.emit("hidden", false);
      };
      return {
        ...toRefs(state),
        hidden,
      };
    },
  });
</script>
<style scoped>
  #Grandson {
    background: #e67e22;
    margin: 5px;
  }
</style>
