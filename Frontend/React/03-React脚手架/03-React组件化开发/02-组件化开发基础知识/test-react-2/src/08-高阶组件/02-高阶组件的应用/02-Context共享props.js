import React, { createContext, PureComponent } from "react";

function shareContext(WrapperComponent, Context, cpnName = "shareContext") {
  let NewComponent = (props) => (
    <Context.Consumer>
      {(context) => <WrapperComponent {...props} {...context} />}
    </Context.Consumer>
  );
  NewComponent.displayName = cpnName;
  return NewComponent;
}

class Header extends PureComponent {
  render() {
    const { nickname, age, height, title } = this.props;
    return (
      <div id="header">
        <h2>Header</h2>
        <h3>{`昵称:${nickname} 年龄:${age} 身高:${height}`}</h3>
        <h4>title:{title}</h4>
      </div>
    );
  }
}
class Footer extends PureComponent {
  render() {
    const { title } = this.props;
    return (
      <div id="header">
        <h2>Footer</h2>
        <h4>title:{title}</h4>
      </div>
    );
  }
}

const myContext = createContext({
  title: "默认值",
  height: -1,
});
let EnhanceHeader = shareContext(Header, myContext);
let EnhanceFooter = shareContext(Footer, myContext);

export default class App extends PureComponent {
  render() {
    return (
      <main>
        <myContext.Provider value={{ title: "Ashuntefannao", height: 180 }}>
          <h2>App</h2>
          <EnhanceHeader nickname="Ashun" age={18} />
          <EnhanceFooter />
        </myContext.Provider>
      </main>
    );
  }
}
