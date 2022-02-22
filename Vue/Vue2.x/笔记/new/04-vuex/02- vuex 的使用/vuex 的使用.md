通过上篇文章，我们了解到 vuex 的基本使用流程。

但并没有讲解详细的 vuex 配置过程，以及 store 的访问、操作。

本文将详细讲解 vuex 的使用。

## options

### state

state 选项用于存储各种状态，是 vuex 的单一数据源。

之所以称为 `单一数据源` ，是因为 vuex 共享的所有数据，都集中的放在 state 选项中进行存储。也可称为单一状态树。

即便配置 modules 选项，给整个 store 划分为一些子模块，子模块中的 state 最终也会被放置于根 store 中，通过访问形式就可得知：`$store.state.moduleName.xxx`。（modules 选项详见后文）

#### 配置

state 属性的值，就是整个 vuex 存储的数据来源，通常将其设置为 `object` ，从而存储多种数据。

#### 使用

*state 的访问*

* 通过 `$store.state` 访问根级 store 对象。

*state 的修改*

* 🚫 直接赋值
* ⭐ 通过提交 `mutation` 事件，更新 state

直接赋值：

* 虽然可通过 `$store.state.propName = xxx` 直接赋值的形式，变更 state。
* 但这种方式很不安全，因为这种状态变更不会被追踪（详见后文 Vue.js devtools）。

可以通过提交 `mutation` 事件，更新 state，该方式导致的状态变更可以被追踪到。

### mutations

mutations 选项是一个对象，可在其中配置各种方法。

后续可以在 `组件`、`actions` 中提交这些方法，实现状态的更新。

#### 配置

```
mutations:{
	mutationFunc(state,payload){……},
	……
}
```

mutationFunc 参数：

1. state：用于访问当前层级 store 中的 state。
2. payload：提交事件时，所传入的参数

#### 使用

通过提交对应的 mutation 方法名称，vuex 内部将自动执行对应的 mutation 方法。

可在提交 mutation 时，传入参数。

```
$store.commit("mutationFuncName",payload)
```

规范传参：

​	如果在提交事件时，传入了多个参数，则在 mutationFunc 中，也可以正常接收：（不推荐）

```
//配置对应的 mutation 时
mutations:{
	updateInfo(state,name,age){
		state.name = name;
		state.age = age;
	},
	……
}

//提交时
$store.commit("updateInfo","Ashun",18)
```

​	但不推荐上文这种接收形式，**为了保持 mutation 方法格式的统一**，需要传递多个参数时，可以将这些参数统一的放入一个对象中进行传递。后续就可通过一个 payload 参数进行接收。

```
//配置对应的 mutation 时
mutations:{
	updateInfo(state,payload){
		const { name, age } = payload;
		state.name = name;
		state.age = age;
	},
	……
}

//提交时
$store.commit("updateInfo",{ name:"Ashun", age: 18});
```

#### 注意点

**mutation 必须是同步函数**

​	mutation 用于处理同步代码，也因此才能够被 Vue.js devtools 追踪。

​	因为如果 mutation 中的状态变更是异步执行的，则 Vue.js devtools 将不能准确得知函数的回调时机，也就追踪不了这种状态的更新了。

如果你想处理一些异步业务，可以放在 actions 中👇。

### actions

actions 选项是一个对象，可在其中配置各种方法。

后续在组件中可以派遣这些方法。

#### 配置

```
actions:{
	actionFunc(context,payload){……},
	……
}
```

context 代表当前 store 的上下文对象。

因此可以访问 store 对象的各种 属性、方法。（相当于组件中的 $store）

```
context.state.xxx	//访问 state 选项中的状态
context.commit(…)	//提交 mutation 事件
context.getters.getterFunc //访问 getters 中的方法
```

#### 使用

通过派遣对应的 action 方法名称，vuex 内部将自动执行对应的 action 方法。当然，也可以传递参数。

```
$store.dispatch("actionFunc",payload)
```

#### 应用场景

***处理异步操作：***

​	上文我们讲到：mutation 用于处理同步业务。而异步操作，可以放到 actions 中。

​	例如：发送网络请求，接收到数据后，再通过 context 提交 mutation 事件，更新对应的 state。

***复杂的状态变更逻辑：***

​	有时，虽然业务是同步的，但这些操作比较复杂，我们也可以将这些复杂的操作，放在 actions 中。

​	例如：根据 payload 携带的信息，可能要经过一些判断，针对不同的情况，commit 不同的 mutation，从而更新对应的 state。

### getters

getters 选项是一个对象，可在其中配置各种方法。

可以将 getters 中的方法理解为：**应用在 store 中的计算属性**。

* 如果某些 state 在获取时，不希望原样展示，而是想要以其它的方式呈现，就可以把这些操作封装在 getters 中

#### 配置

```
getters:{
	getterFunc(state,getters){……},
	……
}
```

getterFunc 参数：

1. state：用于访问当前层级 store 中的 state 选项。
2. getters：用于访问当前层级的 getters 对象，因此可以调用其它的 getter 方法

#### 使用

**默认方式**

开头说道：可以将 getters 中的方法理解为 **应用在 store 中的计算属性**。

因此，可以直接使用 **属性访问形式**，当我们直接通过属性名访问时，内部自动调用对应的 getter 方法。

```
$store.getters.getterFuncName
```

**传递参数**

​	如果想要传递参数，可以在配置 getterFunc 时，多嵌套一层函数，让内层函数接收 payload。

