import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
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
    //直接变更state，虽然数据发生了改变，但React不能够监听这种行为，视图不会重新渲染
    // this.state.counter++
    // console.log(this.state.counter)

    // 需要使用setState告知状态变更
    let { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
    console.log(`同步打印结果：${this.state.counter}`);
    setTimeout(() => {
      console.log(`异步打印结果：${this.state.counter}`);
    });
  }
}
