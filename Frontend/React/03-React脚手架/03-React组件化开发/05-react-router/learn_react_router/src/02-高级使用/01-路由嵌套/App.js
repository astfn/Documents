import { PureComponent } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.js";
import Category from "./pages/Category.js";
import styled from "styled-components";

const StyledWrapper = styled.main`
  .active {
    color: orange;
    font-size: 18px;
  }
`;
export default class App extends PureComponent {
  render() {
    return (
      <StyledWrapper>
        <h2>App</h2>
        <BrowserRouter>
          <NavLink to="/" exact>
            首页
          </NavLink>
          <NavLink to="/category"> 分类</NavLink>
          <hr />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/category" component={Category} />
          </Switch>
        </BrowserRouter>
      </StyledWrapper>
    );
  }
}
