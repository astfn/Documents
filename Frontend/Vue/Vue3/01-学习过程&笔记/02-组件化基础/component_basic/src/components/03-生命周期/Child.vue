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
    //options生命周期钩子
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
    //组件卸载的钩子名称已改变
    beforeUnmount() {
      console.log("beforeUnmount");
    },
    unmounted() {
      console.log("unmounted");
    },

    //vue3生命周期钩子
    setup(props) {
      const showMessage = (message) => {
        console.log(`---${message}---`);
      };
      /* 生命周期钩子 */
      showMessage("setup");

      //挂载
      onBeforeMount(() => {
        showMessage("onBeforeMount");
      });
      onMounted(() => {
        showMessage("onMounted");
      });

      //更新
      onBeforeUpdate(() => {
        showMessage("onBeforeUpdate");
      });
      onUpdated(() => {
        showMessage("onUpdated");
      });

      //卸载
      onBeforeUnmount(() => {
        showMessage("onBeforeUnmount");
      });
      onUnmounted(() => {
        showMessage("onUnmounted");
      });

      /* state */
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
