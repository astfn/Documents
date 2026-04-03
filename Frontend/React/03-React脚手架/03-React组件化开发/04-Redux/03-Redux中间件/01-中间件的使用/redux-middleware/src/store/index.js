import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer.js";
import mySaga from "./saga";

// 通过createSagaMiddleware函数来创建saga中间件
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

// 通过applyMiddleware来结合多个Middleware, 返回一个enhancer
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, sagaMiddleware)
);
// 将enhancer作为第二个参数传入到createStore中
const store = createStore(reducer, enhancer);

// 必须启动saga中间件，并且传入其要监听的generator
sagaMiddleware.run(mySaga);

export default store;
