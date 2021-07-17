在学习Vue时，我们就已经接触到了virtualDOM的概念，在Vue中virtualDOM的生成过程是这样的：

1. 获取template模板
2. 将template进行解析，并传入render函数，根据其结构生成`Virtual DOM Tree`

其实在react中也是类似的，下面将讲解react中的virtualDOM。

## 为什么要使用虚拟DOM？

我们在学习Vue时已经探讨过这个问题了，这其实主要涉及到三点：

### 原有开发模式中很难追踪状态的改变：

在原有的开发模式中，若应用程序涉及到大量的状态，则不容易对其进行追踪，并且各个状态之间可能相互影响，调试过程困难。

### 操作实际DOM性能较低：

若大量或频繁的操作真实DOM，会不断的创建、更改、销毁DOM，导致频繁的触发回流，性能较低，尤其是在应用体积庞大时更能体现。

当然，对于批量的操作，我们可以通过`DocumentFragment`将一次次操作DOM的过程合并起来。

### 命令式->声明式

通过某些操作，将这些模板生成为一个个`virtualDOM`形成树结构，并保留在内存中，之后让这些 `虚拟DOM` 与 `真实DOM` 之间相互协调。

而我们开发者，不需要直接进行DOM操作，从繁琐的：手动更改DOM、属性操作、事件处理、相互协调 中解脱出来，让我们只关注业务流程的实现，以上的那些操作都交给特定的程序处理，进行自动的协调。

这样，我们就从传统的命令式编程，跳跃到了声明式的编程。

#### 命令式编程：

> 我们需要告知计算机每一次的执行步骤，少一步都不行。

例如：我们实现点击button，更改标题内容。

```
<div id="app">
	<h2></h2>
	<button>click</button>
</div>
<script>
  let message = "Hello world";
  let h2 = document.getElementsByTagName("h2")[0];
  h2.innerHTML = message;

  let button = document.querySelector("button");
  button.addEventListener("click", () => {
    message = "Hello React";
    h2.innerHTML = message;
  });
</script>
```

在点击按钮后，我们不仅要进行状态的变更，还要手动操作DOM，每一步都要由开发者完成。

#### 声明式编程：

>只需要告知特定操作即可，相关工作让其内部程序自动完成。

```
<div id="app"></div>
<script type="text/babel">
  let app = document.getElementById("app");
  let massage = "Hello world";
  
  function change() {
    render();
    massage = "Hello React!";
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
```

点击按钮后，进行状态变更，执行render即可自动完成：根据状态的改变重新渲染的过程。

有些人可能就有疑问了，这段React代码为什么比原生还要复杂？

因为此案例较为简单，只涉及到了一个state的变更，如果该程序有十几个甚至更多状态的变更呢?。很显然传统开发模式还要依次操作对应的DOM，而对于React来说，只需要执行render即可。

并且，在之后的开发中，不会在使用这种形式，而是通过`state`收集响应式状态，通过`setState`告知状态变更，便可自动完成视图更新的过程。

## React创建virtualDOM过程

个人认为，Vue与React在创建virtualDOM的总体过程中，是有很多相似之处的。二者都是将 `视图模板` 转化成 `virtualDOM`。

在Vue中，template结构决定最终呈现页面的结构。而在React中，不论我们是直接使用`React.createElement`进行编写，还是使用`JSX`,最终应用的都是`React.createElement`，而`React.createElement`执行后，会创建出对应的JavaScript对象，而这个JavaScript对象，就是生成的`virtualDOM`。

这里用一张图片来展示这个过程：

<img src="virtualDOM创建过程.assets/001.png" alt="001" style="zoom:80%;" />

在生成virtualDOM后，再通过ReactDOM.render()进行视图更新，把与上次结构不同的部分进行替换。

总体过程：

```
JSX -> React.createElement -> virtual DOM Tree -> ReactDOM.render -> 真实DOM
```

对于react-native来说，总体过程是一样的，只不过最终转化的不是DOM，而是原生控件。

