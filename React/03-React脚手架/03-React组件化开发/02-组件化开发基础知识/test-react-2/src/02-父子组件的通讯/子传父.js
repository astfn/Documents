import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div id="main">
        <h1>父组件数据:{this.state.count}</h1>
        <button onClick={this.add.bind(this)}>父组件按钮：+1</button>
        <Child add={this.add.bind(this)} />
      </div>
    );
  }
  add() {
    this.setState({
      count: this.state.count + 1,
    });
  }
}
class Child extends Component {
  render() {
    return <button onClick={this.props.add}>子组件按钮：+1</button>;
  }
}
// class Child extends Component {
//   render() {
//     return (
//       <button
//         onClick={() => {
//           this.props.add("子组件改变父组件state");
//         }}
//       >
//         子组件按钮：+1
//       </button>
//     );
//   }
// }
