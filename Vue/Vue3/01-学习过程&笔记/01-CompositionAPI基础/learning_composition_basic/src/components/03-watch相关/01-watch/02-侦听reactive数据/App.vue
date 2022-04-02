<template>
  <pre>{{ state }}</pre>
</template>
<script>
  import { defineComponent, reactive, watch } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        arr: [1, 2, 3, 4],
        title: "Ashuntefannao",
        info: {
          name: "Ashun",
          age: 18,
        },
      });

      setTimeout(() => {
        state.title = state.title.toUpperCase();
        state.arr.push("shun");
        state.info.name = "ASHUN";
      }, 1000);

      /*
      侦听`引用数据类型`，涉及到两个问题：
        1. 深度侦听，才有效
          * 由于监听的是 `引用数据类型`，而改变的仅仅是其中的属性，并不会产生新的引用。
        2. 不能有效访问变更之前的数据
          * 因为`watch`的`callback(curren,pre)`中的两个参数，传入的都是 **所侦听的数据本身**。）
          * 而引用类型传址，因此 curren===pre
      */

      // watch(dep,callback(newValue,oldValue),{options})
      watch(
        () => state.arr,
        (cuurent, pre) => {
          console.log("引用类型传址，因此默认状况下不能正常获取之前的信息");
          console.log(cuurent === pre);
        },
        { deep: true }
      );
      //解决问题 2 ：每次返回一个新的引用即可。
      watch(
        () => ({ ...state.info }),
        (cuurent, pre) => {
          console.log(cuurent, pre);
        },
        { deep: true }
      );

      /*
        侦听`基本数据类型`,使用过程很简单，没有什么歧义
        * `基本数据类型` 传址，可以直接、正常的获取新旧数据
      */
      watch(
        () => state.title,
        (cuurent, pre) => {
          console.log("基本数据类型传值，因此前后信息访问正确");
          console.log(cuurent === pre);
        }
      );

      return {
        state,
      };
    },
  });
</script>
