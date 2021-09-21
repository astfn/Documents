在之前的redux开发中，为了让组件和redux更好的结合，我们使用了react-redux中的connect：

- 本质上是利用`高阶组件`进行一系列的拦截操作。
- 并且必须编写：`mapStateToProps`和 `mapDispatchToProps`

虽然这种形式，能够较为方便的让redux与组件结合，但在实际开发中，还是需要不断的引入`connect`，且要进行`mapStateToProps`、`mapDispatchToProps`的编写。这些操作是重复且繁琐的。

* 在Redux7.1开始，提供了Hook的方式，我们再也不需要编写connect以及对应的映射函数了

## useSelector

`useSelector`的作用是将 state 映射到组件中，相当于mapStateToProps。

- 参数一：将 state 映射到组件内的变量中
- 参数二：可以进行浅比较来决定是否重新渲染组件（后续讲解）

```
const result: any = useSelector(selector: Function, equalityFn?: Function)
```

### 基本体验

​	这里不再展示redux中的逻辑，只关心`useSelector`在组件中的使用。

* 引入useSelector，并在函数组件内部使用
* 传入第一个参数callback，接收参数 state 能够访问redux中的数据。
* 将所需要映射的state进行返回

```
import { memo } from "react";
import { useSelector } from "react-redux";

function Detail(props) {
  const { counter, banners, recommends } = useSelector((state) => ({
    counter: state.counterInfo.counter,
    banners: state.homeInfo.banners,
    recommends: state.homeInfo.recommends,
  }));
  console.log("Detail重新渲染");
  return (
    <div id="detail">
      <h2>Detail</h2>
      <strong>数字：{counter}</strong>
      {JSON.stringify(banners)}
      {JSON.stringify(recommends)}
    </div>
  );
}

export default memo(Detail);
```

### 性能问题

可以发现，使用useSelector能够非常简单的将redux数据映射到组件中，但上述代码还存在一些隐患：

* 未依赖的 redux 数据改变，依旧会导致组件重新渲染

例如，若上述Detail组件中不依赖counter，但在Home组件中改变counter，依旧会导致Detail组件重新渲染：

```
function Detail(props) {
  const { banners, recommends } = useSelector((state) => ({
    banners: state.homeInfo.banners,
    recommends: state.homeInfo.recommends,
  }));
  console.log("Detail重新渲染");
  return (
    <div id="detail">
      <h2>Detail</h2>
      {JSON.stringify(banners)}
      {JSON.stringify(recommends)}
    </div>
  );
}
```

<img src="Redux Hook.assets/001.gif" alt="001" style="zoom:80%;border:1px solid" />

​	但之前在使用`connect`函数时，就不会有这种情况，因为其内部帮我们做了性能优化，会对`mapStateToPropers`所返回的对象进行数据的浅比较，来判断数据是否发生改变，从而触发组件更新。

* 而`useSelector`内部默认使用`===`的方式，直接比较callback所返回的Object，但由于每次callback执行后，都会返回一个新的引用，因此判断结果一直为false，所以会认为数据发生了改变，才会不断更新。

* 那使用`useSelector`有什么解决方法吗？答案是有的，就是通过第二个参数解决的👇

### shallowEqual

我们可以使用react-redux中给我们提供的 shallowEqual：

* 可以让`useSelector`第一个参数所返回的Object进行浅层比较(比较数据)，从而解决子组件频繁更新的性能为题。

```
……
import { shallowEqual, useSelector } from "react-redux";

function Detail(props) {
  const { banners, recommends } = useSelector(
    (state) => ({
      banners: state.homeInfo.banners,
      recommends: state.homeInfo.recommends,
    }),
    shallowEqual
  );
  console.log("Detail重新渲染");
  return (……);
}
```

<img src="Redux Hook.assets/002.gif" alt="002" style="zoom:80%;border:1px solid" />

当然了，你也可以自己编写数据比较的函数，来决定是否重新渲染，再传入useSelector即可。

## useDispatch

useDispatch非常简单，就是直接获取dispatch函数，之后在组件中直接使用即可：

```
const dispatch = useDispatch()
```

直接使用dispatch：

```
<button onClick={e => dispatch(decrement())}>-1</button>
<button onClick={e => dispatch(subAction(5))}>-5</button>
```

## useStore

我们还可以通过useStore来获取当前的store对象：

```
const store = useStore()
```

在组件中可以使用store：

```
const store = useStore();
console.log(store.getState());
```


