/* 注意redux的引入方式 */
import { createStore } from "redux";
import reducer from "./reducer.js";

const store = createStore(reducer);
export default store;
