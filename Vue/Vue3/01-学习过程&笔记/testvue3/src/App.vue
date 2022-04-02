<template>
  <p>
    响应式state：<strong>{{ state.counter }}</strong>
  </p>
  <button @click="increment">increment</button>
</template>

<script>
  import { defineComponent, reactive } from "vue";
  export default defineComponent({
    setup() {
      const state = reactive({
        counter: 0,
      });
      const increment = () => {
        state.counter++;
      };
      return {
        state,
        increment,
      };
    },
  });
</script>
