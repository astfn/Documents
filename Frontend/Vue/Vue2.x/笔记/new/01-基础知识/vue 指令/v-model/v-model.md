## 作用

v-model="propName"

作用：

1. 实现表单元素数据的双向绑定
2. 实现父子组件数据的双向绑定

## 用法

### 应用于表单

常见的表单元素：

* text、password、等文本类 input，一般都是绑定 String，记录选择项的 value。

radio：

* 绑定的 state 类型应为 String，记录选择项的 value

checkbox：

 * 单选时，绑定的 state 类型应为 Boolean，记录是否选择了该选项。
 * 多选时，绑定的 state 类型应为 Array，记录选择项的 value 们

select：

* 单选时，绑定的 state 类型应为 String，记录选择项的 value

 * 多选时（给select标签加上multiple属性），绑定的 state 类型应为 Array，记录选择项的 value 们

### 应用于组件

#### **需求场景**

我们希望某对儿父子组件能够共享一些 state ，并且 state 变更时，双方都能获取最新的 state。

你会立刻想到最通用的方案（父子组件的通讯）：

* 父组件将 state 绑定到子组件标签上
* 子组件通过 props 接收
* 子组件通过某些事件改变 state 时，使用 $emit 告知父组件，从而更新 state。

但也有更简便的方法：将 `v-model` 应用于组件，实现组件之间数据的双向绑定👇

#### **使用方法**

将 `v-model` 应用于组件，有两种使用方式：

1. 利用 v-model 的默认行为
2. 自定义 v-model 绑定的 state 名称，以及侦听的事件名称

##### **v-model 的默认行为**

我们知道：将 v-model 应用于 `普通的表单元素` 时，实际上等于 `:value = stateName` +  `@input` 。

如果将 `v-model="stateName"` 应用于组件，默认状况下依然如此：

* 会将 `stateName` 对应的 state，别名为 `value`，传递到组件中
* 自动侦听 `input` 事件，并更新 state

*案例体验：*

```
<div id="app">
  <h3>
    This is the app node, which is the element for mounting Vue instances
  </h3>
  <strong>{{check}}</strong>
  <cpn1 v-model="check"></cpn1>
  <!-- <cpn1 :value="check" @input="newVal=>check=newVal"></cpn1> -->
</div>

<template id="tmpCPN1">
  <div class="tmpCPN1">
    <h4>this is cpn1</h4>
    <input type="checkbox" :checked="value" />
    <button @click="toggle">toggle</button>
  </div>
</template>
```

```
<script>
  //子组件
  let cpn1 = {
    data() {
      return {};
    },
    template: `#tmpCPN1`,
    props: {
      value: Boolean,
    },
    methods: {
      toggle() {
        this.$emit("input", !this.value);
      },
    },
  };

  //父组件
  new Vue({
    el: "#app",
    data: {
      check: true,
    },
    components: {
      cpn1,
    },
    updated() {
      console.log(this.check);
    },
  });
</script>
```

##### **自定义 v-model 绑定的 state 名称，以及侦听的事件名称**

阅读完上文，发现 v-model 应用于组件还是非常不错的，但隐约感觉有些别扭，比如：

* 子组件需要接收名称为 `value` 的 props
* 发射的事件名称为 `input`

因为我们将 v-model 应用到了组件上，而不是表单元素，因此这些名称会起到误导作用。

但 `尤大` 已经考虑好了，我们可以自定义这些名称，用法如下：

* 给子组件配置 model 选项
  * prop 属性：设置所接受的父组件 state 别名
  * event 属性：设置 v-model 侦听的事件名称

*案例体验*

```
<div id="app">
  <h3>
    This is the app node, which is the element for mounting Vue instances
  </h3>
  <strong>{{check}}</strong>
  <!-- 侦听自定义的事件名称 -->
  <cpn1 v-model="check" @change_select="changeCheck"></cpn1>
</div>

<template id="tmpCPN1">
  <div class="tmpCPN1">
    <h4>this is cpn1</h4>
    <input type="checkbox" :checked="isSelect" />
    <button @click="toggle">toggle</button>
  </div>
</template>
```

```
<script>
  //子组件
  let cpn1 = {
    data() {
      return {};
    },
    template: `#tmpCPN1`,
    model: {
      prop: "isSelect",				//设置所接受的父组件 state 别名
      event: "change_select",	//设置 v-model 侦听的事件名称
    },
    props: {
      isSelect: Boolean,			//在 props 中接收对应名称的 state
    },
    methods: {
      toggle() {
        this.$emit("change_select", !this.isSelect); //发射对应名称的事件
      },
    },
  };

  //父组件
  new Vue({
    el: "#app",
    data: {
      check: true,
    },
    components: {
      cpn1,
    },
    updated() {
      console.log(this.check);
    },
    methods: {
      changeCheck(newCheck) {
        this.check = newCheck;
      },
    },
  });
</script>
```

