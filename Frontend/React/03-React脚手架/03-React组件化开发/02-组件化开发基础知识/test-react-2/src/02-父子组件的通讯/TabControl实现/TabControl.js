import React, { Component } from "react";
//子组件
export default class TabControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }
  render() {
    let { tabs, changeIndex } = this.props;
    let { currentIndex } = this.state;
    return (
      <div className="TabControl">
        {tabs.map((tab, index) => (
          <div
            className="tabs"
            onClick={() => {
              this.changeIndex(index);
              changeIndex(index);
            }}
            key={index}
          >
            <span className={currentIndex === index ? "active" : ""}>
              {tab}
            </span>
          </div>
        ))}
      </div>
    );
  }
  changeIndex(index) {
    this.setState({
      currentIndex: index,
    });
    //改变后，异步打印才能得到正确结果,因为setState是异步更新的。
    setTimeout(() => {
      console.log(this.state.currentIndex);
    });
  }
}
