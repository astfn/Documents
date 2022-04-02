<template>
  <div id="Child">
    <h2>{{ title }}</h2>
    <grandson />
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Grandson from "./Grandson.vue";
  export default defineComponent({
    name: "ChildCPN",
    components: {
      Grandson,
    },
    setup() {
      const state = reactive({
        title: "Child组件",
      });
      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style scoped>
  #Child {
    margin: 5px;
    color: white;
    background: #2980b9;
  }
</style>
