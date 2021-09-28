import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    document.getElementById("maxBtn").addEventListener("click", () => {
      this.setState({
        counter: this.state.counter + 1,
      });
      console.log(`原生事件处理程序，同步获取变更数据：${this.state.counter}`);
    });
  }
  render() {
    return (
      <div id="max">
        <h2>{this.state.counter}</h2>
        <button id="maxBtn">+1</button>
      </div>
    );
  }
}
