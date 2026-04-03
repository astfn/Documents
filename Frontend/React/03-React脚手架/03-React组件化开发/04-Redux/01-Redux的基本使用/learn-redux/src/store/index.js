import redux from "redux";
import reducer from "./reducer.js";
import {
  incrementAction,
  decrementAction,
  addAction,
  subAction,
} from "./actionCreators.js";
const store = redux.createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;

store.dispatch(incrementAction());
store.dispatch(decrementAction());
store.dispatch(addAction(11));
store.dispatch(subAction(5));
