<template>
  <h3 ref="titleRef">Ashuntefannao</h3>
  <pre>{{ num }}</pre>
</template>
<script>
  import { defineComponent, ref, watchEffect } from "vue";

  export default defineComponent({
    setup() {
      const titleRef = ref(null);

      /* 默认非惰性触发，立即执行，一开始会打印 null */
      // watchEffect(() => {
      //   console.log(titleRef.value, "titleRef");
      // });

      //如果只是想要 state 更新后，才执行副作用，可以设置 flush:"post" 解决
      watchEffect(
        () => {
          // titleRef.value 更新后才执行，因此在第一次执行时，就可获取到DOM元素
          console.log(titleRef.value, "titleRef");
        },
        { flush: "post" }
      );

      /* 
          只对 template 中元素的引用（ref）有效，
          普通的 ref 响应式数据，依旧是非惰性触发
      */
      const num = ref(0);

      watchEffect(
        () => {
          console.log(num.value, "num");
        },
        { flush: "post" }
      );

      setInterval(() => {
        num.value++;
      }, 1500);

      return {
        //普通ref数据
        num,
        //模板引用
        titleRef,
      };
    },
  });
</script>
