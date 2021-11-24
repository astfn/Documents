import { combineReducers } from "redux";
import { counterReducer } from "./counter";
import { homeReducer } from "./home";

const reducer = combineReducers({
  counterInfo: counterReducer,
  homeInfo: homeReducer,
});
// function reducer(state = {}, action) {
//   return {
//     counterInfo: counterReducer(state.counterInfo, action),
//     homeInfo: homeReducer(state.homeInfo, action),
//   };
// }

export default reducer;
