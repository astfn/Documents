import React, { Component } from "react";
import { EventEmitter } from "events";

const EventBus = new EventEmitter();

/*
    跨级组件之间的通讯
*/
// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }
//   componentDidMount() {
//     EventBus.addListener("emitEvent", this.emitEvent);
//   }
//   componentWillUnmount() {
//     EventBus.removeListener("emitEvent", this.emitEvent);
//   }
//   emitEvent(...args) {
//     console.log(args);
//   }
//   render() {
//     return (
//       <div id="max">
//         <h2>Application</h2>
//         <Content />
//       </div>
//     );
//   }
// }

// class Content extends Component {
//   render() {
//     return (
//       <div id="main">
//         <h3>Main</h3>
//         <Article />
//       </div>
//     );
//   }
// }
// class Article extends Component {
//   constructor() {
//     super();
//     this.state = {
//       list: ["新闻资讯", "娱乐潮流", "时尚穿搭", "科技前沿"],
//     };
//   }
//   render() {
//     return (
//       <div className="article">
//         <ul>
//           {this.state.list.map((v) => {
//             return <li key={v}>{v}</li>;
//           })}
//         </ul>
//         <button onClick={this.emitEvent.bind(this)}>emitEvent</button>
//       </div>
//     );
//   }
//   emitEvent() {
//     EventBus.emit("emitEvent", "Hello App Component", "my name is Article");
//   }
// }

/*
    兄弟组件之间的通讯
*/
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Ashuntefannao",
    };
  }
  render() {
    return (
      <div id="max">
        <h2>{this.state.title}</h2>
        <Child1 />
        <Child2 />
      </div>
    );
  }
}
class Child1 extends Component {
  constructor() {
    super();
    this.state = {
      title: "我是Child1",
      list: null,
    };
  }
  componentDidMount() {
    EventBus.addListener("emitEvent", this.emitEvent.bind(this));
  }
  componentWillUnmount() {
    EventBus.removeListener("emitEvent", this.emitEvent);
  }
  emitEvent(list) {
    console.log(list);
    this.setState({ list });
  }
  render() {
    return (
      <div id="child1">
        <h3>{this.state.title}</h3>
        <ul>
          {this.state.list &&
            this.state.list.map((item) => {
              return <li key={item}>{item}</li>;
            })}
        </ul>
      </div>
    );
  }
}
class Child2 extends Component {
  constructor() {
    super();
    this.state = {
      title: "我是Child2",
      list: ["新闻资讯", "娱乐潮流", "时尚穿搭", "科技前沿"],
    };
  }
  render() {
    return (
      <div id="child2">
        <h3>{this.state.title}</h3>
        <button onClick={this.emitEvent.bind(this)}>
          点击向Child1发送事件
        </button>
      </div>
    );
  }
  emitEvent() {
    EventBus.emit("emitEvent", [...this.state.list]);
  }
}
