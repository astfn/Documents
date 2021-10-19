import { Fragment, PureComponent } from "react";

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      pStyle: {
        color: "white",
        backgroundColor: "skyblue",
        textDecoration: `line-through`,
      },
    };
  }
  render() {
    const { pStyle } = this.state;
    return (
      <Fragment>
        <h2
          style={{
            color: "white",
            backgroundColor: "orange",
            borderRadius: "10px",
          }}
        >
          App组件
        </h2>
        <p style={pStyle}>Ashuntefannao</p>
        <button onClick={this.changeStyle.bind(this)}>改变颜色</button>
      </Fragment>
    );
  }
  changeStyle() {
    let pStyle = Object.assign(
      { ...this.state.pStyle },
      {
        color: "#e74c3c",
      }
    );
    this.setState({
      pStyle,
    });
  }
}
