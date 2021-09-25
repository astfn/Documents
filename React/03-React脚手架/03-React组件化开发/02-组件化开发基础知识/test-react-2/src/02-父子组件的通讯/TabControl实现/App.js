import React, { Component } from "react";
import TabControl from "./TabControl.js";
import Content from "./Content.js";

require("./index.css");

export default class App extends Component {
  constructor() {
    super();
    this.tabs = ["流行", "新款", "精选"];
    this.state = {
      title: "TabControl",
      currentIndex: 0,
      contents: ["流行内容", "新款内容", "精选内容"],
    };
  }
  render() {
    let { currentIndex, contents } = this.state;
    return (
      <div id="max">
        <h2>TabControl</h2>
        <TabControl
          tabs={this.tabs}
          changeIndex={this.changeIndex.bind(this)}
        />
        <Content content={contents[currentIndex]} />
      </div>
    );
  }

  changeIndex(index) {
    this.setState({
      currentIndex: index,
    });
  }
}
