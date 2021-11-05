import { PureComponent } from "react";
import store from "../store";
import { decrementAction, subAction } from "../store/actionCreators.js";

export default class Detail extends PureComponent {
  constructor() {
    super();
    this.state = {
      counter: store.getState().counter,
    };
    this.unSubscribe = null;
  }
  componentDidMount() {
    //将取消侦听的函数保存下来
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter,
      });
    });
  }
  componentWillUnmount() {
    //组件卸载前取消订阅
    this.unSubscribe();
  }
  render() {
    return (
      <div id="detail">
        <h2>Detail</h2>
        <button onClick={() => this.decrement()}>-1</button>
        <strong>{this.state.counter}</strong>
        <button onClick={() => this.subNumber(6)}>-6</button>
      </div>
    );
  }
  decrement() {
    store.dispatch(decrementAction());
  }
  subNumber(num) {
    store.dispatch(subAction(num));
  }
}
