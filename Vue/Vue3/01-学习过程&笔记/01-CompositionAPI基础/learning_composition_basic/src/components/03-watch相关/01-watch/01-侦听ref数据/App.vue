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

      watch(counter, (newCounter, oldCounter) => {
        console.log(`侦听到 counter 的改变：${newCounter}`);
      });

      return {
        counter,
        increment,
      };
    },
  });
</script>
