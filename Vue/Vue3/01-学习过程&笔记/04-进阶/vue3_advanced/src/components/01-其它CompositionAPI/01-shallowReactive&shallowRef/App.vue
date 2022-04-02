<template>
  <div class="reactive_ref">
    <h2 class="title">reactive_ref</h2>
    <h3>浅层数据</h3>
    <p>state.title：{{ title }}</p>
    <button @click="changeStateTitle">changeStateTitle</button>
    <p>ref变量counter：{{ counter }}</p>
    <button @click="refIncrement">refIncrement</button>

    <hr />

    <h3>深层数据</h3>
    <p>state.info.title：{{ info.title }}</p>
    <button @click="changeStateInfoTitle">changeStateInfoTitle</button>
    <p>ref变量deepCounter.counter：{{ deepCounter.counter }}</p>
    <button @click="refDeppIncrement">refDeppIncrement</button>
  </div>

  <div class="shallowReactive_shallowRef">
    <h2 class="title">shallowReactive_shallowRef</h2>
    <h3>浅层数据</h3>
    <p>shallowState.title：{{ title1 }}</p>
    <button @click="changeShallowStateTitle">changeShallowStateTitle</button>
    <p>shallowRef变量shallowCounter：{{ shallowCounter }}</p>
    <button @click="shallowRefIncrement">shallowRefIncrement</button>

    <hr />

    <h3>深层数据</h3>
    <p>shallowState.info.title：{{ info1.title1 }}</p>
    <button @click="changeShallowStateInfoTitle">
      changeShallowStateInfoTitle
    </button>
    <p>ref变量shallowDeepCounter.counter：{{ shallowDeepCounter.counter }}</p>
    <button @click="shallowRefDeppIncrement">shallowRefDeppIncrement</button>
  </div>
</template>

<script>
  import {
    defineComponent,
    reactive,
    ref,
    shallowReactive,
    shallowRef,
    toRefs,
  } from "vue";

  export default defineComponent({
    setup() {
      /*
        reactive_ref
      */
      const state = reactive({
        title: "Ashun",
        info: {
          title: "Ashun",
        },
      });
      //浅层数据
      const changeStateTitle = () => {
        state.title = state.title == "Ashun" ? "Ashuntefannao" : "Ashun";
      };

      const counter = ref(1);
      const refIncrement = () => {
        counter.value++;
      };
      //深层数据
      const changeStateInfoTitle = () => {
        state.info.title =
          state.info.title == "Ashun" ? "Ashuntefannao" : "Ashun";
        console.log(state.info);
      };

      const deepCounter = ref({
        counter: 1,
      });
      const refDeppIncrement = () => {
        deepCounter.value.counter++;
      };

      /*
        shallowReactive_shallowRef
      */
      const shallowState = shallowReactive({
        title1: "Ashun",
        info1: {
          title1: "Ashun",
        },
      });
      //浅层数据可以实现响应式
      const changeShallowStateTitle = () => {
        shallowState.title1 =
          shallowState.title1 == "Ashun" ? "Ashuntefannao" : "Ashun";
      };

      const shallowCounter = shallowRef(1);
      const shallowRefIncrement = () => {
        shallowCounter.value++;
      };
      //深层数据不能实现响应式
      const changeShallowStateInfoTitle = () => {
        shallowState.info1.title1 =
          shallowState.info1.title1 == "Ashun" ? "Ashuntefannao" : "Ashun";
        console.log(shallowState.info1);
        console.log(
          "shallowReactive深层数据不能实现响应式,打印可知深层数据将不再被Proxy代理，而是普通的object"
        );
      };

      const shallowDeepCounter = shallowRef({
        counter: 1,
      });
      const shallowRefDeppIncrement = () => {
        shallowDeepCounter.value.counter++;
        console.log(shallowDeepCounter);
        console.log(
          "shallowRef引用类型数据不能实现响应式，其value不再是Proxy代理对象，也是普通的object"
        );
      };

      return {
        /*reactive_ref
         */
        ...toRefs(state),
        //浅层数据
        changeStateTitle,
        counter,
        refIncrement,
        //深层数据
        changeStateInfoTitle,
        deepCounter,
        refDeppIncrement,
        /*shallowReactive_shallowRef
         */
        ...toRefs(shallowState),
        //浅层数据
        changeShallowStateTitle,
        shallowCounter,
        shallowRefIncrement,
        //深层数据
        changeShallowStateInfoTitle,
        shallowDeepCounter,
        shallowRefDeppIncrement,

        //浅层数据
      };
    },
  });
</script>
<style scoped>
  .reactive_ref {
    background: skyblue;
  }
  .shallowReactive_shallowRef {
    background: #ffbe76;
  }
  .title {
    color: white;
  }
</style>
