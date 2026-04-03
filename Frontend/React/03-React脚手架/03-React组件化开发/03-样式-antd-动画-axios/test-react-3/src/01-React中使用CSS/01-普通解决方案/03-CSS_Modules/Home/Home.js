import { Fragment, PureComponent } from "react";

import HomeStyle from "./Home.module.css";
export default class Home extends PureComponent {
  render() {
    return (
      <Fragment>
        <h2 className={HomeStyle.title}>Home组件</h2>
        <p className={HomeStyle.message}>Home--ASHUNTEFANNAO</p>
      </Fragment>
    );
  }
}
