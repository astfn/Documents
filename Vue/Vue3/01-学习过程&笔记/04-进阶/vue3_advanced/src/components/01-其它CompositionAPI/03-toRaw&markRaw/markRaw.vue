<template>
  <main>
    <div class="reactive">
      <p>state.title：{{ state.title }}</p>
      <button @click="changeTitle">changeTitle</button>
    </div>
    <hr />
    <div class="reactive">
      <p>state1.title：{{ state1.title }}</p>
      <button @click="changeTitle1">changeTitle1</button>
    </div>
    <hr />
    <div class="ref">
      <p>counter：{{ counter.counter }}</p>
      <button @click="increment">increment</button>
    </div>
  </main>
</template>
<script>
  import { defineComponent, markRaw, reactive, ref, toRefs } from "vue";

  export default defineComponent({
    setup() {
      //reactive
      //state
      let obj = {
        title: "Ashuntefannao",
      };

      let state = reactive(obj);
      state = markRaw(obj);

      const changeTitle = () => {
        state.title = state.title.toUpperCase();
        console.log(state);
      };

      //state1(错误用法：没有原始对象，直接将reactive使用markRaw标记)
      //虽然此时依然会新增__v_skip: true属性进行标记，但state1整体已经变为了Proxy对象
      let state1 = reactive({
        title: "Ashuntefannao",
      });
      const changeTitle1 = () => {
        state1.title = state1.title.toUpperCase();
        console.log(state1);
      };
      state1 = markRaw(state1);

      //ref
      let num = { counter: 1 };
      markRaw(num);
      let counter = ref(num);
      console.log(counter.value); //添加上了 __v_skip: true

      const increment = () => {
        counter.value.counter++;
      };

      return {
        state,
        changeTitle,
        state1,
        changeTitle1,
        counter,
        increment,
      };
    },
  });
</script>
