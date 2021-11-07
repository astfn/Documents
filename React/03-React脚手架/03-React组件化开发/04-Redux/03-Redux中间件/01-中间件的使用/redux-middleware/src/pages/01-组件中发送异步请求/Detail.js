import { PureComponent } from "react";
import { connect } from "react-redux";
import { decrementAction, subAction } from "../../store/actionCreators.js";

class Detail extends PureComponent {
  render() {
    return (
      <div id="detail">
        <h2>Detail</h2>
        <button onClick={() => this.props.decrement()}>-1</button>
        <strong>{this.props.counter}</strong>
        <button onClick={() => this.props.subNumber(6)}>-6</button>
        <p>home请求后，压入redux的数据</p>
        <ul>
          <li>
            <h5>banners:</h5>
          </li>
          {this.props.banners.map((item) => (
            <li key={item.acm}>{item.title}</li>
          ))}
          <li>
            <h5>recommends:</h5>
          </li>
          {this.props.recommends.map((item) => (
            <li key={item.acm}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (stateInStore) => ({
  counter: stateInStore.counter,
  banners: stateInStore.banners,
  recommends: stateInStore.recommends,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: () => {
    dispatch(decrementAction());
  },
  subNumber: (num) => {
    dispatch(subAction(num));
  },
});

const connectStore_Detail = connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
export default connectStore_Detail;
