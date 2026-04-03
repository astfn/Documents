<template>
  <h3>computed执行结果</h3>
  <pre>{{ info_computed }}</pre>
  <pre>{{ info_computed }}</pre>
  <pre>{{ info_computed }}</pre>
  <h3>普通method执行结果</h3>
  <pre>{{ info_method() }}</pre>
  <pre>{{ info_method() }}</pre>
  <pre>{{ info_method() }}</pre>
</template>
<script>
  import { defineComponent, ref, reactive, computed } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        name: "ashun",
        age: 18,
        like: "coding",
      });
      const getInfo = () => {
        let { name, age, like } = state;
        name = `名称:${name.substring(0, 1).toUpperCase()}${name.slice(1)}`;
        age = `年龄:${age}岁`;
        like = `喜欢:${like}!`;
        return `
          ${name}
          --${age}
          --${like}`;
      };

      const info_method = () => {
        console.log("method 多次调用");
        return getInfo();
      };

      const info_computed = computed(() => {
        console.log("computed 具有缓存特性");
        return getInfo();
      });

      return {
        info_computed,
        info_method,
      };
    },
  });
</script>
