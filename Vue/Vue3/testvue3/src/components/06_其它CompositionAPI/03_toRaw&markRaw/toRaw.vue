<template>
  <main>
    <div class="reactive">
      <p>state.title：{{ state.title }}</p>
      <button @click="changeTitle">changeTitle</button>
    </div>
    <div class="ref">
      <p>counter：{{ counter }}</p>
      <button @click="increment">increment</button>
    </div>
  </main>
</template>
<script>
  import { defineComponent, reactive, ref, toRaw, toRefs } from "vue";

  export default defineComponent({
    setup() {
      //reactive
      let state = reactive({
        title: "Ashuntefannao",
      });

      state = toRaw(state);
      console.log(toRaw(state)); //toRaw获取的是reactive对应原始状态的Object
      const changeTitle = () => {
        state.title = state.title.toUpperCase();
        console.log(state.title);
      };
      //ref
      let counter = ref(1);
      counter = toRaw(counter);
      console.log(toRaw(counter)); //对ref变量无效，打印结果还是被ref处理的数据
      const increment = () => {
        counter.value++;
        console.log();
      };
      return {
        state,
        changeTitle,
        counter,
        increment,
      };
    },
  });
</script>
