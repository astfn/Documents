<template>
  <pre>{{ counter }}</pre>

  <button @click="increment">increment</button>
</template>
<script>
  import { defineComponent, ref, watch } from "vue";

  export default defineComponent({
    setup() {
      let counter = ref(0);

      let increment = () => {
        counter.value++;
      };

      watch(
        counter,
        (newCounter, oldCounter) => {
          console.log(
            `配置immediate，先立即执行一次，后续更新依旧正常执行：${newCounter}`
          );
        },
        {
          immediate: true,
        }
      );

      return {
        counter,
        increment,
      };
    },
  });
</script>
