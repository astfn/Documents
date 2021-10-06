import React, { PureComponent } from "react";
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      userName: "Ashun",
    };
  }
  render() {
    const { userName } = this.state;
    return (
      <form
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <label>
          用户名:
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              this.changeName(e);
            }}
          />
        </label>
        <button>提交</button>
      </form>
    );
  }
  changeName(e) {
    this.setState({
      userName: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.userName);
  }
}
