import { PureComponent } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import Home from "./pages/Home.js";
import Category from "./pages/Category.js";
import styled from "styled-components";

const StyledWrapper = styled.main`
  .active {
    color: orange;
    font-size: 18px;
  }
`;
class App extends PureComponent {
  render() {
    return (
      <StyledWrapper>
        <h2>App</h2>
        <button onClick={this.jumpCtegory.bind(this)}>jumpRouter</button>
        <NavLink to="/" exact>
          首页
        </NavLink>
        <NavLink to="/category"> 分类</NavLink>
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/category" component={Category} />
        </Switch>
      </StyledWrapper>
    );
  }
  jumpCtegory() {
    this.props.history.push("/category");
  }
}
export default withRouter(App);
