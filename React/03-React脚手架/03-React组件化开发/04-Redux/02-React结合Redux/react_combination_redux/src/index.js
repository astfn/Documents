import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import store from "./store";

/* 独立封装connect\context */
// import { StoreContext } from "./utils/context.js";

// ReactDOM.render(
//   <StoreContext.Provider value={store}>
//     <App />
//   </StoreContext.Provider>,
//   document.getElementById("root")
// );

/* react-redux */

import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
