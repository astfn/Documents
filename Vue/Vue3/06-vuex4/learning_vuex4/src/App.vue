<template>
  <suspense>
    <template v-slot:default>
      <div>
        <recommends></recommends>
        <user></user>
      </div>
    </template>
    <template v-slot:fallback> loading </template>
  </suspense>
  <button @click="changeUserType">changeUserType</button>
  <button @click="changeMode">changeMode</button>
  <button @click="updateRecommends_action">updateRecommends_action</button>
</template>

<script>
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
  } from "@vue/runtime-core";
  import { useStore } from "vuex";

  const Recommends = defineAsyncComponent(() =>
    import("./components/Recommends.vue")
  );
  const User = defineAsyncComponent(() => import("./components/User.vue"));

  export default defineComponent({
    name: "App",
    components: { Recommends, User },
    setup() {
      const store = useStore();

      const changeUserType = () => {
        store.commit("changeUserType");
      };

      const changeMode = () => {
        store.commit("changeMode");
      };

      const updateRecommends_action = () => {
        store.dispatch("updateRecommends_action");
      };

      return {
        changeUserType,
        changeMode,
        updateRecommends_action,
      };
    },
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
