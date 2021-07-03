## 案例体现

这里用一个案例，来体现react的基础应用过程。

```
<div id="app">
  <h2>Hello World</h2>
  <button>click</button>
</div>
```

* 点击button按钮改变h2内容为`Hello React`

## 原生命令式编程

```
//原生实现： 命令式编程（告知计算机每一次的执行步骤）
let message = "Hello world";
let h2 = document.getElementsByTagName("h2")[0];
h2.innerHTML = message;

let button = document.querySelector("button");
button.addEventListener("click", () => {
  message = "Hello React";
  h2.innerHTML = message;
});
```

* 每次改变数据后，还要手动操作Dom，才能使得界面改变

## react开发依赖

在使用react实现之前，我们要先基本的了解一下react。

### 依赖库

应用react开发，必须依赖三个库：

```
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

* react：包含react所必须的核心代码
  * react本身核心
  * react-native
* react-dom：react渲染在不同平台所需要的核心代码。
  * web端：`jsx`->virtualDOM->转化为真实的Dom渲染在浏览器
  * native端：`jsx`->virtualDOM->转化为对应的原生控件（比如Android中的button，IOS中的UIButton）
* babel：
  * 将jsx转化为react代码的工具
  * （也可做JS语法兼容）

### 为什么使用jsx？

默认情况下，应用React开发，不需要使用jsx，因此也就不需要babel将jsx进行转化。

但是我们就需要使用 `React.createElement` 来编写，但是当元素的数量、嵌套层级很多时，这种方式非常繁琐且可读性差。

语法示例：

`React.createElement("tagName",{props},"content")`

```
let app = document.querySelector("#app");
let vdom = React.create("div",{class:"box"},"hello react");
ReactDOM.render(vdom,app);
```

当创建一个元素时，很简单，但如果涉及到元素的嵌套呢？

```
let vdom = React.create("div",{class:"box"},React.create("span",{},"hello react");
ReactDOM.render(vdom,app);
```

上面知识在div中嵌套了span，代码长度就大大增加，很显然，实际开发使用`React.createElement`是有点困难的。

所以我们可以使用 **jsx** (JavaScript XML)语法，这时就需要用到babel将jsx进行语法转化，其实最终也会将jsx转化为`React.createElement` 的形式。但这个过程不用我们来做，我们只需要使用 jsx 即可。

值得注意的是：

若要在script标签中使用jsx，必须配置 `type="text/babel"` 才能够解析jsx。

```
<script type="text/babel">……</script>
```

>经历过vue的学习，其实不难发现，jsx其实就相当于vue中的template模板。

## 声明式实现

通过上面的基本了解，我们就可以使用react完成案例了，这里先说一下实现的步骤：

1. `ReactDOM.render(jsx,element)`
2. 定义事件处理程序
   * 在其中改变变量
   * 并再次执行render

### ReactDOM.render

`ReactDOM.render(jsx,element)`，ReactDOM是react内置对象，可通过render方法，将jsx渲染到目标DOM上。

注意点：

* ReactDOM.render 渲染的是一个`代码片段`(也可以是`一个组件`，后面会学习)，最后会将jsx转化为真实的DOM，渲染到目标DOM上，而且会**覆盖掉目标DOM的原有内容**。
* jsx代码片段中，必须满足：**有且只有一个根元素**，这里跟Vue是一样的。
* 在jsx中使用`{}`完成数据的绑定，和Vue也比较类似（Vue使用mustache语法）

### 过程1

```
<body>
<!-- DOM结构 -->
	<div id="app"></div>
<!-- 所需依赖 -->
	<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
	<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
	<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- 使用react -->
	<script type="text/babel">
    //声明式编程
    let app = document.getElementById("app");
    let massage = "Hello world";
    function change() {
      massage = "Hello React!";
    }
    
    //ReactDOM.render的使用
    ReactDOM.render(
      <div>
        <h2>{massage}</h2>
        <button onClick={change}>click</button>
      </div>,
      app
    );
	</script>
</body>
```

但是当我们点击button后，h2内容并没有发生改变。

* ReactDOM.render只执行了一次，所以也只会渲染一次，当点击时间触发后，虽然数据发生了改变，但没有使用render重新触发更新
* 所以我们要将`ReactDOM.render`方法封装起来，在每次数据更新时都要进行调用，才能够看到效果

### 最终代码

```
<body>
<!-- DOM结构 -->
	<div id="app"></div>
<!-- 所需依赖 -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- 使用react -->
  <script type="text/babel">
    //声明式编程
    let app = document.getElementById("app");
    let massage = "Hello world";
    
    function change() {
      massage = "Hello React!";	//改变数据
      render();									//重新渲染
    }
    function render() {
      ReactDOM.render(
        <div>
          <h2>{massage}</h2>
          <button onClick={change}>click</button>
        </div>,
        app
      );
    }
    render();
  </script>
</body>
```

如果将上述change函数中的操作顺序颠倒，就会出现不同的效果

```
function change() {
  render();									//先触发渲染
  massage = "Hello React!";	//再改变数据
}
```

* 由于先出发渲染，再改变数据，所以第一次执行时，并不会有效果
* 再次点击时，触发渲染，这时候通过上次的执行，`massage`已经发生了改变，并且jsx中绑定了message，所以在第二次点击时才会出现预想效果。

## 思考

​	上面我们分别使用命令式编程、react声明式编程进行实现，但好像react构建过程更加麻烦。并且每次数据更新时，也不像Vue一样能够自动更新视图，还要手动调用render。

真的如此吗？

​	那是因为该案例其实并没有将react真正的优势发挥出来，案例内容简单，又需要引入react相关依赖，就显示的比较臃肿。而且后面也会学习react实际的常用方式，（不用每次数据变更都调用render，而是通过setState完成）

