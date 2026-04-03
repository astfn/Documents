# 为什么使用setState？

之前我们一直在使用`setState`进行状态的变更，并且对其有了一些基本的了解：

若想通过状态的改变，达到重新渲染效果，我们不能直接修改state中的状态。

* 因为直接修改state这种行为，React并不能够直接监听到，也就不会告知状态变更，进行重新渲染。
  * 并且之所以要保证state的不可变性，也是为了让`SCU`优化能够正常的工作（下篇文章详细讲解）
* 我们可以得知：React并没有实现像Vue中`Object.defineProperty/Proxy`的方式，直接监听数据的变化
* 我们**必须**通过`setState`来告知React状态发生了变更，才能进行重新渲染。

在之前的使用过程中可以发现：我们在class组件中并没有定义setState方法，但却能够直接使用，原理很简单，因为每个类组件都继承了React.Component，实际上setState是添加在React.Component原型上的，因此子类的实例也能够使用。

# 异步更新

setState在默认情况下是`异步更新的`，其实在之前做TabControl案例的过程中我们已经发现了这个特点。

我们这里再通过一个简单的demo（点击按钮，counter++），查看异步更新效果。

```
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <div id="max">
        <h2>{this.state.counter}</h2>
        <button onClick={this.change.bind(this)}>+1</button>
      </div>
    );
  }
  change() {
    let { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
    console.log(`同步打印结果：${this.state.counter}`);
    setTimeout(() => {
      console.log(`异步打印结果：${this.state.counter}`);
    });
  }
}

```

可以看到，在使用setState进行状态变更时，若直接打印，则不能得到变更后的数据，必须异步打印才能得到正确结果，这是因为：**setState是异步更新的**

## 为什么要这样设计?

* setState设计为异步更新，可以提升性能
  * 如果每次调用 setState都立即进行更新，那就意味着render会被频繁的调用，界面不断进行重新渲染，很显然性能会大大下降
  * 所以setState设计为异步更新，在这个过程中会同时获取多个状态的变更，然后再进行页面的渲染。
* 保证state与props的同步
  * 如果同步更新state，但这时候render函数还没有执行完毕（因为render会进行一系列的复杂操作，进行数据的对比），就会导致state与props不同步。
  * 如果state中的某些状态依赖于props，很显然这样在开发中会遇到很多的问题。

## 变更数据的获取

我们知道，setState是异步进行更新的，但是在开发中我们不会在setTimeout中直接获取变更后的数据，因为这样是不严谨的，我们通常使用以下两种方式获得异步更新后的数据：

1. setState 中的第二个参数：`callback`
2. 在`componentDidUpdate`中获取

### callback

setState能够接收两个参数，之前我们一直没有涉及到状态变更后数据的获取，所以也就没有使用过第二个参数，这里详细进行介绍。

* 参数1：变更的状态信息
* 参数2：callback，在状态异步变更后进行回调

我们还用上文的案例来测试一下callback

```
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <div id="max">
        <h2>{this.state.counter}</h2>
        <button onClick={this.change.bind(this)}>+1</button>
      </div>
    );
  }
  change() {
    let { counter } = this.state;
    this.setState(
      {
        counter: counter + 1,
      },
      () => {		//setState的第二个参数callback
        console.log(`callback获取更新后的数据：${this.state.counter}`);
      }
    );
  }
}
```

### componentDidUpdate

当然，如果我们使用了setState进行状态的变更，就会让页面进行重新渲染，这时，我们可以通过生命周期钩子函数`componentDidUpdate`进行更新数据的获取。

```
componentDidUpdate(prevProps, precState, snapShot) {
  console.log(`componentDidUpdate钩子获取：${this.state.counter}`);
}
```

>经过实际测试可知：setState中的`callback`会在`componentDidUpdate`之后执行。

# 同步更新

上文我们已经讲解了，React中的setState在默认情况下是异步更新的，但在一些特殊情况下，是可以有同步更新效果的。主要有两种特殊情况：

1. setState在定时器中执行
2. setState在原生方式监听事件的处理函数中执行

### setState在定时器中执行

若setState在定时器中执行，则在定时器中，可以同步获取更新后的数据。下例代码可以获取正确结果。

```
change() {
  let { counter } = this.state;
  setTimeout(() => {
    this.setState({
      counter: counter + 1,
    });
    console.log(`setState放入定时器中的同步获取：${this.state.counter}`);
  });
}
```

### 原生事件监听

要进行原生事件的监听，就需要访问DOM，那就要在`componentDidMount`钩子中进行操作。因为此时页面已经挂载完毕，可以访问到真实的DOM。

