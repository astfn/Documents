import React, { PureComponent } from "react";

class App extends PureComponent {
  render() {
    return (
      <main>
        <h2>App</h2>
      </main>
    );
  }
}
/*
    可以返回一个 类组件
*/
function higherOrderComponent(
  WrapperComponent,
  cpnName = "NewHigherOrderComponent"
) {
  let NewComponent = class extends PureComponent {
    render() {
      return <WrapperComponent />;
    }
  };
  NewComponent.displayName = cpnName;
  return NewComponent;
}

/*
    可以返回一个 函数组件
*/
// function higherOrderComponent(
//   WrapperComponent,
//   cpnName = "NewHigherOrderComponent"
// ) {
//   const NewComponent = () => <WrapperComponent />;
//   NewComponent.displayName = cpnName;
//   return NewComponent;
// }

let EnhanceApp = higherOrderComponent(App, "EnhanceApp");
export default EnhanceApp;
