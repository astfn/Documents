<template>
  <main>
    <div class="reactive">
      <p>state.title：{{ title }}</p>
      <p>state.info.title：{{ info.title }}</p>
      <button @click="changeTitle">changeTitle</button>
    </div>
    <div class="ref">
      <p>counter：{{ counter }}</p>
      <p>deepCounter[0]：{{ deepCounter[0] }}</p>
      <button @click="increment">increment</button>
    </div>
  </main>
</template>
<script>
  import {
    defineComponent,
    reactive,
    ref,
    readonly,
    shallowReadonly,
    toRefs,
  } from "vue";

  export default defineComponent({
    setup() {
      let state = reactive({
        title: "Ashun",
        info: {
          title: "Ashun",
        },
      });
      //改为只读
      // state = readonly(state);
      state = shallowReadonly(state);

      const changeTitle = () => {
        state.title = "Ashuntefannao";
        state.info.title = "Ashuntefannao";
      };

      let counter = ref(1);
      let deepCounter = ref([1]);

      counter = shallowReadonly(counter);
      deepCounter = shallowReadonly(deepCounter);
      const increment = () => {
        counter.value++;
        deepCounter.value[0]++;
      };

      return {
        ...toRefs(state),
        changeTitle,
        counter,
        deepCounter,
        increment,
      };
    },
  });
</script>
