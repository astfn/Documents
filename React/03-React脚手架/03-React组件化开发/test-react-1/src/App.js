import React, { Component } from "react";

/*
    类组件
*/
// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       message: "Ashun",
//     };
//   }
//   render() {
//     let test = this.state.test ? <strong>{this.state.test}</strong> : false;
//     return (
//       <main>
//         <h1>Ashuntefannao</h1>
//         <button onClick={this.showTest.bind(this)}>showTest</button>
//         <button onClick={this.changeTest.bind(this)}>changeTest</button>
//         {test}
//       </main>
//     );
//   }
//   showTest() {
//     this.setState({
//       test: "showTest",
//     });
//     console.log(this.state);
//   }
//   changeTest() {
//     this.setState({
//       test: "后续添加的state，也能实现响应式",
//     });
//     console.log(this.state);
//   }

// }

/*
    函数组件
*/
// export default function App() {
//   return (
//     <main>
//       <h1>Ashuntefannao</h1>
//     </main>
//   );
// }

/*
    测试生命周期钩子函数
  */
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isDestroy: false,
    };
    console.log("constructor执行，初始化组件");
  }
  render() {
    console.log("render执行，渲染组件");
    return (
      <main>
        <h1>Ashuntefannao</h1>
        {!this.state.isDestroy && <ChildCpn />}
        <button onClick={this.destroy.bind(this)}>点击卸载子组件</button>
      </main>
    );
  }
  /*
    钩子函数
  */
  componentDidMount() {
    console.log("componentDidMount执行，组件挂载(渲染)完毕");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate执行，触发更新，组件重新渲染完毕");
  }

  /* 操作*/
  destroy() {
    this.setState({
      isDestroy: !this.state.isDestroy,
    });
  }
}

class ChildCpn extends Component {
  constructor() {
    super();
    this.state = {
      style: { backgroundColor: "#3498db", color: "white", padding: "5px 0px" },
    };
  }
  render() {
    return (
      <div id="child">
        <h3 style={this.state.style}>我是子组件</h3>
      </div>
    );
  }
  /* 子组件被移除 */
  componentWillUnmount() {
    console.log("componentWillUnmount执行，子组件ChildCpn移除(卸载)前执行");
  }
}
