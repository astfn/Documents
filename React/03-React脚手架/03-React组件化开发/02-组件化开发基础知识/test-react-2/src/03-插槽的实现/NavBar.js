import React, { Component } from "react";

export default class NavBar extends Component {
  // render() {
  //   console.log(this.props.children);
  //   return (
  //     <div className="NavBar">
  //       <div className="nav-left">{this.props.children[0]}</div>
  //       <div className="nav-center">{this.props.children[1]}</div>
  //       <div className="nav-right">{this.props.children[2]}</div>
  //     </div>
  //   );
  // }
  render() {
    let { nav_left, nav_center, nav_right } = this.props;
    console.log(this.props.children);
    return (
      <div className="NavBar">
        <div className="nav-left">{nav_left}</div>
        <div className="nav-center">{nav_center}</div>
        <div className="nav-right">{nav_right}</div>
      </div>
    );
  }
}
