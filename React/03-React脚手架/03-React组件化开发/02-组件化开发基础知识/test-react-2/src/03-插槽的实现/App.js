import React, { Component } from "react";
import NavBar from "./NavBar.js";
require("./index.css");

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "NavBar",
    };
  }
  render() {
    return (
      <div id="max">
        <h2>NavBar</h2>
        <NavBar
          nav_left={this.nav_left()}
          nav_center={this.nav_center()}
          nav_right={this.nav_right()}
        />
      </div>
    );
  }
  nav_left() {
    return <div>left</div>;
  }
  nav_center() {
    return (
      <div>
        <h4>center</h4>
      </div>
    );
  }
  nav_right() {
    return <div>right</div>;
  }
  // render() {
  //   return (
  //     <div id="max">
  //       <h2>{this.state.title}</h2>
  //       <NavBar>
  //         <div>left</div>
  //         <div>
  //           <h4>center</h4>
  //         </div>
  //         <div>right</div>
  //       </NavBar>
  //     </div>
  //   );
  // }
}
