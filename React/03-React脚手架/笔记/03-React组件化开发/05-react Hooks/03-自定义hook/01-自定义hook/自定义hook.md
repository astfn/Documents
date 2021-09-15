## 认识自定义hook

**自定义Hook本质上只是一种函数代码逻辑的抽取，严格意义上来说，它本身并不算React的特性。**

我们通过一个简单的案例，来认识自定义hook的过程。

需求：所有的组件在创建和销毁时都进行打印

- 组件被挂载：打印 `xxx组件被挂载了`；
- 组件被销毁：打印 `xxx组件被销毁了`；

在封装自定义hook前，你可能会在每个组件中编写同样的逻辑，例如Home.js

```
import { useEffect } from "react";

export default function Home(props) {
  useEffect(() => {
    console.log("Home组件被挂载了");
    return () => {
      console.log("Home组件被卸载了");
    };
  }, []);
  return (
    <div id="home">
      <h3>Home</h3>
    </div>
  );
}
```

很显然，我们希望把这个功能实现的过程抽离出去。我们封装在`./hooks.js`中

```
import { useEffect } from "react";

function loggingLife(cpnName) {
  useEffect(() => {
    console.log(`${cpnName}组件被挂载了`);
    return () => {
      console.log(`${cpnName}组件被卸载了`);
    };
  }, []);
}

export { loggingLife };
```

#### 合法命名

上面抽离的hook代码看似没有问题，但还没有运行，编辑器却已经报错了：

```
React Hook "useEffect" is called in function "loggingLife" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter.
/*
	React钩子函数“useEffect”在函数“loggingLife”中调用，该函数既不是React函数组件，也不是自定义React Hook函数。React组件名称必须以大写字母开头。
*/
```

其实也很好理解，之前我们就一直在说，hook 的使用场景：

* 只能在 **React 的函数组件**或**自定义Hook**中调用 Hook API，不要在其他 JavaScript 函数中调用。
* 只能在**函数最外层**调用 Hook。
  - 不要在循环、条件判断或者子函数中调用。

报错分析：

我们抽离的`loggingLife`只是一个普通函数，既不是函数组件（首字母需大写），也不是自定义Hook。

有的人可能会想：我直接让其首字母大写不就行了吗？

* 但此时就变为了函数的组件，而函数组件的第一个参数为`props`，很显然也不符合要求。

如何自定义Hook？

其实很简单，我们只需要按照合法的命名要求即可：

* **自定义hook名称需要以**`use`**开头**
* 之前我们在学习原生 hook API 时，也可以发现都是以`use`开头。

---

我们将`loggingLife`命名为`useLoggingLife`即可，自定义hook函数也可正常传参。

此时Home组件的代码只需引入我们自定义的hook：`useLoggingLife`，即可完成功能。

```
import { useLoggingLife } from "../hooks";
export default function Home(props) {
  useLoggingLife("Home");
  return (
    <div id="home">
      <h3>Home</h3>
    </div>
  );
}
```

同理，其它组件如果需要该功能，只需要引入我们自定义的 hook 即可。

## 自定义Hook练习

### 共享Context

​	虽然 React 给我们提供了 `useContext` API，但每次使用Contex都需要不断的引入、调用`useContext`。如果有一些Context需要被大量组件共享，就代表很多组件中存在大量的、重复的`useContext`使用过程。

**案例体验**

比如多个组件都需要使用User和Token的Context：

App.js

```
import Home from "./pages/Home.js";
import { createContext } from "react";

const UserContext = createContext();
const TokenContext = createContext();

export default function App(pros) {
  return (
    <main id="app">
      <h2>App</h2>
      <UserContext.Provider value={{ name: "Ashun", age: 18 }}>
        <TokenContext.Provider value={{ text: "TokenMessage", type: "token" }}>
          <Home />
        </TokenContext.Provider>
      </UserContext.Provider>
    </main>
  );
}

export { UserContext, TokenContext };
```

Home.js

* 各个组件在使用user和token时都需要导入对应的Context，并且需要使用两次useContext；

```
import { useContext } from "react";
import { TokenContext, UserContext } from "../App";

export default function Home(props) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  console.log(user, token);
  
  return (
    <div id="home">
      <h3>Home</h3>
    </div>
  );
}
```

我们可以将这些频繁使用的Context过程抽离出去，形成自定义hook：

```
import { useContext } from "react";
import { TokenContext, UserContext } from "./App";

function useUserToken(cpnName) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  return [user, token];
}

export { useUserToken };
```

此时Home或其它组件，只需要引入hook并调用，接收返回的context数据即可。

```
import { useUserToken } from "../hooks";
export default function Home(props) {
  const [user, token] = useUserToken();
  console.log(user, token);
  return (
    <div id="home">
      <h3>Home</h3>
    </div>
  );
}
```

### 获取窗口滚动的位置

hooks.js

```
import { useEffect, useState } from "react";

function useGetScrollY(cpnName) {
  const [scrollY, setScrollY] = useState(null);

  function updateScrollY(ele) {
    setScrollY(parseInt(window.scrollY));
  }

  useEffect(() => {
    document.addEventListener("scroll", updateScrollY);
    return () => {
      document.removeEventListener("scroll", updateScrollY);
    };
  }, []);

  return scrollY;
}

export { useGetScrollY };
```

Home.js

```
import { useGetScrollY } from "../hooks";
export default function Home(props) {
  const scrollY = useGetScrollY();

  return (
    <div id="home" style={{ padding: "1000px 0px" }}>
      <h3 style={{ position: "fixed", top: "80px" }}>Home:{scrollY}</h3>
    </div>
  );
}
```

### localStorage存储

hooks.js

* 设置`data`初始值应从`localStorage`中获取，第一次进入网站时为null。
* 将`data`、`setData`暴露出去，供外部访问和变更
* 当组件挂载后，通过传入的 key，将 data 压入 localStorage。
* 侦听 data 的改变，若data改变，则将新数据压入 localStorage。

```
import { useEffect, useState } from "react";

function useLocalStorange(key) {
  const [data, setData] = useState(() =>
    JSON.parse(window.localStorage.getItem(key))
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}

export { useLocalStorange };
```

Home.js

```
import { useLocalStorange } from "../hooks";
export default function Home(props) {
  const [title, setTitle] = useLocalStorange("title");
  return (
    <div id="home">
      <h3>Home:{title}</h3>
      <button onClick={(e) => setTitle("Ashuntefannao")}>设置name</button>
    </div>
  );
}
```

