<template>
  <main>
    ref转为reactive属性
    <p>{{ state.name }}--{{ state.age }}</p>
    <button @click="incrementAge">incrementAge</button>
  </main>
  <main>
    reactive属性转化为ref
    <p>{{ title }}--{{ counter }}</p>
    <button @click="incrementCounter">incrementCounter</button>
  </main>
</template>
<script>
  import { defineComponent, ref, reactive, toRefs } from "vue";

  export default defineComponent({
    setup() {
      //ref转为reactive属性
      const age = ref(18);
      const state = reactive({
        name: "Ashun",
        age,
      });
      const incrementAge = () => {
        //两种操作形式都可生效，相当于+2
        age.value++;
        state.age++;
      };
      //reactive属性转化为ref
      const state1 = reactive({
        title: "Ashuntefannao",
        counter: 0,
      });
      const incrementCounter = () => {
        state1.counter++;
      };
      return {
        //ref转为reactive属性
        state,
        incrementAge,
        //reactive属性转化为ref
        ...toRefs(state1),
        incrementCounter,
      };
    },
  });
</script>
