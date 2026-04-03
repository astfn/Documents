import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      list: ["新闻资讯", "娱乐动态"],
    };
  }
  render() {
    return (
      <div id="max">
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button onClick={this.addItems.bind(this)}>添加数据</button>
      </div>
    );
  }
  addItems() {
    this.setState({
      // list: [...this.state.list, "科技前沿"],
      list: ["科技前沿", ...this.state.list],
    });
  }
}
