import React, { Component } from "react";
import PropTypes from "prop-types";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Ashun",
      age: 18,
    };
  }
  render() {
    return (
      <div id="max">
        <Child age={this.state.age} />
      </div>
    );
  }
}
class Child extends Component {
  static defaultProps = {
    name: "Ashuntefannao",
  };
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
  };
  constructor(props) {
    super();
    console.log(this.props);
  }
  render() {
    console.log(this.props);
    return (
      <div id="child">
        <h1>Ashuntefannao</h1>
        <ul>
          {Object.entries(this.props).map(([key, val]) => {
            return (
              <li key={key}>
                {key}--{val}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    console.log(this.props);
  }
}
// Child.propTypes = {
//   name: PropTypes.string.isRequired,
//   age: PropTypes.number,
// };

/*
  默认值的设置：
  1. 不依赖"prop-types"
  2. 当设置了该属性为必传项的同时，又定义了默认值，则父组件不传递该变量时，也不会报错，因为配置了默认值，所以该情况会应用默认值。
*/
// Child.defaultProps = {
//   name: "Ashuntefannao",
// };
// function Child(props) {
//   return (
//     <div id="child">
//       <h1>Ashuntefannao</h1>
//       <ul>
//         {Object.entries(props).map(([key, val]) => {
//           return (
//             <li key={key}>
//               {key}--{val}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
