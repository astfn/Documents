import React, { PureComponent, createRef } from "react";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultUserName = "Ashun";
    this.userNameRef = createRef();
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="">
            用户名：
            <input
              defaultValue={this.defaultUserName}
              type="text"
              name="userName"
              ref={this.userNameRef}
            />
          </label>
          <input type="submit" value="提交" />
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.userNameRef.current.value);
  }
}
