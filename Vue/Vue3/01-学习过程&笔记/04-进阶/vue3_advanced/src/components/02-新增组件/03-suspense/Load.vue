<template>
  <div id="Load">
    <h2>{{ title }}</h2>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  export default defineComponent({
    name: "LoadCPN",
    setup() {
      const state = reactive({
        title: "Load组件,加载中……",
      });
      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style scoped>
  #Load {
    margin: 5px;
    color: white;
    background: #34495e;
  }
</style>
