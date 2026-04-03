# Vuex-getters

---

简单介绍：

>vuex中的getters选项，与组件中的computed功能、使用形式相同。
>
>**使用场景**：
>	当对数据的直接展示结果不满意时，可以使用getters对state进行加工后展示。



### getters的配置：

---

​	getters是obj，元素为各个method

​	**getters中的方法，只接受两个参数：state、getters**

​	当业务逻辑处理需要外部输入参数时，需要传递参数，但是getters中的method只接受两个默认参数state、getters。我们可以return出一个function，让这个函数接收参数。

```js
 getters: {
    //getters中的method第一个参数为state
    more20user(state) {
      return state.users.filter(v => v.age >= 20);
    },

    //getters中的method第二个参数为getters对象
    more20userSum(state, getters) {
      return getters.more20user.length;
    },
    /*
        当业务逻辑需要从外部输入时候，需要传递参数，
        但是getters中的method只有两个参数：state、getters。
        我们可以return出一个function，让这个函数接收参数。
        在外部使用时只需要执行返回的函数即可,$store.getters.morefreeuser(xxx)
 		小括号执行的是return出的函数，因为getters的使用方式和computed相同，都是以属性形式调用，单纯的使用getters中的method，直接$store.getters.方法名 即可。
    */
    morefreeuser(state, getters) {
      return function(freeAge) {
        return state.users.filter(v => v.age >= freeAge);
      };
  }
```







### getters的使用：

---

> **$store.getters.方法名**





小例子：

> 筛选年龄，打印出对应的user。

store/index.js

```js
import Vue from "vue";
import store from "vuex";

Vue.use(store);

export default new store.Store({
  state: {
    users: [
      { name: "Ashun", type: "SuperVip", age: "21" },
      { name: "张三", type: "Vip", age: "20" },
      { name: "李四", type: "user", age: "19" },
      { name: "王五", type: "user", age: "18" }
    ]
  },
  getters: {
    //getters中的method第一个参数为state
    more20user(state) {
      return state.users.filter(v => v.age >= 20);
    },
    //getters中的method第二个参数为getters对象
    more20userSum(state, getters) {
      return getters.more20user.length;
    },
    morefreeuser(state, getters) {
      return function(freeAge) {
        return state.users.filter(v => v.age >= freeAge);
      };
    }
  },
  actions: {},
  modules: {}
});

```

test2.vue

```html
<input type="text" v-model="age" placeholder="请输入筛选的年龄（>=）" />
<button @click="filterAge">提交</button>
<p>{{ user }}</p>
```

```js
export default {
  name: "test2",
  data() {
    return {
      age: undefined,
      user: undefined
    };
  },
  methods: {
    filterAge() {
      this.user = this.$store.getters.morefreeuser(this.age).reduce((p, v) => {
        let current = "";
        Object.entries(v).forEach(val => (current += `${val[0]}: ${val[1]}  `));
        console.log(current);
        return (p += current);
      }, "");
    }
  }
};
//this.$store.getters.morefreeuser(this.age)  这里带（）调用的是getters方法返回的函数
```

