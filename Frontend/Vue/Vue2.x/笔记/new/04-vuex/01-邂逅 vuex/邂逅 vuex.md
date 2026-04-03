## 什么是Vuex

#### 基本介绍

vuex，是一个状态管理工具，能够让多个组件共同 `访问`、`管理` 一些状态。

实际上就是 **存储公共状态的仓库** ，在 vuex 中存储的 state ，可供全局组件使用和更改，**并且这些 state 依旧具有响应式**。

#### 应用场景

在开发中，可能各个组件都会用到某个状态(变量)，如果两个组件之前有父子关系，就可应用父子之间的通讯、访问。

但是如果两个组件之间 没有直接关系，或者父子层级的嵌套过多，就会导致变量的传递非常复杂。

这时就可以应用 vuex 进行状态管理

#### vuex 的单一状态树

​	在 vuex 中有一个概念：single source of truth （单一真理来源、单一数据源）也可以解释为单一状态树

**在 vuex 中，只通过一个 vuex实例 进行状态管理**。

​	在具体配置使用时，也只会默认导出一个 vuex实例，之后再将该实例挂载到根组件上。

## 基本使用流程

**1.下载 vuex**

```
yarn add vuex
```

**2.配置 vuex** 

* 将 vuex 的配置抽离到 store 目录中，在入口文件(index.js)中，完成基础配置

* 引入 vuex：`import Vuex from "vuex"`

* 下载 vuex：`Vue.use(Vuex)`

* 实例化 vuex ，配置 options ,并默认导出

  `export default new Vuex.Store({……options})`

**3.将 *vuex实例* 作为 *store选项* 挂载到根组件上**

```
import store from "./store"

new Vue({ 
	el:"#app",
	store,
	……
})
```

**4.访问 $store 进行各种操作**

> 之后的文章将详细讲解 vuex实例中的各种 option 的配置，以及 $store 的访问、操作。


