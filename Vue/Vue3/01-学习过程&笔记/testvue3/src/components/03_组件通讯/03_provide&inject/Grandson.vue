<template>
  <div id="Grandson">
    <h3>{{ title }}</h3>
    <hr />
    <button
      @click="
        hidden(false);
        testEvent();
      "
    >
      点我隐藏
    </button>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs, inject } from "vue";

  export default defineComponent({
    setup(props, { emit }) {
      const state = reactive({
        title: "我是Grandson组件",
      });

      const hidden = inject("changeIsShow");
      const title = inject("title", "Ashuntefannao");
      // const hidden = () => {
      //   inject("changeIsShow").call(null, false);
      // };
      const testEvent = () => {
        console.log(title);
      };

      console.log(hidden);
      return {
        ...toRefs(state),
        hidden,
        testEvent,
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
