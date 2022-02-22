# vue组件中的optiions

---

#### 1. el

>`el:"css选择器"`
>
>作用：通过el的值(css选择器)，将vue实例挂载到该dom上。

#### 2. template

>* `template:"html-code"  `
>
>* `template:"css选择器"`
>
>  >该用法，需要在html中创建`<template id="tpe"></template>`标签，并赋予标签属性。然后才能通过css选择器查找。
>
>作用：将vue实例的标签内容替换为template中的内容。

#### 3. data

>* `data:{ }`
>
>  >该形式应用于vue实例的options中
>
>* `data(){ return{ } }`
>
>  >该形式应用于vue-component的options中，由于原本的data是一个obj，而obj是引用类型，为了避免子组件在复用时产生数据联动，在组件中定义data时 类型为Function，return出一个obj。
>  >
>  >>数据联动:
>  >>
>  >>当子组件多次复用时，如果data的定义形式还是data:{ }，那么在复用组件中 其中一个组件中的data发生改变，则所有复用组件的对应数据也会发生改变，因为应用的是同一个data对象。

#### 4. methods

>`methods:{ method(){…} }`
>
>作用：存储各种操作数据的方法。

#### 5. computed

>计算属性
>
>* `computed:{ method(){…} }`
>
>  作用：
>
>  >computed中也是存储各种方法，这些方法与methods中的方法作用相似、但**使用形式不同、并且内部有缓存机制**
>  >
>  >* 使用形式： 
>  >
>  >  > 属性形式 `{{方法名}}`,直接通过方法名就可执行对应的计算属性方法，不需要加 ( )
>  >
>  >* 缓存机制
>  >
>  >  >当多次调用同一个计算属性method时，只有第一次是真正调用，其余结果都是在内存中缓存的。	在复用时比methods效率高。
>
>* computed:{ propName:{ get( ){ },set(val){ } } }
>
>  >该形式是computed的真实形式，各个属性值不再是function，而是obj，obj中存储get()，set(val)访问器。由于一般只需要访问数据，不需要配置set(val)访问器，所以最后简化为 属性名：( )=>{ }
>  >
>  >而属性值为函数，ES6中 又可直接写为方法的形式 属性名( ){ },即第一种形式。

#### 6. filters

>过滤器
>
>`filters:{ method(argus){…} }`
>
>作用：
>
>	>虽然和methos、computed相同，存储的都是方法，但是 **应用场景，使用形式** 与前两者都不同
>	>
>	>* 应用场景
>	>
>	>  >当对直接展示的数据不满意时 ，可以通过filters中的method(argus)**进行形式上的加工**，然后return出去进行展示，并不改变vue数据。
>	>  >
>	>  >filters.method是需要接收参数的，因为作用就是对数据进行加工，所以需要传入加工的data
>	>
>	>* 使用形式
>	>
>	>  >* 传入一个参数`<p> {{data | filterMethod}} </p>`
>	>  >* 传入多个参数`<p> {{data1,data2… | filterMethod}} </p>`

#### 7. components

>`components:{ cpn1:{ options}, cpn2:{ options}… }`
>
>作用： 注册子组件
>
>

#### 8. render

>`render(h){return h(App)}`
>
>作用:
>
>>vue的默认渲染步骤为:	保存template->(parse)AST->(compiler)render函数->virtualDom->对比、更改、渲染
>>
>>而配置render选项，则会跳过前面	template->(parse)AST->(compiler)render函数	的步骤。
>>
>>而是直接从render函数->virtualDom 开始。
>>
>>这种方式更加高效，当使用runtime-only时，会自动创建该option

#### 9. router

>`router: RouteObj`
>
>作用：将vue-router挂载到vue实例中
>
>>若要使用vue-router，则必须在vue实例中挂载。由于vue-router的相关配置比较多，所以一般都会单独抽离到./router/index.js中，然后在main.js中进行引入并挂载到vue实例中
>>
>>```js
>>import router from "./router"
>>new Vue(){
>>    el:"#app",
>>    router,
>>}
>>```

#### 10. store

>`store: VuexObj`
>
>作用：将vuex挂载到vue实例中
>
>>与vue-router同理都属于vue的插件工具，也会独立抽离出去，然后再引入挂载。
>>
>>```js
>>import store from "./store"
>>new Vue(){
>>    el:"#app",
>>    store,
>>}
>>```

#### 11. name 

>`name: ComponentName`
>
>作用：给组件标记一个名称
>
>>1. 当给 keep-alive 标签配置 include、exclude属性过滤组件时，追踪的就是组件的name属性值。
>>2. 当使用vue官方提供的浏览器插件dev-tools时，插件追踪的state更改源，显示的组件名称，就是对应配置的name