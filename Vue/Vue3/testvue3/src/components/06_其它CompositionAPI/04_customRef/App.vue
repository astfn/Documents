<template>
  <h2>{{ title }}</h2>
  <input type="text" v-model="title" @change="changeTitle" />
</template>
<script>
  import { defineComponent, customRef } from "vue";

  export default defineComponent({
    setup() {
      function deBounceRef(value, delay = 200) {
        let timer = null;
        return customRef((track, trigger) => {
          return {
            get() {
              track();
              return value;
            },
            set(newVal) {
              clearTimeout(timer);
              timer = setTimeout(() => {
                value = newVal;
                trigger();
              }, delay);
            },
          };
        });
      }
      const title = deBounceRef("Ashun", 1000);
      const changeTitle = () => {};
      return {
        title,
        changeTitle,
      };
    },
  });
</script>
