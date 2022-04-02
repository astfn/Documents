<template>
  <pre>{{ state }}</pre>
</template>
<script>
  import { defineComponent, ref, reactive, watch, computed } from "vue";

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

      setTimeout(() => {
        // state.title = state.title.toUpperCase();
        // state.arr.push("shun");
      }, 1000);
      //引用类型,需要depp，
      watch(
        () => state.arr,
        (cuurent, pre) => {
          console.log("引用类型传址，因此不能正常获取之前的信息");
          console.log(cuurent === pre);
        },
        { deep: true }
      );
      //基本类型
      watch(
        () => state.title,
        (cuurent, pre) => {
          console.log("基本数据类型传值，因此前后信息访问正确");
          console.log(cuurent === pre);
        }
      );

      //多数据侦听

      let counter = ref(0);
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
      };
    },
  });
</script>
