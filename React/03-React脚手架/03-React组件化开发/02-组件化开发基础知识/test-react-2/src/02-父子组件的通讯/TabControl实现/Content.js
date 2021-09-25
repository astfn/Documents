import React, { Component } from "react";
export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <h3>{this.props.content}</h3>
      </div>
    );
  }
}
