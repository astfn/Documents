import React, { PureComponent } from "react";

class Cart extends PureComponent {
  render() {
    return (
      <div id="Cart">
        <h2>Cart</h2>
      </div>
    );
  }
}
class LoginPage extends PureComponent {
  render() {
    return (
      <div id="LoginPage">
        <h2>LoginPage</h2>
      </div>
    );
  }
}

function loginPower(Page, cpnName = "loginPower") {
  let NewComponent = (props) => {
    if (props.isLogin) {
      return <Page />;
    } else {
      return <LoginPage />;
    }
  };
  NewComponent.displayName = cpnName;
  return NewComponent;
}
let LoginPowerCart = loginPower(Cart);

export default class App extends PureComponent {
  render() {
    return (
      <main>
        <h2>App</h2>
        <LoginPowerCart isLogin={false} />
      </main>
    );
  }
}
