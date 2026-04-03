# 拆分reducer

​	在之前的文章中，我们已经学习了：redux的基本使用、redux的拆分、react结合redux、redux中间件及原理。

​	我们已经能够去应用redux了，但是为了在实际开发中能够更加符合规范的使用redux，还有一些注意点，能够让我们更好的维护state。

## reducer代码拆分

我们观察一下之前的reducer代码：

- 当前这个reducer既有处理counter的代码，又有处理home页面的数据；
- 而且后续counter或home相关的状态管理，会不断扩充，变得复杂；
- 我们也会继续添加其他的相关状态，比如购物车、分类、歌单等等；

```
//数据
const defaultState = {
  counter: 0,
  banners: [],
  recommends: [],
};

function reducer(state = defaultState, action) {
  const { type } = action;
  switch (type) {
  //counter相关
    case INCREMENT: {
      let newState = { ...state, counter: state.counter + 1 };
      return newState;
    }
    case DECREMENT: {
      let newState = { ...state, counter: state.counter - 1 };
      return newState;
    }
    case ADD_NUMBER: {
      let newState = { ...state, counter: state.counter + action.num };
      return newState;
    }
    case SUB_NUMBER: {
      let newState = { ...state, counter: state.counter - action.num };
      return newState;
    }
    //home相关
    case CHANGE_BANNER: {
      let newState = { ...state, banners: action.banners };
      return newState;
    }
    case CHANGE_RECOMMEND: {
      let newState = { ...state, recommends: action.recommends };
      return newState;
    }
    default: {
      return state;
    }
  }
}
```

如果将所有的状态都放到一个reducer中进行管理，随着项目的逐渐庞大，必然会造成代码臃肿、难以维护。

因此我们要进行reducer的拆分：

1. 划分`defaultState`
2. 将`reducer`中同类状态管理进行抽离。
3. 由于改变了`defaultState`，所以需要更改所有访问`defaultState`的文件
   * 抽离`reducer`的过程中，改变原来访问defaultState中state的形式
   * 更改组件中`mapStateToProps`代码

### 划分defaultState

既然要拆分reducer，为了让维护的数据更加直观，我们需要将`defaultState`中的状态按照不同的业务进行划分。

可以将相同业务板块的state抽离到独立的Object中。

```
const defaultState = {
  counterInfo: { counter: 0 },
  homeInfo: { 
  	banners: [],
    recommends: []
  }
};
```

### 抽离reducer

* 将同类状态的管理过程，抽离到单独的函数当中
* 在reducer函数中，只需要返回一个与`defaultState`结构相同的**新state即可**
  * 并且对应的各个属性值，就是我们所抽离的reducer函数的调用，这些抽离的函数，又会根据派发的action去操作相关的state，最后返回一个新的**子级state对象**

```
//counter相关reducer
function counterReducer(counterInfo, action) {
  const { type } = action;
  switch (type) {
    case INCREMENT: {
      let newState = { ...counterInfo, counter: counterInfo.counter + 1 };
      return newState;
    }
    case DECREMENT: {
      let newState = { ...counterInfo, counter: counterInfo.counter - 1 };
      return newState;
    }
    case ADD_NUMBER: {
      let newState = {
        ...counterInfo,
        counter: counterInfo.counter + action.num,
      };
      return newState;
    }
    case SUB_NUMBER: {
      let newState = {
        ...counterInfo,
        counter: counterInfo.counter - action.num,
      };
      return newState;
    }
    default: {
      return counterInfo;
    }
  }
}
//home相关reducer
function homeReducer(homeInfo, action) {
  const { type } = action;
  switch (type) {
    case CHANGE_BANNER: {
      let newState = { ...homeInfo, banners: action.banners };
      return newState;
    }
    case CHANGE_RECOMMEND: {
      let newState = { ...homeInfo, recommends: action.recommends };
      return newState;
    }
    default: {
      return homeInfo;
    }
  }
}
//整个reducer逻辑
function reducer(state = defaultState, action) {
  return {
    counterInfo: counterReducer(state.counterInfo, action),
    homeInfo: homeReducer(state.homeInfo, action),
  };
}

export default reducer;
```

### 更改组件中的mapStateToProps

由于改变了`defaultState`，所以需要更改组件中的`mapStateToProps`，才能在组件中正常访问store中对应的state。

例如：

before

```
const mapStateToProps = (stateInStore) => ({
  counter: stateInStore.counter,
  banners: stateInStore.banners,
  recommends: stateInStore.recommends,
});
```

after

```
const mapStateToProps = (stateInStore) => ({
  counter: stateInStore.counterInfo.counter,
  banners: stateInStore.homeInfo.banners,
  recommends: stateInStore.homeInfo.recommends,
});
```

## reducer文件拆分

目前我们已经将不同类的状态管理过程，拆分到了不同的reducer中，我们来思考：

- 虽然已经放到不同的函数了，但是这些函数的处理依然是在同一个文件中，代码非常的混乱；
- 另外关于reducer中用到的constant、action，我们也依然是在同一个文件中；

所以，接下来，我们可以对文件结构再次进行拆分：

* 将所有同类的状态管理，抽离到一个文件夹中，这个文件夹又保留与原来store相同的结构，相当于把整个store划分为各个小的store进行管理。
  * 各个子文件夹中的 index.js 将划分的reducer暴露出去，最后在`store/reducer.js`中一并使用
