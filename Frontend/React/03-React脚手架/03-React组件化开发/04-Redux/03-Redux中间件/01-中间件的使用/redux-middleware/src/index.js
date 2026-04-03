import React from "react";
import ReactDOM from "react-dom";

import store from "./store";
import { Provider } from "react-redux";

// import App from "./pages/01-组件中发送异步请求/App";
// import App from "./pages/02-redux中异步请求/01-redux-thunk/App.js";
import App from "./pages/02-redux中异步请求/02-redux-saga/App.js";

import {} from "redux-thunk";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
