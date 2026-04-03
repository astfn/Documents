# vue-router的配置和使用

## 前提

该项目中要有 vue-router 插件

```
npm install vue-router --save   
```



## 配置router

##### 引入

* 引入vue-router插件
* 引入vue.js（需要使用 Vue.use() 下载使用的插件）
* 引入路由映射的组件

（注意: 有关于 vue 的文件，使用 CommonJS 无效，需要使用 **ES6的模块化规范**）

##### 下载插件

```
Vue.use(VueRouter);
```

##### 实例化 vue-router 插件类，并导出

```
export default new VueRouter({});
```

##### 在实例化类的参数对象中配置各种 option

* linkActiveClass
* mode
* routes

下面将详细讲解：

***routes***

routes 是一个 Array，各个元素为配置的路由对象，可在其中设置一些属性，完成配置。

* path：请求路径，`/` 代表根路径，在子路由中不用加 `/`
* redirect：重定向路由
* component：path 映射的 cpn
* children `Array<routeObj>`：可在其中配置各个子路由
* meta `<object>`：当前路由的元信息

```
export default new VueRouter({
  routes:[
    { path: "", redirect: "/home" },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "", //默认展示的子路由
          component: HomeChild1,
        },
        {
          path: "child2", //子路由前面不用加`/`
          component: HomeChild2,
        },
      ],
    },
    { path: "/news/:page", component: News },
  ]
});
```

***mode***

用于配置路由的模式：

* 默认为 hash 模式
* 可配置为更加美观的 history 模式

>​	vue-router 默认更改的是 url 的 hash 值，即使用 `location.hash`，但是更改 hash 值会在请求的 path 前多出一个 `#` 很不美观，也不像一个真正的 url
>  这时就可以通过配置 `mode:"history"` ,使用 h5 的 history 模式

```
export default new VueRouter({
 routes:[],
 mode:"history"
});
```

***linkActiveClass***

`linkActiveClass` 作用: 

* 给活跃的 `<router-link/>` 标签添加一个类

是 `<router-link/>` 标签中 `active-class` 属性的另一种体现形式。

二者差别:
	linkActiveClass 是在整个 VueRouter 中配置的，当某各个 router 活跃时，都会添加同一个类名，即linkActiveClass 的属性值
	`<router-link/>`标签 active-class 属性，可以为每一个 `<router-link/>` 配置不同的活跃样式类

```
export default new VueRouter({
  routes:[],
  mode:"history"
  linkActiveClass:"active"
});
```

## 路由的使用

### 挂载到根组件

将之前的路由配置导入到入口文件中，在 `根组件` 上挂载 router 选项，即可全局访问配置的路由，后续即可在各个子组件中使用。

```
import Vue from "vue";
import App from "./App";

import router from "./router"; //默认找该目录下的index.js

new Vue({
  el: "#app",
  router, //在Vue实例中挂载 路由配置
  render: h => h(App)
});
```

### 访问路由

#### router-link

可以通过 `<router-link>…<…/>` 标签，完成路由的跳转。

可以为该标签设置各种属性，进行配置：

* to ：`string|object`

  配置跳转路径、传递的信息

  ```
  to = "/PathString"
  ```

  ```
  to = {
  	path:"/PathString",
  	query:{…}	//跳转过程中可传入参数
  }
  ```

* tag ：`string`

  自定义渲染后的标签类型，默认情况下 `<router-link>`标签会被渲染为 a 标签，如果想更改默认渲染的结果，则可以配置 tag 属性。

  ```
  <router-link to="/home" tag="button" >首页</router-link>`  //会被渲染为按钮
  ```

* replace

  无属性值，代表渲染组件的时候，使用的是 history.replaceState.

  （每次渲染组件，都会替换栈顶的url，不可以前进后退）

  ```
  默认情况下使用的是history.pushState（观察浏览器左上角，跳转多次后，可以点击箭头前进后退）
  ```

* active-class：`string`

  给活跃状态的 `<router-link/>` 标签添加 class

#### $router

上文说道：可以通过 `<router-link>…<…/>` 标签，完成路由的跳转。

其实还可通过 `$router` 手动完成跳转，并且 `$router` 访问的是 **全局配置的路由对象**。

```
this.$router.replace(arg);	实现history.replaceState效果
this.$router.push(arg);		实现history.pushState效果
```

​	两种方法都接收一个参数 arg：`string|object`，其配置方法与 `<router-link>…<…/>` 标签中的 `to` 属性保持一致。

#### $route

`$route` 可以访问 **当前活跃的路由**，该对象中包含以下信息：

* query `<object>`：访问跳转到该路由时传递的参数
* params `<object>`：访问动态路由参数
* path `<string>`：当前活跃路由的路径部分
* fullPath `<string>`：当前活跃路由的完整路径
* matched `Array<routeObj>`：匹配到的路由对象
* meta `<object>`：当前活跃路由的元信息
* name：已命名的路由名称
* hash `<string>`：活跃路由的哈希部分（history模式下为空）

### 路由组件的展示

`<router-view/>`

该标签作用: 展示当前活跃路由所映射的组件

是一个占位标签，该标签在 html 中的位置，决定了路由组件渲染时候的位置。





