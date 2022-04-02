<template>
  <header>
    <p>非响应式死数据</p>
    <p>响应式:{{ state.name }}--{{ state.count }}</p>
    <button @click="changeState">changeState</button>
  </header>
  <main>
    <strong>Vue3中的template可以有多个子节点</strong>
    <div>
      测试基本数据类型：{{ state1 }} <button @click="test1">test1</button>
    </div>
    <div>
      测试数组：{{ state2 }}
      <button @click="test2">test2</button>
    </div>
  </main>
</template>
<script>
  //Vue将各个功能模块进行了抽离
  import { defineComponent, reactive } from "vue";

  export default defineComponent({
    setup() {
      //引用类型响应式数据，使用reactive生成
      const state = reactive({
        name: "Ashun",
        count: 0,
      });
      //方法的定义
      const changeState = () => {
        state.name = state.name == "Ashun" ? "Ashuntefannao" : "Ashun";
        state.count++;
        console.log(state);
      };

      //reactive不能代理基本类型
      const state1 = reactive(1);
      //test1
      const test1 = () => {
        state1++;
        console.log(state1);
      };
      //可代理Object、Arr等引用类型
      const state2 = reactive([]);
      //方法的定义
      const test2 = () => {
        state2.push("Ashun");
        console.log(state2);
      };

      //将与view相关的state返回出去，才能够与视图结合。
      return {
        state,
        changeState,
        state1,
        test1,
        state2,
        test2,
      };
    },
  });
</script>
