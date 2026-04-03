<template>
  <div id="Grandson">
    <h3>{{ title }}::{{ counter }}</h3>
    <button @click="increment">increment</button>
  </div>
</template>
<script>
  import {
    defineComponent,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onMounted,
    onUnmounted,
    onUpdated,
    reactive,
    toRefs,
  } from "vue";

  export default defineComponent({
    //options钩子
    beforeCreate() {
      console.log("beforeCreate");
    },
    created() {
      console.log("created");
    },
    beforeMount() {
      console.log("beforeMount");
    },
    mounted() {
      console.log("mounted");
    },
    beforeUpdate() {
      console.log("beforeUpdate");
    },
    updated() {
      console.log("updated");
    },
    beforeUnmount() {
      console.log("beforeUnmount");
    },
    unmounted() {
      console.log("unmounted");
    },
    setup(props) {
      const showMessage = (message) => {
        console.log(`---${message}---`);
      };
      //生命周期钩子
      showMessage("setup");
      onBeforeMount(() => {
        showMessage("onBeforeMount");
      });
      onMounted(() => {
        showMessage("onMounted");
      });
      onBeforeUpdate(() => {
        showMessage("onBeforeUpdate");
      });
      onUpdated(() => {
        showMessage("onUpdated");
      });
      onBeforeUnmount(() => {
        showMessage("onBeforeUnmount");
      });
      onUnmounted(() => {
        showMessage("onUnmounted");
      });

      //state
      const state = reactive({
        title: "我是Child组件",
        counter: 0,
      });
      const increment = () => {
        state.counter++;
      };
      return {
        ...toRefs(state),
        increment,
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
