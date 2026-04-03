import { PureComponent } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Category from "./pages/Category.js";
import Detail from "./pages/Detail.js";

export default class App extends PureComponent {
  render() {
    return (
      <main>
        <h2>App</h2>
        <BrowserRouter>
          <Link to="/">home </Link>
          <Link to="/category">category </Link>
          <Link to="/detail">detail</Link>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/category" component={Category} />
          <Route path="/detail" component={Detail} />
        </BrowserRouter>
      </main>
    );
  }
}
