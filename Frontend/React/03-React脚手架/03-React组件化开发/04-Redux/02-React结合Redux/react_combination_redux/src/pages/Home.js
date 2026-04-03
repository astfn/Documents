// import { PureComponent } from "react";
// import store from "../store";
// import { incrementAction, addAction } from "../store/actionCreators.js";

// export default class Home extends PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       counter: store.getState().counter,
//     };
//     this.unSubscribe = null;
//   }
//   componentDidMount() {
//     //将取消侦听的函数保存下来
//     this.unSubscribe = store.subscribe(() => {
//       this.setState({
//         counter: store.getState().counter,
//       });
//     });
//   }
//   componentWillUnmount() {
//     //组件卸载前取消订阅
//     this.unSubscribe();
//   }
//   render() {
//     return (
//       <div id="home">
//         <h2>Home</h2>
//         <button onClick={() => this.increment()}>+1</button>
//         <strong>{this.state.counter}</strong>
//         <button onClick={() => this.addNumber(6)}>+6</button>
//       </div>
//     );
//   }
//   increment() {
//     store.dispatch(incrementAction());
//   }
//   addNumber(num) {
//     store.dispatch(addAction(num));
//   }
// }

import { PureComponent } from "react";

// import connect from "../utils/connect.js";/* 独立封装connect\context */
import { connect } from "react-redux"; /* react-redux */

import { incrementAction, addAction } from "../store/actionCreators.js";

class Home extends PureComponent {
  render() {
    return (
      <div id="home">
        <h2>Home</h2>
        <button onClick={() => this.props.increment()}>+1</button>
        <strong>{this.props.counter}</strong>
        <button onClick={() => this.props.addNumber(6)}>+6</button>
      </div>
    );
  }
}

const mapStateToProps = (stateInStore) => ({
  counter: stateInStore.counter,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => {
    dispatch(incrementAction());
  },
  addNumber: (num) => {
    dispatch(addAction(num));
  },
});

const connectStore_Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default connectStore_Home;
