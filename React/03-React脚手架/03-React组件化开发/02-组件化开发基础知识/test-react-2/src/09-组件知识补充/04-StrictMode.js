import { PureComponent, StrictMode } from "react";

class Home extends PureComponent {
  UNSAFE_componentWillMount() {
    console.log(`${Home.name}--UNSAFE_componentWillMount被调用`);
  }
  render() {
    return (
      <div id="home">
        <h2>我是Home组件</h2>
      </div>
    );
  }
}
class Detail extends PureComponent {
  // UNSAFE_componentWillMount() {
  //   console.log(`${Detail.name}--UNSAFE_componentWillMount被调用`);
  // }

  render() {
    return (
      <div id="detail">
        <h2>我是Detail组件</h2>
      </div>
    );
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <main>
        <Home />
        <StrictMode>
          <Detail />
        </StrictMode>
      </main>
    );
  }
}
