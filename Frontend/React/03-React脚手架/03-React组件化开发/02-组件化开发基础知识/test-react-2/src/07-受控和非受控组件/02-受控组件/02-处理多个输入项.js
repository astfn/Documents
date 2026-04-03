import React, { PureComponent } from "react";
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      userName: "Ashun",
      password: "",
      testCode: "",
    };
  }
  render() {
    const { userName, password, testCode } = this.state;
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
            name="userName"
            value={userName}
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
        </label>
        <br />
        <label>
          密码:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
        </label>
        <br />
        <label>
          验证码:
          <input
            type="text"
            name="testCode"
            value={testCode}
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
        </label>
        <br />
        <button>提交</button>
      </form>
    );
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value, //通过name属性，动态锁定对应的state
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { userName, password, testCode } = this.state;
    console.log(userName, password, testCode);
  }
}
