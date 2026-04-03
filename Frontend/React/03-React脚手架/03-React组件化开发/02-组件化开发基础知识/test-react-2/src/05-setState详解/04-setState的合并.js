import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Ashun",
      level: 88,
    };
  }
  render() {
    return (
      <div id="max">
        <h2>{this.state.name}</h2>
        <h2>{this.state.level}</h2>
        <button onClick={this.changeLevel.bind(this)}>+1</button>
      </div>
    );
  }
  changeLevel() {
    this.setState((state, props) => {
      return { level: state.level + 1 };
    });
    this.setState((state, props) => {
      return { level: state.level + 1 };
    });
    this.setState((state, props) => {
      return { level: state.level + 1 };
    });
    // this.setState({
    //   level: this.state.level + 1,
    // });
    // this.setState({
    //   level: this.state.level + 2,
    // });
    // this.setState({
    //   level: this.state.level * 2,
    // });‘
  }
}
