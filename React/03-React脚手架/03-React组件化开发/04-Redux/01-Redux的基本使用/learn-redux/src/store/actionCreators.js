import store from "./index.js";
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
