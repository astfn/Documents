# Vue x 的介绍与基本使用

## 一、介绍：

#### 1. 基本介绍：

​	vuex，是一个状态管理工具，能够让组件共享管理状态。

实际上就是**存储公共变量的仓库**，在vuex中存储的变量，可供全局组件使用和更改，**更改后的数据能够实现双向绑定**。

在开发中，可能各个组件都会用到某个状态(变量)，如果两个组件之前有父子关系，就可应用父子之间的通讯、访问。

但是如果两个组件之间 没有直接关系，或者父子层级的嵌套过多，就会导致变量的传递非常复杂。

这时就可以应用vuex进行状态管理



#### 2. vuex的单一状态树：

​	在vuex中有一个概念：single source of truth （单一真理来源、单一数据源）也可以解释为单一状态树

**在vuex中，只通过一个vuex实例化类进行状态管理**。

​	在具体配置使用时，也只会默认导出一个vuex实例化类，引入挂载所导出的唯一的vuex实例化类。

## 二、配置和使用：



### 一、下载vuex

> yarn add vuex

### 二、配置vuex

	#### 1. 创建store目录，用来存放管理vuex文件
	
	>之前学习的vue-router，和当前学习的vuex，在配置完成后，都需要在main.js中进行挂载。
	>
	>也就代表vue-router、vuex都能够直接在main.js中配置，但是这样显然是不合理的。当依赖的插件很多时，就会导致main.js中的代码过于复杂。
	>
	>所以才会分别创建router、store(仓库)目录，把vue-router、vuex的相关配置放在其中，然后在main.js中引入并挂载。

#### 2. 创建store/index.js文件，配置vuex

由于vuex也是一个插件，所以配置的基本步骤和vue-router相似

 1. 引入vuex插件、vue.js

    >import Vue from "vue"
    >
    >import  store from "vuex"s

 2. Vue.use()下载

    >Vue.use(vuex) 

 3. 实例化vuex插件类并默认导出

    >export default new vuex.Store({})

 4. 在实例化类中配置vuex的options

    >export default new vuex.Store({
    >
    >state:{}，
    >
    >mutations:{},
    >
    >actions:{},
    >
    >getters:{},
    >
    >modules:{}
    >
    >})

#### 3. 在main.js中引入并**挂载store选项**

```
import store from "./store"

new Vue({ el:"#app",store })
```



### 三、使用vuex

	$store.某个option对应的Api
	
	例：
	$store.state.变量名
	$store.commit("mutations注册的方法名")





# 额外发现的问题

前面也了解过了，vuex适合存储 组件之间没有直接关系，或者父子嵌套关系过多的组件所共用的状态。

为了体现父子组件嵌套关系复杂的情况，本demo应用了两层父子组件的嵌套，使用props、$emit进行通讯

组件层级关系:

* App.vue
  * test1.vue
    * test2.vue



### 问题

---

之前学习子传父通讯,使用$emit发送的通讯事件要在**父级标签**中进行绑定，然后调用父组件中的method

但实际调用的其实是爷爷组件中的方法（可看之前的demo），因为父级组件标签需要应用在 父级的父级组件中

所以**在使用父级标签的作用域中应用的是对应作用域的data、method。即爷爷组件作用域中的data、method**



**而我只记住了通讯事件要绑定在父组件标签中（❌）**

**绑定在能够使用父组件作用域中的data、method的组件标签中（✅）**



如果按照之前的思路，在.vue文件中，只有template、script、style标签，要确定该组件，需要在父级组件中使用该组件的标签才能够绑定通讯事件。

可是由最底层test2发送通讯事件，需要test1接收，但是如果绑定在test1中，那么应用的将是App.vue作用域中的method。但是我们希望是test2传递给test1，test1传递给App.vue

其实这个问题的关键点，就是应用的到底是哪个作用域下的method。

test2标签，要在test1中使用，test1标签要在App.vue中使用。

当test2发送通讯事件时候，要传递到test1中，并且在test1中再发送通讯事件给App.vue,这就意味test2的通讯事件要执行test1中的method，**但是如果按之前的思路绑定在test1标签中，应用的就是App.vue 的作用域**。



重新理清思路：

发送的通讯事件，需要绑定父级组件中的方法。

test2标签，要在test1中使用，所以可以在test2标签中绑定test1中的方法。

（**test2标签在test1组件的作用域中**）

**那么test2的通讯事件其实就要绑定在test2标签中。**

同理test1的通讯事件，绑定在test1标签中，就可应用App.vue中的method





### 问题总结:

---

子组件发送的通讯事件，需要应用父组件中的method。

那么就**把通讯事件绑定在父级组件作用域中**，而不一定是父组件标签



---

之前之所以记住了错误用法，是因为，当时没有接触到.vue文件，在普通的js文件中，使用vue.js，需要父子组件通讯，把通讯事件绑定在父组件标签中，由于父组件存在于爷爷组件中，所以通讯事件绑定的方法，实际上是爷爷组件中的method。

