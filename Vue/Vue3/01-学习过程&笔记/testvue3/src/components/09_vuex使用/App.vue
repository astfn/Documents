<template>
  <main id="main">
    <h2>{{ title }}</h2>
    <button @click="show()">show</button>
    <button @click="hidden()">hidden</button>
  </main>
  <Brother />
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import { useStore } from "vuex";

  import Brother from "./Brother.vue";
  export default defineComponent({
    components: {
      Brother,
    },
    setup() {
      const state = reactive({
        title: "我是App",
      });
      const $store = useStore();
      const show = () => {
        $store.commit("show");
      };
      const hidden = () => {
        $store.commit("hidden");
      };
      return {
        ...toRefs(state),
        show,
        hidden,
      };
    },
  });
</script>
