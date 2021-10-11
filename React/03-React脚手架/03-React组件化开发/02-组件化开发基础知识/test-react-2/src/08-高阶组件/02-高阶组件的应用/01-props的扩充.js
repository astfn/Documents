import React, { PureComponent } from "react";

function enhanceProps(WrapperComponent, otherProps, cpnName = "enhanceProps") {
  let NewComponent = (props) => <WrapperComponent {...props} {...otherProps} />;
  NewComponent.displayName = cpnName;
  return NewComponent;
}

class Header extends PureComponent {
  render() {
    const { nickname, age, height } = this.props;
    return (
      <div id="header">
        <h2>Header</h2>
        <h3>{`昵称:${nickname} 年龄:${age} 身高:${height}`}</h3>
      </div>
    );
  }
}

let EnhanceHeader = enhanceProps(Header, {
  height: 180,
});

export default class App extends PureComponent {
  render() {
    return (
      <main>
        <h2>App</h2>
        <EnhanceHeader nickname="Ashun" age={18} />
      </main>
    );
  }
}
