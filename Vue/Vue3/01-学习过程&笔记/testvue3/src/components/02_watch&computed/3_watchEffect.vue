<template>
  <pre>{{ state }}</pre>
</template>
<script>
  import { defineComponent, ref, reactive, watchEffect } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        arr: [1, 2, 3, 4],
        title: "Ashuntefannao",
        info: {
          name: "Ashun",
          counter: 0,
        },
      });

      //非惰性、会首先执行一次callback
      watchEffect(() => {
        console.log(state.info.counter);

        //引用类型数据更新，默认情况下，依旧不能够实现深度侦听
        // console.log(state.info);
      });
      // setInterval(() => {
      //   state.info.counter++;
      // }, 800);
      return {
        state,
      };
    },
  });
</script>