* 由于各个actionCreators、constants被分别抽离了出去，store目录下的这两个文件就可以删除了
  * 外部在派遣action时，直接引入对应子目录中的actionCreators即可
  * 外部(saga文件)在应用constants时，也只需要引入对应子目录中的constants即可

```
./store
├── counter
│   ├── actioncreators.js
│   ├── constants.js
│   ├── index.js
│   └── reducer.js
├── home
│   ├── actioncreators.js
│   ├── constants.js
│   ├── index.js
│   └── reducer.js
├── index.js
├── reducer.js
└── saga.js
```

这里以counter目录的拆分示例，home同理

**counter/constants.js**

```
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const ADD_NUMBER = "ADD_NUMBER";
const SUB_NUMBER = "SUB_NUMBER";

export { INCREMENT, DECREMENT, ADD_NUMBER, SUB_NUMBER };
```

**counter/actioncreators.js**

```
import { INCREMENT, DECREMENT, ADD_NUMBER, SUB_NUMBER } from "./constants.js";

const incrementAction = () => ({
  type: INCREMENT,
});
const decrementAction = () => ({
  type: DECREMENT,
});
const addAction = (num) => ({
  type: ADD_NUMBER,
  num,
});
const subAction = (num) => ({
  type: SUB_NUMBER,
  num,
});

export { incrementAction, decrementAction, addAction, subAction };
```

**counter/reducer.js**

* 在各个划分的reducer文件中，初始化该业务的state

```
import { INCREMENT, DECREMENT, ADD_NUMBER, SUB_NUMBER } from "./constants.js";

//在各个划分的reducer文件中，初始化该业务的state
const initialConterInfo = { counter: 0 };

function counterReducer(counterInfo = initialConterInfo, action) {
  const { type } = action;
  switch (type) {
    case INCREMENT: {
      let newState = { ...counterInfo, counter: counterInfo.counter + 1 };
      return newState;
    }
    case DECREMENT: {
      let newState = { ...counterInfo, counter: counterInfo.counter - 1 };
      return newState;
    }
    case ADD_NUMBER: {
      let newState = {
        ...counterInfo,
        counter: counterInfo.counter + action.num,
      };
      return newState;
    }
    case SUB_NUMBER: {
      let newState = {
        ...counterInfo,
        counter: counterInfo.counter - action.num,
      };
      return newState;
    }
    default: {
      return counterInfo;
    }
  }
}

export default counterReducer;
```

**counter/index.js**

* 将划分的reducer导出，最后统一在`store/reducer.js`使用

```
import counterReducer from "./reducer.js";
export { counterReducer };
```

**store/reducer.js**

```
import { counterReducer } from "./counter";
import { homeReducer } from "./home";

function reducer(state = {}, action) {
  return {
    counterInfo: counterReducer(state.counterInfo, action),
    homeInfo: homeReducer(state.homeInfo, action),
  };
}

export default reducer;

```

* 目前我们合并reducer的方式是：通过每次调用自己编写reducer函数返回一个新的对象👆。
* 事实上，redux给我们提供了一个`combineReducers`函数可以方便的让我们对多个reducer进行合并👇

## combineReducers

### 使用

* `combineReducers`是`redux`中的功能函数
* 该函数接收一个对象，也就是defaultState
* 函数执行后，会返回一个纯函数，相当于我们原来编写的reducer函数，再将其默认导出，供外部createStore使用。

**store/reducer.js**

* 属性值：直接传入抽离的reducer函数即可，不用调用。（源码内部自动调用）

```
import { combineReducers } from "redux";
import { counterReducer } from "./counter";
import { homeReducer } from "./home";

const reducer = combineReducers({
  counterInfo: counterReducer,
  homeInfo: homeReducer,
});

export default reducer;

```

### 实现原理

通过阅读源码我们可知：

- 它也是将我们传入的reducers合并到一个对象中，最终返回一个combination的函数（相当于我们之前写的reducer函数）
- 在执行combination函数的过程中，它会通过判断前后返回的数据是否相同来决定返回之前的state还是新的state；
- 新的state会触发订阅者发生对应的刷新，而旧的state可以有效的组织订阅者发生刷新；

 **核心代码combineReducers**

```
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  /* 将传入的reducers合并到finalReducers中 */
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    
		//判断是否为生产环境，来发送一些警告（可忽略）
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }
    
		//如果属性值为function，则进行合并
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  // This is used to make sure we don't warn about the same
  // keys multiple times.
  // 进行异常判断（可忽略）
  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }
  
	/* 最终返回的纯函数，相当于我们编写的reducer函数 */
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }
    
		//判断是否为生产环境，来发送一些警告（可忽略）
    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )
      if (warningMessage) {
        warning(warningMessage)
      }
    }
		
		/* 核心代码部分 */
    let hasChanged = false	//判断状态是否变更
    const nextState = {}		//用于存储变更后的state
    
    /* 遍历合并后的reducers并依次调用,产生新的子级state,再判断state前后是否发生改变，来决定返回新旧数据 */
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      
      //调用拆分的reducer,产生新的子级state
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const actionType = action && action.type
        throw new Error(……)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    
    //判断state前后是否发生改变，来决定返回新旧数据
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}

```

