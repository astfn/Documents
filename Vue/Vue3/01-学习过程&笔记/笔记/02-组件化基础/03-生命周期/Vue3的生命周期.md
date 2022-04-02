在Vue3中，对生命周期钩子做了一些微调，与Vue2.x存在差异，下面我们来总结一下Vue3生命周期对比Vue2.x有哪些不同。

## 更改部分

- Vue3.0中可继续沿用Vue2.x中的大部分生命周期钩子，但有两个被更名：

  - `beforeDestroy` 改名为  `beforeUnmount`
  - `destroyed` 改名为 `unmounted`

  也就是说，如果配置`beforeDestroy/destroyed`将不再奏效

- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：

  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`
  - `activated` =====> `onActivated`
  - `deactivated` ===> `onDeactivated`
  
  setup 中没有对应 `beforeCreate/created `的部分，因为 `setup` 会在二者 **之前** 进行调用，所以这里直接使用 setup 进行替换。

## 调用顺序

​	上面介绍到：Vue3中既可以像 Vue2.x 一样将生命周期钩子作为 option 进行配置，也可以在 CompositionAPI 中进行配置。

​	那如果我既在 options 中配置了钩子，又在 CompositionAPI 中配置了钩子，二者调用顺序如何？

* 答案是：**CompositionAPI钩子 优先于 options钩子**

可通过下例代码进行测试：

App.vue

```
<template>
  <main>
    <h2>{{ title }}</h2>
    <button @click="changeShow">点我隐藏Child</button>
    <child v-if="isShow" />
  </main>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Child from "./Child.vue";

  export default defineComponent({
    components: { Child },
    setup() {
      const state = reactive({
        title: "App",
        isShow: true,
      });
      const changeShow = () => {
        state.isShow = !state.isShow;
      };
      return {
        ...toRefs(state),
        changeShow,
      };
    },
  });
</script>
<style scoped>
  main {
    background: pink;
  }
</style>
```

Child.vue

```
<template>
  <div id="Grandson">
    <h3>{{ title }}::{{ counter }}</h3>
    <button @click="increment">increment</button>
  </div>
</template>
<script>
  import {
    defineComponent,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onMounted,
    onUnmounted,
    onUpdated,
    reactive,
    toRefs,
  } from "vue";

  export default defineComponent({
    //options钩子
    beforeCreate() {
      console.log("beforeCreate");
    },
    created() {
      console.log("created");
    },
    beforeMount() {
      console.log("beforeMount");
    },
    mounted() {
      console.log("mounted");
    },
    beforeUpdate() {
      console.log("beforeUpdate");
    },
    updated() {
      console.log("updated");
    },
    beforeUnmount() {
      console.log("beforeUnmount");
    },
    unmounted() {
      console.log("unmounted");
    },
    //setup
    setup(props) {
      const showMessage = (message) => {
        console.log(`---${message}---`);
      };
      //生命周期钩子
      showMessage("setup");
      onBeforeMount(() => {
        showMessage("onBeforeMount");
      });
      onMounted(() => {
        showMessage("onMounted");
      });
      onBeforeUpdate(() => {
        showMessage("onBeforeUpdate");
      });
      onUpdated(() => {
        showMessage("onUpdated");
      });
      onBeforeUnmount(() => {
        showMessage("onBeforeUnmount");
      });
      onUnmounted(() => {
        showMessage("onUnmounted");
      });

      //state
      const state = reactive({
        title: "我是Child组件",
        counter: 0,
      });
      const increment = () => {
        state.counter++;
      };
      return {
        ...toRefs(state),
        increment,
      };
    },
  });
</script>
<style scoped>
  #Grandson {
    background: #e67e22;
    margin: 5px;
  }
</style>
```

## 流程变更

Vue2.x生命周期流程图：

<img src="Vue3的生命周期.assets/vue2.png" alt="vue2" style="zoom:45%;" />

Vue3生命周期流程图：

<img src="Vue3的生命周期.assets/vue3.svg" alt="vue3"/>

Vue3的生命周期流程相对于Vue2.x在某种程度上更加`‘机智’`了：

​	我们知道，在 Vue2.x 的生命周期流程中，只要使用 `new Vue()` 创建了vue实例，不论是否调用了 `$mount` 进行挂载，都会优先进行 vue 实例的初始化，调用 `beforeCreate/created` 两个钩子。

​	如果一些 Vue 实例未被挂载，证明这些组件是无用的，因为最终不会被挂载到页面上，但在 Vue2.x 中，还是会进行实例的初始化和钩子的调用。

​	而 Vue3 的生命周期流程要求：必须使用 `createApp` 创建了vue实例，并且使用 `mount` 将实例挂载到实际DOM上，才会进行实例初始化，之后才能执行后续的钩子函数。