​	这样后续在访问 getterFunc 时，就可以加上 `()`，即函数调用的形式，再将实参传入即可。

```
//配置时
getters:{
	getName(state,getters){
		return (payload)=>{
			let name = state.name;
			return payload.isUpper ? name.toUpperCase() : name;
		}
	},
	……
}
//访问时
$store.getters.getName({isUpper:true});
```

### modules

modules 选项是一个对象，可在其中配置各种 store 的子模块。

用于将 store 划分为多个子模块。

#### 配置

* 属性名：该模块的名称
* 属性值： 子级 store 对象，也可在其中配置各种 option。

```
modules:{
	moduleName:{...storeOptions},
	……
}
```

子模块 store 的配置，与根级 store 非常相似。

只是某些 option 在配置时，新增了一些 参数、API ，用于访问根级别 store 中的数据。

这些改变存在于 `actions`、`getters` 中，其余 option 配置形式不变。

***子模块中的 actions***

actionFunc 中的 context 参数新增两个 API

* context.rootState：访问根级 state
* context.rootGetters：访问根级 getters

***子模块中的 getters***

​	gettersFunc 新增两个参数：rootState、rootGetters

#### 使用

访问子模块 store 中的各种 option，与根级 store 的访问形式相比，也只是 `state` 的访问形式不同。

* state：`$store.state.moduleName.prop`
* mutations（不变）
* actions    （不变）
* getters    （不变）

**解析：**

state选项：

​	通过访问形式可知：子模块的 state，最后也会被添加到根级 state 中, 只是将模块作为一个子状态进行管理

其他选项：

​	mutations、actions、getters 使用方式不变，是因为：**vuex 默认先从根级 store 中寻找对应的 method，然后再去子模块中寻找 method。**

​	**一般不要让 子模块、根级store 中的 method 名称相同。** 虽然可能不会影响调用结果，但是因为模块本来就是划分出去进行区分的，取名相同也没有意义。

## 辅助函数

### 作用

* vuex 为一些 option 的访问，提供了对应的辅助函数（除了modules选项）
* 能够让这些选项，在 vue 组件中更方便的访问和使用。

### 使用方式

1.首先要引入对应的辅助函数。

```
import {
  mapState,			//映射 state
  mapGetters,		//映射 getters
  mapMutations,	//映射 mutations
  mapActions,		//映射 actions
} from "vuex";
```

2.将辅助函数合理配置到组件中

配置的位置：

* `mapState`、`mapGetters`
  * 由于访问的形式为 prop 形式，所以映射到组件的`computed`选项中
* `mapMutations`、`mapActions`
  * 访问的形式为 method 形式，所以映射到组件的`methods`选项中

配置的语法：

* 直接映射 `Array<stateName>`

  ```
  //普通方式
  computed: mapState(["site","recommends"])
  
  //解构语法
  computed: {
    ...mapState(["site","recommends"]),
  }
  
  /*
  	将 $store.state 中的 site 映射为 this.site
  	将 $store.state 中的 recommends 映射为 this.recommends
  */
  
  /* 其余辅助函数用法同理 */
  ```

* 另起别名 `{alias:stateName,…}`

  ```
  //普通方式
  computed: mapState({
    getSite: "site",
    getRecommends: "recommends",
  })
  
  //解构语法
  computed: {
    ...mapState({
      getSite: "site",
      getRecommends: "recommends",
    }),
  }
  
  /*
  	将 $store.state 中的 site 映射为 this.getSite
  	将 $store.state 中的 recommends 映射为 this.getRecommends
  */
  
  /* 其余辅助函数用法同理 */
  ```

## 规范使用

### Vue.js devtools

#### 作用

Vue.js devtools 是 Vue 官方提供的浏览器插件，可以让 vuex 的状态管理成为可预测的。

<img src="vuex 的使用.assets/001.png" alt="001" style="zoom:50%;" />

Vue.js devtools 能够侦听 mutation 事件导致的状态变更

* 因此我们应该避免直接给 state 赋值，这会导致状态变更不可预测。

  （因为此时我们不知道这次状态变更是由谁发起的）

#### 下载和使用

<img src="vuex 的使用.assets/002.png" alt="002" style="zoom:50%;" />

<img src="vuex 的使用.assets/003.png" alt="003" style="zoom:50%;" />

<img src="vuex 的使用.assets/004.png" alt="004" />



### 合理组织代码结构

​	store 目录，是专门用来配置 vuex 的，但是之前所有的操作都是在store/index.js 中进行配置的。

​	实际开发时 state、mutations、actions、getters、modules。这些配置会很多，如果都在 index.js 里面，则会变得非常臃肿不易管理。

此时就需要合理的组织目录结构，需要进行如下操作：

* 将各个 options 抽离到单独的文件中
* 将事件名称抽离到 mutation-types.js 中

***抽离 options***

* 能够让代码结构更加清晰，易于维护。

***将事件名称抽离到 mutation-types.js 中***

* 让代码结构更加清晰
* 还可防止误写事件名称导致的报错
* 更方便的修改事件名称

前期将事件名称作为常量，抽离到 mutation-types.js 中。后期使用时，再将这些事件名称常量导入。

可以防止误写事件名称导致的报错。还可更加方便的更改某个事件名称，因为此时，所有文件导入的 事件名称 都来源于 mutation-types.js 中，因此直接更改对应的 事件名称常量 即可，而不用到各个引入该常量的文件中依次修改。

