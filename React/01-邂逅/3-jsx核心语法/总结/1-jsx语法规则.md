前面我们介绍了react最基础的使用过程，并且解释了为什么不使用`React.createElement`，而是使用语法糖`jsx`。本文就详细介绍一下`jsx`的语法规则。

## JSX是什么

前面我们介绍了`jsx`是`React.createElement`语法糖，但实际上`jsx`也是一个表达式，在编译后，JSX表达式会变成JavaScript对象，通过打印也能够看到是`Object`。

* 可以在 if 语句或 for循环中使用JSX
* 可以将它赋值给变量
* 可以将它作为参数接收，可以在函数中返回JSX。

```
let params=["Ashun","Ashuntefannao"];
let vdom=(
    <ul>
    	{ params.map((v,key)=><li key={key}>{v}</li>) }
    </ul>
);
console.log(vdom);
console.log(vdom instanceof Object); //true
```

>并且JSX是安全的，官方文档也有相关说明：
>
>你可以安全地在 JSX 当中插入用户输入内容：
>
>React DOM 在渲染所有输入内容之前，**默认会进行转义**。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（跨站脚本）攻击。

## 基本要求

使用 jsx 有一些基本的要求：

1. jsx整体不能使用引号包裹，其不是一个String
2. 有且仅有一个根元素
3. 无论单双标签，必须闭合
4. 填写的标签元素必须是原生存在的html标签，或者自定义组件标签。
   * **自定义组件标签，首字母要大写**，react也就是根据首字母是否大写来判断是否应用自定义组件。

## 注释

上文说到：`jsx`也是一个表达式，所以在其中不能够直接编写JavaScript注释，因为会直接作为内容进行展示。

* 我们也要将注释部分作为JavaScript语法，插入到`{}`中。

```
render(){
	return(
		<div>
      {/* 我是一段注释 */}
      <h2>Hello React</h2>
    </div>
	)
}
```

## 插入变量

第一篇文章就已经讲解了，在jsx中若要插入变量，需要应用`{}`包裹，但还是有一些注意点的。

**在`{}`中我们可以插入：变量、表达式、函数的执行。**

关于插入变量：

1. 当变量类型为Number、String时，保持原样显示

2. 类型为Array时，

   显示结果相当于`arr.join().replace(",",'')`或`arr.join("")`

3. 类型为null、undefined、Boolean时，内容为空
   * 若希望原样展示，可以将其转化为String，再传入`{}`中

4. 不能传入对象，否则会报错。（但标签的style属性可以传入对象形式。）

## this指向问题

上面我们讲到：在`{}`中可以插入：变量、表达式，以及**函数的执行**。

在函数执行时，就会遇到this指向的问题，之后围绕以下代码进行阐述：

```
<script type="text/babel">
  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        message: ["张三", "李四"],
      };
    }
    render() {
      return (
        <div>
          <h2 style={{ color: "white", backgroundColor: "black" }}>
            {this.state.message}
          </h2>
          <button onClick={this.changeMessage}>click</button>
        </div>
      );
    }
    changeMessage() {
      this.setState({
        message: ["Ashun", "tefannao"],
      });
    }
  }
  let app = document.querySelector("#app");
  ReactDOM.render(<App />, app);
</script>
```

上述代码如果你认为是正确的，那就大错特错了，如果点击了button，执行`changeMessage`方法会报错：`Cannot set property 'setState' of undefined`，告知setState未定义。

这里就涉及到了一个this指向的问题：

​	虽然在jsx中为button绑定了类中的方法，但是jsx结构最终会渲染到页面上，也就是说该方法终后会在外部调用，而不是被实例调用，因此也就访问不到message属性。

​	而class中默认是`strict`模式，为了避免污染`window`，当this指向`window`时，会自动将其设置为`undefined`。这里关于class的其它特性不再赘述，可看我之前写过的文章。

**解决方法有三种**：

1. 在具体代码中进行this的绑定

```
<button onClick={this.changeMessage.bind(this)}>click</button>
```

但如果其他多个元素也都绑定这个事件呢？那就要依次进行this的绑定，显然很麻烦。

2. 在constructor中提前绑定好

```
constructor(){
  super();
  this.changeMessage = this.changeMessage.bind(this);
}
```

就能够解决方法一的缺陷，但如果事件较多，还是会出现大量关于this绑定的代码

3. 在定义方法时，使用箭头函数

将`changeMessage`定义为箭头函数，箭头函数本身`没有this`，那就意味着：箭头函数中的this，指向当前的父级作用域，并且**this是在箭头函数声明时进行确定的**，所以后期调用时，也就不用进行`bind`了。

