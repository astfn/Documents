在上篇文章(React结合Redux)中，我们学习了如何在React中使用Redux，并且为了更方便的维护store中的state，封装了connect、context工具，完成了对重复业务的抽离和映射。

但实际上redux官方帮助我们提供了 react-redux 的库，可以直接在项目中使用，并且实现的逻辑会更加的严谨和高效。

为了更好的理解 react-redux ，实际上我们封装工具的使用，与 react-redux 是一样的，之后我们也会结合源码来分析。

## react-redux使用

使用步骤与我们封装的工具是一样的，只不过有些API名称不同，下文示例直接基于上篇文章(React结合Redux)中的案例更改。

**安装react-redux：**

```shell
yarn add react-redux
```

**使用Provider：**

- 将之前自己创建的`StoreContext.Provider`，换成react-redux的`Provider`组件：
- 注意：这里传入的是**store**属性，而不是value属性（待会儿可以在源码中查看）

```
import { Provider } from 'react-redux';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

**使用connect函数：**

- 将之前使用自己封装的connect函数，换成react-redux的connect函数；

```
import React, { PureComponent } from 'react';
// import connect from '../utils/connect';
import { connect } from "react-redux";

……
export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

## react-redux的源码

原文：[React系列十六 - Redux(二)react-redux (juejin.cn)](https://juejin.cn/post/6886360663308894215#heading-6)

这里简单了解一下react-redux的源码：

- 整个社区在hooks出现后大量的库转向了hooks，所以在源码中会出现大量的hooks代码；
- 因为目前还没有讲解hooks相关的API，所以某些hooks的作用也不是很了解（可以学习完hooks之后再详细阅读）；

首先，我们简单看一下Provider的源码：

- 使用了一个useMemo来返回一个contextValue的对象；
  - 这里使用useMemo的原因是为了进行性能的优化；
  - 在依赖的store不改变的情况下，不会进行重新计算，返回一个新的对象；
- 在下面的Context的Provider中就会将其赋值给value属性；

![image-20200713171101825](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fc77810216447edbdcf00a3bf61d96b~tplv-k3u1fbpfcp-watermark.awebp)

ReactReduxContext来自另外一个文件：

![Context对象的创建](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a45aa4f21c4c4870a1a7493d9d906fb2~tplv-k3u1fbpfcp-watermark.awebp)

**connect函数的依赖比较复杂：**

调用createConnect来返回一个connect函数：

![image-20200713171920708](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/995c4fbec5374eab8839604232696f67~tplv-k3u1fbpfcp-watermark.awebp)

createConnect函数的调用：

- 很多参数的对象解构应用了ES6的默认赋值语法，将参数设置为`{}`空对象，防止无参数传入时的报错现象。

![createConnect函数](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90c435b6bff048959892fdcaf7551826~tplv-k3u1fbpfcp-watermark.awebp)

connect函数最终调用的是connectHOC：

- connectHOC其实是connectAdvanced的函数；
- connectAdvanced函数最终返回的是wrapWithConnect函数；

![image-20200713173338618](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edc1503428ec4c73b877e3a393e2c1a8~tplv-k3u1fbpfcp-watermark.awebp)

wrapWithConnect函数：

![wrapWithConnect函数](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45622e50edc347879dbb624fc7105694~tplv-k3u1fbpfcp-watermark.awebp)

![wrapWithConnect最终的返回值](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/844488607f5c48ddab02f913d09e2cd9~tplv-k3u1fbpfcp-watermark.awebp)