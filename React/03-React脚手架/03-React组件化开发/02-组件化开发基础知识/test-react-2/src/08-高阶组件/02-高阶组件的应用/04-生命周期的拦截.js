import React, { PureComponent } from "react";

function logRenderTime(WrapperComponent, cpnName = "logRenderTime") {
  let NewComponent = class extends PureComponent {
    constructor() {
      super();
      this.state = {
        startTime: 0,
      };
    }
    UNSAFE_componentWillMount() {
      this.setState({
        startTime: new Date().getTime(),
      });
    }
    componentDidMount() {
      const name = WrapperComponent.name;
      let time = new Date().getTime() - this.state.startTime;
      console.log(`${name}渲染时间：${time}`);
    }
    render() {
      return <WrapperComponent />;
    }
  };
  NewComponent.displayName = cpnName;
  return NewComponent;
}

class Home extends PureComponent {
  render() {
    return (
      <div id="Home">
        <h2>Home</h2>
      </div>
    );
  }
}
class Detail extends PureComponent {
  render() {
    return (
      <div id="Detail">
        <h2>Detail</h2>
      </div>
    );
  }
}

let LogRenderTimeHome = logRenderTime(Home);
let LogRenderTimeDetail = logRenderTime(Detail);

export default class App extends PureComponent {
  render() {
    return (
      <main>
        <h2>App</h2>
        <LogRenderTimeHome />
        <LogRenderTimeDetail />
      </main>
    );
  }
}
