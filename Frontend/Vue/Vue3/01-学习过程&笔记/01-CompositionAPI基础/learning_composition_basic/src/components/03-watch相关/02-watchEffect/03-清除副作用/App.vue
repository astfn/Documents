<template>
  <pre>{{ state }}</pre>
  <button @click="dontWatch">dontWatch</button>
</template>
<script>
  import { defineComponent, ref, reactive, watchEffect } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        name: "鞋履",
        page: 1,
      });

      function request(name, page) {
        console.log(`请求*${name}*的第*${page}*页数据`);

        let timeout = setTimeout(() => {
          state.name = "外套";
          console.log("setTimeout");
        }, 1500);

        let interval = setInterval(() => {
          state.page++;
          console.log("setInterval");
        }, 2000);

        return { interval, timeout };
      }

      let dontWatch = watchEffect((invalidate) => {
        let { interval, timeout } = request(state.name, state.page);
        invalidate(() => {
          clearInterval(interval);
          clearTimeout(timeout);
        });
      });

      return {
        state,
        dontWatch,
      };
    },
  });

  // export default defineComponent({
  //   setup() {
  //     const state = reactive({
  //       name: "鞋履",
  //       page: 1,
  //     });

  //     let timeout = setTimeout(() => {
  //       state.name = "外套";
  //       console.log("setTimeout");
  //     }, 2000);

  //     let interval = setInterval(() => {
  //       state.page++;
  //       console.log("setInterval");
  //     }, 1500);

  //     function request(name, page) {
  //       console.log(`请求*${name}*的第*${page}*页数据`);
  //     }

  //     let dontWatch = watchEffect((onInvalidate) => {
  //       onInvalidate(() => {
  //         clearInterval(interval);
  //         clearTimeout(timeout);
  //       });
  //       request(state.name, state.page);
  //     });

  //     return {
  //       state,
  //       dontWatch,
  //     };
  //   },
  // });
</script>
