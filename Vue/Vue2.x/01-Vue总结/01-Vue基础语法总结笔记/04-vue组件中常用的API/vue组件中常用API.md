# vue组件中常用的API

---

**vue实例也是组件，这里单独列举的vue实例方法，是一般只在vue实例中使用的方法。用vm代表vue实例**



### 组件之前的通讯

---

#### 1. $emit

>子传父，子组件向父组件发送自定义事件。
>
>$emit("EventName",...argus)
>
>然后在能够使用父组件作用域中method的标签中绑定该事件。



### 组件之间的访问

---

#### 2. $children

>$chidlren[index]	是一个Array 元素为各个子组件。
>
>只有子组件tag在父组件中使用，才会存储到$chidlren中，子组件tag在父组件的使用顺序，决定了$children中的存储顺序。
>
>由于该方式不容易获取到目标子组件，所以一般会使用$refs👇

#### 3. $refs

>$refs.ref属性值是一个obj，每个属性值存储使用ref标记的子组件。
>
>该方式，能够准确追踪到目标子组件。
>
>需要在对应的子组件标签中使用ref属性进行标记，ref的属性值，会作为$refs的prop，存贮对应标记的子组件。

#### 4. $parent

>$parent		
>
>vue组件是一个tree结构，一个组件只有一个确定的父组件。当然，相同的子组件可以在不同父组件中注册，但这相当于子组件的复用，各个子组件所访问的父组件互不干涉。
>
>该API在使用时返回的就是父组件obj，可以通过$parent.data属性名 访问父组件中的data。也可通过$parent.其它组件API	访问父组件中的其它数据。

#### 5. $root

>$root
>
>该API返回的是根组件，即vue实例。也可通过$root.API进行数据访问。



### vue-router相关

---

#### 1. $router

>$router	 **获取的是vue-router对象。用来管理路由的跳转。**（router 实例）
>
>常用方法：
>
>* 路由跳转
>   * $router.push('/path' | {path:"",query:{ }} )
>   * $router.replace('/path' | {path:"",query:{ }} )
>   * router.go(n)
>   * router.back()
>
>  
>

#### 2. $route

>$route	   **监听当前活跃的路由，用于接收活跃路由传递的参数。**
>
>当前激活的路由信息对象。这个属性是只读的，里面的属性是 immutable（不可变） 的，不过可以 watch（监测变化） 它
>
>常用方法：
>
>
>
> * 获取跳转的路径
>    * $router.path
>
>* 获取动态路由path
>   * $route.params.动态路由变量名
>* 获取传递的查询参数
>   * $route.query.属性



### vuex相关

---

#### 1. $store

>$store	   **获取vuex对象，进行状态管理**
>
>常用方法：
>
>| API                                     | 作用                                         |
>| --------------------------------------- | -------------------------------------------- |
>| $store.state.属性                       | 获取store.state变量                          |
>| $store.state.ModuleName.属性            | 获取划分模块中的state变量                    |
>| $store.commit("mutationsEvent",payload) | 提交mutations同步操作事件，并可以传入payload |
>| $store.dispatch("actionsEvent",payload) | 派遣actions异步操作事件，并可以传入payload   |
>| $store.getters.gettersEvent             | 使用getters事件。                            |
>
>



### 数据访问

---

#### 1. $data

>$data		返回的就是当前组件的data对象。

#### 2. $options

>$options 	返回一个对象，存储该组件的各个option



### Dom访问、监听改变

---

#### 1. $el

>访问当前组件挂载的DOM
>

#### 2. $nextTict

>`$nectTick(()=>{})`
>
>在下次 DOM 更新循环结束之后执行回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。



### vue实例

#### vue**实例**Dom方法

---

#### 1. $appendTo

>- `$appendTo(elementOrSelector, callback)`：将`el`所指的`DOM`元素插入目标元素

#### 2. $before

>- `$before(elementOrSelector, callback)`：将`el`所指的`DOM`元素或片段插入目标元素之前

#### 3. $after

>- `$after(elementOrSelector, callback)`：将`el`所指的`DOM`元素或片段插入目标元素之后

#### 4. $remove

>- `$remove(callback)`：将`el`所指的`DOM`元素或片段从`DOM`中删除



#### vue**实例**Event方法

---

#### 监听

#### 1.$on

>`vm.$on("emit事件名",(...argu)=>{ })`
>
>>监听vue实例中$emit发送的自定义事件，在自定义事件执行后回调，能够接受自定义事件的所有参数。

#### 2. $once

>作用同$on,不同的是：只执行一次回调。

#### 3. $off

>`$off("$emit事件",(...argu)=>{ })`
>
>关闭自定义事件事件监听器$once,$on，参数与二者相同。
>
>- 如果没有提供参数，则移除所有的事件监听器；
>- 如果只提供了事件，则移除该事件所有的监听器；
>- 如果同时提供了事件与对应的回调函数(把函数定义为一个变量传入)，则只移除这个回调的监听器。

#### 4. $watch

>`vm.$wacth("data变量"，(newVal,oldVal)=>{ })`
>
>监听vue实例某个data的改变，在改变后进行回调。
>
>* 第一个参数
>
>  data变量为普通值类型，则直接写属性名即可
>
>  data变量为obj | Array，要监听其中某个元素的改变，则 填写obj.prop、arr[index]
>
>* 第二个参数
>
>  回调函数，参数为新旧数据。
>
>



#### 触发

#### 1.  $broadcast

>

#### 



