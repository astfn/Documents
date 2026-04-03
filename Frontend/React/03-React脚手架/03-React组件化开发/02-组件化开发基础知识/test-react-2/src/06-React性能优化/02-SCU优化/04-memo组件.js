import React, { Component, memo } from "react";

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
        <HeaderMemo counter={this.state.counter} />
        <h2>counter：{this.state.counter}</h2>
        <button onClick={this.addCounter.bind(this)}>+1</button>
        <FooterMemo />
      </div>
    );
  }
  addCounter() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
}

// const HeaderMemo = memo(function (props) {
//   console.log("Header render");
//   return <header>Header</header>;
// });
const HeaderMemo = memo(Header);
function Header() {
  console.log("Header render");
  return <header>Header</header>;
}

const FooterMemo = memo(function () {
  console.log("Footer render");
  return <footer>Footer</footer>;
});
