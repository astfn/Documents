import redux from "redux";
import reducer from "./reducer.js";
import {
  incrementAction,
  decrementAction,
  addAction,
  subAction,
} from "./actionCreators.js";
const store = redux.createStore(reducer);

export default store;

/* 中间件1：每次状态变更，打印日志*/
function dispatchAndLogMiddleware(store) {
  let dispatch = store.dispatch;

  function newDispatch(action) {
    console.log(`正在派发action:`, action);
    dispatch(action);
    console.log(`变更后状态:`, store.getState());
  }

  // store.dispatch = newDispatch;
  return newDispatch;
}

/* 中间件2：实现redux-thunk*/
function thunkDispatchMiddleware(store) {
  let dispatch = store.dispatch;

  function newDispatch(action) {
    if (typeof action === "function") {
      action(store.dispatch, store.getState);
    } else {
      dispatch(action);
    }
  }

  // store.dispatch = newDispatch;
  return newDispatch;
}

//测试

function applyMiddleware(...middlewares) {
  middlewares.forEach((middleware) => {
    store.dispatch = middleware(store);
  });
}
applyMiddleware(dispatchAndLogMiddleware, thunkDispatchMiddleware);

function dispatchActions() {
  return (dispatch, getState) => {
    dispatch(addAction(11));
    dispatch(subAction(5));
  };
}
store.dispatch(dispatchActions());
