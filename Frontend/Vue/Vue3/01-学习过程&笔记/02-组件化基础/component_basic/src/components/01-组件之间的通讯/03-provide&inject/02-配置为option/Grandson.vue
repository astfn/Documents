<template>
  <div id="Grandson">
    <h3>{{ title }}</h3>
    <hr />
    <button
      @click="
        changeShow('Grandson message');
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
    inject: ["title", "message", "changeShow"],

    methods: {
      testEvent() {
        console.log("Ashuntefannao");
      },
    },
  });
</script>
<style scoped>
  #Grandson {
    background: #e67e22;
    margin: 5px;
  }
</style>
