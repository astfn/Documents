## 为什么使用classnames

### React绑定className

​	在实际开发中，我们可能会为标签添加大量的`样式类名`，并且这些 className 可能还要与组件中的 state 进行联动。

​	虽然我们在React中可以通过className关键字，结合JavaScript进行绑定，但在上述👆那些比较复杂的情形中，实现过程比较繁琐，而且还要注意一些细节问题。

* 尤其是，多个类名的绑定还要与state进行联动，就要写大量的三元表达式，代码很臃肿

```
import { PureComponent } from "react";

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isClass2: true,
    };
  }
  render() {
    const { isClass2 } = this.state;
    return (
      <main>
        {/*绑定多个class*/}
        {/*不能直接绑定数组，会转化成"class1,class2"*/}
        <h2 className={["class1", "class2"]}>App标题1</h2>
        
        {/*可以直接写入同一个String中（注意类名之间隔开要加空格）*/}
        <h2 className={"class1 class2 class3 class4"}>App标题1</h2>
        
        {/*可以使用join进行分隔（不用考虑空格问题）*/}
        <h2 className={["class1", "class2"].join(" ")}>App标题1</h2>
        
        {/*与state联动时，就变的比较麻烦了*/}
        <h2 className={"class1" + (isClass2 ? " class2" : "")}>App标题1</h2>
        <h2 className={["class1", isClass2 ? "class2" : ""].join(" ")}>
          App标题1
        </h2>
      </main>
    );
  }
}
```

### 对比Vue

Vue对于类名的绑定，就简单多了，这里我们简单的复习一下

```
/* 普通形式绑定 */
<tagName class="class1 class2 class3 class4" />
<tagName class=["class1", "class2", "class3"] />//可直接传入Array,且不用担心逗号问题

/* 联动state */
//传入Object,通过Boolean类型的属性值，决定类名是否绑定
<tagName class={"class1":Boolean, "class2":Boolean,……} />

//Array结合Object
<tagName class=["class1",{"class1":Boolean,…},…] />
```

> 但并不代表React不好，因为React为我们提供了足够的灵活性，所有逻辑都可使用JavaScript进行编写

当然在React中，为了能够以更简洁的形式去绑定各个className，我们可以使用`classnames`库来进行编写，且Vue中对于类名的绑定规则，该库中都有所体现。

## classnames的使用

1. 下载该库：`yarn add classnames`
2. 在项目中引入，并按照相关规则进行编写

**使用语法规则**

```
//引入该库，调用默认暴露的方法，在其中传入各个参数
import classNames from "classnames";
/* 使用	*/

//可以直接依次传入类名
<h2 className={classNames("class1", "class2", "class3")}>App标题1</h2>

//当然也可使用三元表达式
<h2 className={classNames("class1", isClass2 ? "class2" : "class3")}>
  App标题2
</h2>

//可以传入Object
<h2 className={classNames({ class2: isClass2 })}>App标题3</h2>

//Object,结合其它必传项
<h2 className={classNames("class1", { class2: isClass2 })}>
  App标题4
</h2>

//Array结合Object
<h2 className={classNames(["class1", { class2: isClass2 }])}>
  App标题5
</h2>
```

