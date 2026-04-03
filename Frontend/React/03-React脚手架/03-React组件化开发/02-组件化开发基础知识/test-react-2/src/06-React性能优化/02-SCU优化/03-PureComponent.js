import React, { Component, PureComponent } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  render() {
    console.log("App render");
    return (
      <div id="max">
        <Header counter={this.state.counter} />
        <h2>counter：{this.state.counter}</h2>
        <button onClick={this.addCounter.bind(this)}>+1</button>
        <Footer />
      </div>
    );
  }
  addCounter() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
}

class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      title: "Header",
    };
  }

  /*Header为非纯组件，虽然继承了PureComponent，且接收的props并没有与视图绑定
    但依旧会触发更新机制
  */
  render() {
    console.log("Header render");
    return <header>{this.state.title}</header>;
  }
}
class Footer extends PureComponent {
  constructor() {
    super();
    this.state = {
      title: "Footer",
    };
  }

  render() {
    console.log("Footer render");
    return <footer>{this.state.title}</footer>;
  }
}
