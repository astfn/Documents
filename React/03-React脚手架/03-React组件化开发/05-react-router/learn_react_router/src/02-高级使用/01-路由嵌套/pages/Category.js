import { PureComponent } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

function CategoryProduct(props) {
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
    </ul>
  );
}
function CategoryMessage(props) {
  return (
    <ul>
      <li>消息列表1</li>
      <li>消息列表2</li>
      <li>消息列表3</li>
    </ul>
  );
}

export default class Category extends PureComponent {
  render() {
    return (
      <div id="csategory">
        <h2>Category组件</h2>
        <BrowserRouter>
          <NavLink exact to="/category">
            商品列表
          </NavLink>
          <NavLink to="/category/message">消息列表</NavLink>
          <Switch>
            <Route exact path="/category" component={CategoryProduct} />
            <Route path="/category/message" component={CategoryMessage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
