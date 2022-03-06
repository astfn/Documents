<template>
  <pre>{{ state }}</pre>
</template>
<script>
  import { defineComponent, reactive, watchEffect } from "vue";

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
      });

      watchEffect(() => {
        // 引用类型数据更新，默认情况下，依旧不能够实现深度侦听
        // console.log(state.info);
        /* 当然，我们也可创建新的引用，这样 watchEffect 将正常执行 */
        // console.log({ ...state.info });
      });

      setInterval(() => {
        state.info.counter++;
      }, 1500);

      return {
        state,
      };
    },
  });
</script>
