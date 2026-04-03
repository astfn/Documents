import { PureComponent } from "react";
import { connect } from "react-redux";

import { incrementAction, addAction } from "../store/counter/actionCreators.js";

import { fetchHomeMultidataAction } from "../store/home/actionCreators.js";

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchHomeMultidata();
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
  counter: stateInStore.counterInfo.counter,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => {
    dispatch(incrementAction());
  },
  addNumber: (num) => {
    dispatch(addAction(num));
  },
  fetchHomeMultidata() {
    dispatch(fetchHomeMultidataAction());
  },
});

const connectStore_Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default connectStore_Home;
