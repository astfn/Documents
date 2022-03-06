<template>
  <pre>{{ state }}</pre>
  <h3>{{ counter }}</h3>
</template>
<script>
  import { defineComponent, ref, reactive, watch } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        arr: [1, 2, 3, 4],
        title: "Ashuntefannao",
        info: {
          name: "Ashun",
          age: 18,
        },
      });
      let counter = ref(0);

      /*
        多数据侦听
        watch([deps],callback([newValues],[oldValues]),{options})
      */
      watch(
        [counter, () => state.info],
        ([newCounter, newInfo], [oldCounter, oldInfo]) => {
          console.log(newCounter);
          console.log(newInfo === oldInfo);
        },
        {
          deep: true,
        }
      );

      setTimeout(() => {
        counter.value++;
        state.info.age = 20;
      }, 1000);

      return {
        state,
        counter,
      };
    },
  });
</script>
