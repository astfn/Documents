import { PureComponent } from "react";
import { connect } from "react-redux";
import {
  incrementAction,
  addAction,
  changeBannersAction,
  changeRecommendsAction,
} from "../../store/actionCreators.js";
import axios from "axios";

class Home extends PureComponent {
  componentDidMount() {
    axios({
      url: "http://123.207.32.32:8000/home/multidata",
    }).then(
      (res) => {
        const data = res.data.data;
        this.props.changeBanners(data.banner.list);
        this.props.changeRecommends(data.recommend.list);
        console.log(data.banner.list);
        console.log(data.recommend.list);
      },
      (err) => {
        console.log(err);
      }
    );
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
  changeBanners: (banners) => {
    dispatch(changeBannersAction(banners));
  },
  changeRecommends: (recommends) => {
    dispatch(changeRecommendsAction(recommends));
  },
});

const connectStore_Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default connectStore_Home;
