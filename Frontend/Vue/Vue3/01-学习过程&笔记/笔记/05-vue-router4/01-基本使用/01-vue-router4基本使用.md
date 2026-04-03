本文只说明了一些常用到的语法变化，其余请查阅[官方文档](https://router.vuejs.org/zh/guide/#html)

## 基本使用

在 Vue3中 vue-router（vue-router4）的基本使用过程不变，依旧要：

* 下载
* 编写相应的 js 文件，配置 router
* 入口文件引入，并挂载到 vue 实例上

只不过在具体的使用细节上发生了变化，这主要体现在两个方面：

1. Vue3 的函数式编程特点
2. CompositionAPI 中访问 router

下面让我们来梳理一下使用的过程吧👇

### 配置router

下载 vue-router 后，我们需要编写相应的 js 文件，配置router。

**Vue2.x写法**

```
import Vue from "vue"
import vueRouter from "vue-router"

Vue.use(vueRouter);

let routes = [……];
const Router = new vueRouter({
	mode: "history",
	routes,
	……
});
export default Router
```

**Vue3写法**

```
import { createRouter, createWebHistory } from "vue-router";

let routes = [……];
const Router = createRouter({
  history: createWebHistory(),
  routes,
  ……
});
export default Router
```

* Vue3将各个功能模块都单独封装成了函数。
  * 使用 `createRouter` 创建路由实例
  * 新的 `history` 属性，取代 `mode`
    - `"history"`: `createWebHistory()`
    - `"hash"`: `createWebHashHistory()`
    - `"abstract"`: `createMemoryHistory()`
* Vue3 中将全局的 API 进行了迁移，也不会默认导出 `Vue` 构造函数，不用像 Vue2.x 中使用 `Vue.use` 进行下载，而需要在入口文件通过 `app.use` 完成下载、配置的过程。👇

### 挂载到vue实例

在入口文件引入，并挂载到vue实例上。

**Vue2.x写法**

```
import Vue from "vue";
import App from "./App";

import router from "./router"; 

new Vue({
  el: "#app",
  router, //在Vue实例中挂载, 配置对应Option
  render: h => h(App)
});
```

Vue3写法

```
import { createApp } from "vue";
import router from "./router";
import App from './App.vue'

let app = createApp(App);
app.use(router);
app.mount("#app");
```

也可以

```
createApp(App).use(router).mount("#app");
```

### 组件访问路由

​	前面我们已经完成了对 vue-router 的配置和挂载，之后我们要在组件中进行访问，在 Vue2.x 中，我们只需要使用神奇的 `this` 通过 `$router/$route` 就能够完成对`路由实例`、`当前活跃路由`的访问。

​	我们知道：Vue3 中新增了 CompositionAPI，而 `setup` 是其展示的舞台，但 setup 中不能通过 this 访问组件实例，因此也就不能向 Vue2.x 一样使用 this 访问了。

​	Vue3 的一大特性就是：函数式编程。我们可以通过提供的功能函数，在 `setup` 中进行访问

* `useRouter()`：访问路由实例
* `useRoute()`：访问当前活跃路由

```
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(path) {
      router.push({
        path,
        query: {
          ...route.query,
        },
      })
    }
  },
}
```

`route` 对象是一个响应式对象，所以它的任何属性都可以被监听，但你应该**避免监听整个 `route`** 对象：

```
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const userData = ref()

    // 当参数更改时获取用户信息
    watch(
      () => route.params,
      async newParams => {
        userData.value = await fetchUser(newParams.id)
      }
    )
  },
}
```

> 请注意，在 `template` 中我们仍然可以访问 `$router` 和 `$route`，所以不需要在 `setup` 中返回 `router` 或 `route`。

### `<router-link>`的改变

在 Vue3 的 `<router-link>` 中删除了以下属性：

* event 
* tag
* append
* exact

### router-view、keep-alive、transition

`transition` 和 `keep-alive` 必须放在 `router-view` 里.

```
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

## 导航守卫

在 Vue3 中我们依旧可以配置对应的 options，在合适时机调用对应的钩子：

* `beforeRouteEnter(to,form,next)`
* `beforeRouteUpdate`
* `beforeRouteLeave`

但是：组件独享的更新和离开守卫，有对应的组合式 API 函数公开：

* 若传入了 next 参数，则必须主动调用，才可继续跳转。

```
mport { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

export default {
  setup() {
    // 与 beforeRouteLeave 相同，无法访问 `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // 取消导航并停留在同一页面上
      if (!answer) return false
    })

    const userData = ref()

    // 与 beforeRouteLeave 相同，无法访问 `this`
    onBeforeRouteUpdate(async (to, from) => {
      //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  },
}
```



