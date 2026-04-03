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

{
  /* 中间件1：每次状态变更，打印日志*/
  let dispatch = store.dispatch;
  function dispatchAndLog(action) {
    console.log(`正在派发action:`, action);
    dispatch(action);
    console.log(`变更后状态:`, store.getState());
  }
  store.dispatch = dispatchAndLog;

  //测试
  // store.dispatch(addAction(11));
  // store.dispatch(subAction(5));
}

{
  /* 中间件2：实现redux-thunk*/
  let dispatch = store.dispatch;
  function thunkDispatch(action) {
    if (typeof action === "function") {
      action(store.dispatch, store.getState);
    } else {
      dispatch(action);
    }
  }
  store.dispatch = thunkDispatch;

  //测试
  function dispatchActions() {
    return (dispatch, getState) => {
      dispatch(addAction(11));
      dispatch(subAction(5));
    };
  }
  store.dispatch(dispatchActions());
}
