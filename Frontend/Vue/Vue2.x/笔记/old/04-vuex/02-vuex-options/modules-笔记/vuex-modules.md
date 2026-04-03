# Vuex-modules

---

## 作用

* vuex是单一状态树，即只使用一个store管理state
* 当应用变得复杂时，所有的状态都交给一个store对象，store就会变得非常臃肿
* 为了解决这个问题，vuex允许我们在modules选项中，划分其它的模块，每个模块也拥有自己的state、mutations、actions、getters、modules



**划分后的模块，最后会被添加到store.state中，将模块作为一个状态进行管理**

## modules中各个option的配置

在modules中配置的选项，与外部store相同选项的配置，个别option存在微小差异。

>* state 			（不变）
>
>* mutations	 （不变）
>
>* actions         （不变）
>
>>actions中method参数的配置是不变的，但是要注意actions中**method的第一个参数context是指向当前上下文的。**
>>
>>也就是指向当前的module的，而不是store。
>>
>>由于指向的是划分store的子模块，所以相对于store.actions.method中的context，**modules.actions.method中的context多了两个API，用于访问store中的数据。**
>>
>>（第一个参数多了两个API用于访问根store中的数据）
>>
>>共有API，访问当前上下文的option
>>
>>* state
>>* commit
>>* dispatch
>>* getters
>>
>>**多出的两个API**
>>
>>* rootGetters		//访问根模块store中的getters
>>* rootState          //访问根模块store中的state
>>
>>**访问rootStore中的actions、mutations**
>>
>>​	上面讲到，在划分的module中，actions方法的第一个参数context多了两个API用于访问rootState、rootGetters，那我们怎样在module中派遣、提交rootStore中的actions、mutations呢？
>>
>>​	我们可以在dispatch、commit时，传入第二个参数obj，并配置`root:true` ,即代表发送rootStore中的事件。
>
>* getters
>
>>modules.getters中的methods**有四个默认参数**，相对于store.getters.method也多出了2个参数。（rooteState、rootGetters）
>>
>>1. state
>>2. getters
>>3. rooteState        //访问根模块store中的state
>>4. rootGetters
>>
>>```
>>modules: {
>>  foo: {
>>    namespaced: true,
>>
>>    getters: {
>>      // 在这个模块的 getter 中，`getters` 被局部化了
>>      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
>>      someGetter (state, getters, rootState, rootGetters) {
>>        getters.someOtherGetter // -> 'foo/someOtherGetter'
>>        rootGetters.someOtherGetter // -> 'someOtherGetter'
>>      },
>>      someOtherGetter: state => { ... }
>>    },
>>
>>    actions: {
>>      // 在这个模块中， dispatch 和 commit 也被局部化了
>>      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
>>      someAction ({ dispatch, commit, getters, rootGetters }) {
>>        getters.someGetter // -> 'foo/someGetter'
>>        rootGetters.someGetter // -> 'someGetter'
>>
>>        dispatch('someOtherAction') // -> 'foo/someOtherAction'
>>        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
>>
>>        commit('someMutation') // -> 'foo/someMutation'
>>        commit('someMutation', null, { root: true }) // -> 'someMutation'
>>      },
>>      someOtherAction (ctx, payload) { ... }
>>    }
>>  }
>>}
>>```
>>
>>
>
>* modules       （不变）
>
>>一般modules只会配置一层，不会嵌套两层，因为这样会使得代码逻辑变得复杂。
>>
>>我们只需要在第一层modules中配置划分的模块即可
>
>







## modules中各个option的使用

在modules中选项的使用，与外部store相同选项的使用，个别option的使用也存在微小差异。

>* state
>
>  >$store.state. 模块名称 .变量。
>  >
>  >原因：
>  >
>  >​	划分后的模块，最后会被添加到store.state中，将模块作为一个状态进行管理
>
>* mutations     （不变）
>
>* actions         （不变）
>
>* getters         （不变）
>
>mutations、actions、getters使用方式不变，是因为：**vuex默认先从store中寻找对应的method，然后再去划分的module中寻找method。**
>
>**一般不要让 module、store中的method名称相同。** 虽然可能不会影响调用结果，但是因为模块本来就是划分出去进行区分的，取名相同也没有意义。