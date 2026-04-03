import { Fragment, PureComponent } from "react";

import AppStyle from "./App.module.css";
import Home from "./Home/Home.js";
export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <h2 className={AppStyle.title}>App组件</h2>
        <p className={AppStyle.message}>Ashuntefannao</p>
        <Home />
      </Fragment>
    );
  }
}