```
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    document.getElementById("maxBtn").addEventListener("click", () => {
      this.setState({
        counter: this.state.counter + 1,
      });
      console.log(`原生事件处理程序，同步获取变更数据：${this.state.counter}`);
    });
  }
  render() {
    return (
      <div id="max">
        <h2>{this.state.counter}</h2>
        {/* 这里不再使用React语法监听事件，而是给予ID，在钩子函数中使用原生语法进行监听*/}
        <button id="maxBtn">+1</button>	
      </div>
    );
  }
}

```

# setState合并

在使用setState时，React源码中会有一些合并的操作，主要分为两种：

1. 数据的合并
2. 多个setState调用的合并

## 数据的合并

假如我们有这样的数据：

```
this.state = {
  name: "Ashun",
  level: 88
}
```

我们在进行某些操作时,需要更新name：

- 我们知道：通过setState去修改状态，至少需要传入第一个参数newObj，用于更新数据，但这时我只更改了name，但却不会影响其它的状态(level)

```
changeName() {
  this.setState({
    name: "阿顺特烦恼"
  });
}
```

为什么不会产生影响呢？源码中其实是有对 `原对象` 和 `新对象进行合并的：`

- 事实上就是使用 `Object.assign(target, ...sources)` 来完成的，这样新传入的`newObj`中如果存在相同的属性，就会覆盖掉`原对象`中的对应属性。从而达到：既更新数据，又不会影响其它数据的效果

## 多个setState的合并

我们继续沿用上文的数据：

```
this.state = {
  name: "Ashun",
  level: 88
}
```

假如我们要对level属性进行操作：

- 如果进行如下操作，那么level会变成几呢？答案是89；只执行了最后一次的 +1 的操作。

```
changeLevel() {
  this.setState({
    counter: this.state.level + 1
  });

  this.setState({
    counter: this.state.level + 1
  });

  this.setState({
    counter: this.state.level + 1
  });
}
```

同理，若进行以下操作，level会变为：176；只执行了最后一次的 *2 操作

```
changeLevel() {
  this.setState({
    counter: this.state.level + 1
  });

  this.setState({
    counter: this.state.level + 5
  });

  this.setState({
    counter: this.state.level * 2
  });
}
```

因此，我们得到一个结论：

* React会对多个setState操作进行合并
* 并且，位于后面的操作，会覆盖掉前面的操作
* 也就是说，只会执行最后一次的操作。

> 其实在React源码的processUpdateQueue.js中：有一个do...while循环，就是从队列中取出多个state进行合并的；

### 解决

如何可以做到，让各个setState操作之间互不影响呢？

* 我们要把第一个参数变为`function`的形式，这个回调函数接收两个参数`state,props`,
* return出去一个newObj，在newObj中配置需要改变的状态，并且要通过函数参数`state,props`在之前操作的基础上进行更改。

```
increment() {
  this.setState((state, props) => {
    return {
      level: state.level + 1
    }
  })

  this.setState((state, props) => {
    return {
      level: state.level + 1
    }
  })

  this.setState((state, props) => {
    return {
      level: state.level + 1
    }
  })
}
```

值得注意的是：一定要通过函数参数`state,props`进行状态的变更，因为该函数参数能够记录之前的操作，若直接使用`this.state.level + 1`，依然会导致合并。

例如下例代码，是向上每次会`+2`，因为前两次的`this.state.level + 1`进行了合并

```
this.setState((state, props) => {
  return {
    level: this.state.level + 1,
  };
});
this.setState((state, props) => {
  return {
    level: this.state.level + 1,
  };
});
this.setState((state, props) => {
  return {
    level: state.level + 1,
  };
});
```

为什么传入一个函数就可以变出3呢？

- 原因是：在源码进行多个state合并时，每次遍历，都会执行一次该函数



# 总结

1. 直接改变state的行为，不能让页面重新渲染，React不能监听这种直接改变state的行为，需要通过setState改变，并且stateState是React.Component对象的原型方法。

2. setState既可以是异步更新，亦可以是同步更新。

   异步更新：在React事件中执行setState

   * 可通过setState中的`callback`，以及`componentDidUpdate`钩子，获取更新后的数据

   同步更新：在定时器中执行setState、原生事件处理程序中执行setState

   * 可同步获取更新后的数据。

3. setState合并问题

   * 数据合并：之所以能够单独更新某个state属性，是因为源码内使用`Object.assign`将数据合并。
   * 多个setState操作的合并：
     * 源码内使用`do while`循环，从队列中取出多个setState操作进行合并；
     * 若不希望合并，则可以将第一个参数值为callback，且接收参数state，props，在callback内将更新的数据进行return。（原因是：在源码进行多个state合并时，每次遍历，若为function，则都会执行一次该函数）

   

   

