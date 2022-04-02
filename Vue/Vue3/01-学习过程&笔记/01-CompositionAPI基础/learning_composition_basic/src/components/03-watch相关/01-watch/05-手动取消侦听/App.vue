<template>
  <button @click="changeToggle">{{ toggle }}</button>
  <button @click="handleNoWatchToggle">手动取消对 toggle 的侦听</button>
</template>
<script>
  import { defineComponent, ref, watch } from "vue";

  export default defineComponent({
    setup() {
      /*
        watch监听，会在组件被销毁时自动停止。
        如果在组件销毁之前我们想要停止掉某个监听，可以调用watch()函数的返回值
      */
      let toggle = ref(true);

      let changeToggle = () => {
        toggle.value = !toggle.value;
      };

      let noWatchToggle = watch(toggle, (newVal, oldVal) => {
        console.log(`toggle改变：${newVal}`);
      });

      let handleNoWatchToggle = () => {
        noWatchToggle();
        console.log("已取消对 toggle 的侦听");
      };

      return {
        toggle,
        changeToggle,
        handleNoWatchToggle,
      };
    },
  });
</script>
