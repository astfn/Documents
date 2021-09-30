import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      title: "Ashuntefannao",
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.title !== this.state.title) {
      return true;
    }
    return false;
  }
  render() {
    console.log("App render");
    return (
      <div id="max">
        <h2>{this.state.title}</h2>
        <button onClick={this.addCounter.bind(this)}>counter+1</button>
      </div>
    );
  }
  addCounter() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
}
