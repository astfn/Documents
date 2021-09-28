import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }
  //更新后的钩子函数中获取：变更后的状态
  componentDidUpdate(prevProps, precState, snapShot) {
    console.log(`componentDidUpdate钩子获取：${this.state.counter}`);
  }
  render() {
    return (
      <div id="max">
        <h2>{this.state.counter}</h2>
        <button onClick={this.change.bind(this)}>+1</button>
      </div>
    );
  }

  change() {
    //setState的第二个参数callback
    let { counter } = this.state;
    this.setState(
      {
        counter: counter + 1,
      },
      () => {
        console.log(`callback获取更新后的数据：${this.state.counter}`);
      }
    );
  }
}
