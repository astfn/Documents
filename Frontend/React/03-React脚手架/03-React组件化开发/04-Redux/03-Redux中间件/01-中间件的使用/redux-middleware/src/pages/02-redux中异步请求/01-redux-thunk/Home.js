import { PureComponent } from "react";
import { connect } from "react-redux";

import {
  incrementAction,
  addAction,
  getHomeMultidataAction,
} from "../../../store/actionCreators.js";

class Home extends PureComponent {
  componentDidMount() {
    this.props.getHomeMultidata();
  }
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
  getHomeMultidata() {
    dispatch(getHomeMultidataAction());
  },
});

const connectStore_Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default connectStore_Home;
