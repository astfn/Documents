import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }
  // componentDidUpdate() {
  //   console.log("App 更新");
  // }

  render() {
    console.log("App render");
    return (
      <div id="max">
        <Header />
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

class Header extends Component {
  constructor() {
    super();
    this.state = {
      title: "Header",
    };
  }
  // componentDidUpdate() {
  //   console.log("Header 更新");
  // }

  render() {
    console.log("Header render");
    return <header>{this.state.title}</header>;
  }
}
class Footer extends Component {
  constructor() {
    super();
    this.state = {
      title: "Footer",
    };
  }
  // componentDidUpdate() {
  //   console.log("Footer 更新");
  // }
  render() {
    console.log("Footer render");
    return <footer>{this.state.title}</footer>;
  }
}
