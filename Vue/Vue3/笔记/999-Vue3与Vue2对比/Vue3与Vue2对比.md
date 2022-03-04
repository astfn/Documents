# 响应式的实现

## vue2.x的响应式

* 实现原理：
  * 对象类型：通过`Object.defineProperty()`对属性的访问、更改进行拦截（数据劫持）
  * 数组类型：通过二次封装原生Array的方法，实现改变数组时，触发更新机制。
    * push、pop、unshift、shift、sort、reverse、splice
* 存在问题：
  * 直接新增、删除属性，不会触发更新
  * 直接通过索引修改数组，也不会触发更新
* 解决：
  * 可以使用`Vue.set/delete`、`this.$set/$delete`解决。
  * 对于Array来说，不仅可以使用上述API解决，还可以使用Vue内部二次封装的方法，实现对Array的操作。

## vue3的响应式

* 实现原理：
  * 使用 `Proxy` 对数据进行代理拦截
  * 结合 `Reflect` 对被代理对象的属性进行实际操作

### Proxy

关于`Proxy`的基础知识这里不再赘述，可以看我的个人的博客文章，这里主要讲解与`Object.defineProperty`的对比，有什么优势，为什么要使用`Proxy`。

**代理的数据类型更加广泛，且能够侦听对属性的: 增删改查**

* 之前我们也了解过了`Object.defineProperty`,通过设置`getter`、`setter`，实现对象属性的拦截。
* 虽然还可设置其它的属性特征描述(`enumerable`、`configurable`)，但最终只能实现对属性`改`、`查`操作的拦截，因此Vue2.x中不能直接新增、删除属性。

* 但 `Proxy` 就不同了，通过3个配置项就可完成对代理对象属性`增删改查`的操作拦截。并且`Proxy`可以代理任何类型的对象，包括原生数组，函数，甚至另一个代理。

实例测试：

```
obj = {
  name: "Ashun",
  age: 18,
};
let p = new Proxy(obj, {
  get(target, prop) {
    console.log("调用了getter");
    console.log(target);
    return Reflect.get(target, prop);
  },
  set(target, prop, newVal) {
    console.log("调用了setter");
    let result = Reflect.set(target, prop, newVal);
    console.log(target);
    return result;
  },
  deleteProperty(target, prop) {
    console.log("调用了deleteProperty");
    let result = Reflect.deleteProperty(target, prop);
    console.log(target);
    return result;
  },
});
p.name; //getter
p.name = "SHUN"; //setter
p.title = "Ashuntefannao"; //setter
delete p.title; //deleteProperty
```

### Reflect

通过上文示例代码可发现，`Proxy`中对属性的实际操作应用了`Reflect`，这里讲解一下`Reflect`

* **Reflect** 是一个内置的对象，它映射了JavaScript内置类：Object、Function的一些方法。在使用上又与原方法有一些不同，通常会返回Boolean代表操作是否成功
* 它能够使我们的代码更加简洁、规范，与`Proxy`一同发布，所以通常二者结合进行使用

既然Reflect中的静态方法都是映射原有存在的方法，那为什么要使用它呢？上面也说了，它能够让我们的代码更加简洁、规范。下面举一个例子：

若使用`Object.defineProperty`去重新定义已经存在的属性，则会抛出错误，导致后续代码不能够正常执行

* `Object.defineProperty`当操作成功时，返回原对象

```
 obj = {
  name: "Ashun",
  age: 18,
};

let result = Object.defineProperty(obj, "title", {
  value: "Ashuntefannao",
});
console.log(result);
Object.defineProperty(obj, "title", {
  value: "Ashuntefannao--Ashun",
});
console.log(obj);
```

使用`Reflect`，则不会抛出异常，`Reflect.defineProperty`返回`Boolean`,代表是否操作成功。

测试代码：只要将上述的`Object`替换为`Reflect`即可。

* 有的人可能说,`Object.defineProperty`虽然会抛出异常，但我使用`try/catch`对异常进行处理不就行了嘛？

  但实现步骤繁多不说，还会让代码结构更加臃肿，为什么不使用更加符合规范的`Reflect`呢？

# 生命周期

在Vue3中，对生命周期钩子做了一些微调，与Vue2.x存在差异，下面我们来总结一下Vue3生命周期对比Vue2.x有哪些不同。

## 更改部分

- Vue3.0中可继续沿用Vue2.x中的大部分生命周期钩子，但有两个被更名：

  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`

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

  setup中没有对应`beforeCreate/created`的部分，因为`setup`会在二者**之前**进行调用，所以这里直接使用setup进行替换。

## 调用顺序

​	上面介绍到：Vue3中既可以像Vue2.x一样将生命周期钩子作为option进行配置，也可以在CompositionAPI中进行配置。

​	那如果我既在options中配置了钩子，又在CompositionAPI中配置了钩子，二者调用顺序如何？

**CompositionAPI钩子 优先于 options钩子**

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

<img src="../../笔记/03-生命周期/Vue3的生命周期.assets/vue2.png" alt="vue2" style="zoom:45%;" />

Vue3生命周期流程图：

<img src="../../笔记/03-生命周期/Vue3的生命周期.assets/vue3.svg" alt="vue3"/>

Vue3的生命周期流程相对于Vue2.x在某种程度上更加`‘机智’`了：

​	我们知道，在Vue2.x的生命周期流程中，只要使用`new Vue()`创建了vue实例，不论是否调用了`$mount`进行挂载，都会优先进行vue实例的初始化，调用`beforeCreate/created`两个钩子。

​	如果一些Vue实例未被挂载，证明这些组件是无用的，因为最终不会被挂载到页面上，但在Vue2.x中，还是会进行实例的初始化和钩子的调用。

​	而Vue3的生命周期流程要求：必须使用`createApp`创建了vue实例，并且使用`mount`将实例挂载到实际DOM上，才会进行实例初始化，之后才能执行后续的钩子函数。

# 新的组件

## Fragment

`Fragment`是Vue内部创建的一个组件，不用我们手动定义，用于解决Vue2的组件中必须有一个`rootElement`的问题

- 在Vue2中: 组件必须有一个根元素
- 在Vue3中: 组件可以没有根元素, 内部会将多个标签包含在一个`Fragment`**虚拟元素**中
- 好处: 减少标签层级, 减小内存占用

## Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

## Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

# 













# 一些移除项

## 事件侦听

* Vue3的实例中完全移除了 `$on`、`$off` 和 `$once` 方法。
* 通过Vue3的`createApp`创建实例，打印结果也可看到，移除了上述API
* `$emit` 仍然包含于现有的 API 中，因为它用于触发由父组件声明式添加的事件处理函数。

Event bus 模式被替换为实现了事件触发器接口的外部库，例如 [mitt](https://github.com/developit/mitt) 或 [tiny-emitter](https://github.com/scottcorgan/tiny-emitter)。
