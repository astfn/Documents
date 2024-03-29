import React from "react";
import ReactDOM from "react-dom";

import store from "./store";
import { Provider } from "react-redux";

import App from "./pages/App.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
