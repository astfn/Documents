<template>
  <div id="Child">
    <h2>{{ title }}</h2>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  export default defineComponent({
    name: "ChildCPN",
    async setup() {
      const state = reactive({
        title: "Child组件",
      });
      // return { ...toRefs(state) };
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve({ ...toRefs(state) });
      //   }, 3000);
      // });
      const State = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ...toRefs(state) });
        }, 1000);
      });
      return await State;
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
