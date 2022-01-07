import { PureComponent } from "react";

export default class Category extends PureComponent {
  render() {
    return (
      <div id="csategory">
        <h2>Category组件</h2>
        <button onClick={this.jumpRouter.bind(this)}>点我跳转首页</button>
      </div>
    );
  }
  jumpRouter() {
    this.props.history.push("/");
  }
}