```
changeMessage = ()=>{
  ……
}
```

### 推荐做法

⭐但我更推荐的方法是，**直接在jsx中传入一个箭头函数**。为什么这么做呢？

1. 让方法在定义时，形式不会改变
2. 更加的灵活：
   * 在传入的箭头函数中可执行`目标方法`以及`其它代码`
   * 传入参数时更加的方便(event对象)。下文具体讲解

```
//jsx
<button onClick={(e)=>{ this.changeMessage();… }}>click</button>
//方法定义的形式不变
changeMessage (){ ……}
```

## event对象的传入

我们通过一段代码进行分析：

```
<script type="text/babel">
  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        message: ["张三", "李四"],
      };
    }
    render() {
      return (
        <div>
          <h2 style={{ color: "white", backgroundColor: "black" }}>
            {this.state.message}
          </h2>
          {/*默认传入event*/}
          <button onClick={this.changeMessage}>click</button>
          {/*循环展示列表，点击打印event对象*/}
          <ul>
            {this.state.message.map((v, key) => (
              <li
                onClick={(e) => {
                  this.showList(v, e);
                }}
                key={key}
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    changeMessage = (e) => {
      this.setState({
        message: ["Ashun", "tefannao"],
      });
      console.log("默认传入event", e);
    };
    showList(value, event) {
      console.log(value, event);
    }
  }

  let app = document.querySelector("#app");
  ReactDOM.render(<App />, app);
</script>
```

1. **非直接调用方法，能够默认传递event对象**

对应代码片段：

```
//jsx
  {/*默认传入event*/}
  <button onClick={this.changeMessage}>click</button>
  
//方法的定义
changeMessage = (e) => {
  this.setState({
    message: ["Ashun", "tefannao"],
  });
  console.log("默认传入event", e);
};
```

2. **手动调用方法，也需要手动将event传入。**

对应代码片段：

```
//jsx
{/*循环展示列表，点击打印event对象*/}
  <ul>
    {this.state.message.map((value, key) => (
      <li
        onClick={(e) => {
          this.showList(value, e);
        }}
        key={key}
      >
        {value}
      </li>
    ))}
  </ul>
  
//方法的定义
showList(value, event) {
  console.log(value, event);
}
```

这也是上文中，推荐直接在`{}`中插入箭头函数的原因，不仅能够解决this指向的问题，还能够在传入event对象的同时，传入其他参数。

### 其他情况

上面我们讲到，**非直接调用方法，能够默认传递event对象**，那如果我既想使用该形式，又要在传入event的同时，传入其它参数呢？

**错误示范**

传入`event`关键字

```
//jsx
  {/*默认传入event*/}
  <button onClick={this.changeMessage.bind(this, "Ashun", event)}>
  
//方法的定义
changeMessage(value, e) {
  this.setState({
    message: ["Ashun", "tefannao"],
  });
  console.log(value, e.target);
}
```

我们知道，当在`{}`中插入的如果不是String，则会寻找相应的变量，这时如果我们将`event`关键字进行传入，会发生什么结果？

```
//打印结果
Ashun #document
```

此时获取到的是`document`对象。如果传入其它名称的变量，如果未定义则还会报错，但传入event又获取不到正确结果。

**正确做法**

不要手动传入event，方法在参数接收时，在末尾预留一个参数，event将会自动传入

```
//jsx
  {/*默认传入event*/}
  <button onClick={this.changeMessage.bind(this, "Ashun")}>
  
//方法的定义
changeMessage(value, e) {
  this.setState({
    message: ["Ashun", "tefannao"],
  });
  console.log(value, e.target);
}
```

```
//打印结果正确
Ashun <button>click</button>
```

## 标签属性

### 关于属性名称的定义：

1. 驼峰式命名

2. 若要定义原生的**class属性**，则要改为**className**。

   因为前面也说到了，jsx本质也是一个js表达式，而如果在其中使用了class关键字，会与ES6中的class类相冲突，为了避免这个问题，我们需要将class属性定义为className

### 关于属性值的定义:

* 属性值可以定为常量，也就是普通的String形式
* 也可使用`{}`插入变量、表达式、函数执行

**style**

但这里在使用`{}`插入变量时，有一个特殊的属性`style`，当我们通过`style`定义内联样式时，格式为：`style={{key:value…}}`

前面我们讲到`{}`插入变量时，不能为对象，但style就例外了，由于style有很多的样式属性，使用objct表达再合适不过了。

但值得注意的是：style中**属性名称为多个单词**时，要使用**驼峰式命名**

```
render(){
  return (
      <h2 style={{color:"white",backgroundColor:"black"}}>Ashun</h2>
  );
}
```

