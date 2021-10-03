import React, { PureComponent } from "react";

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      profile: {
        name: "Ashun",
        age: 18,
        tell: "13036548776",
      },
      friends: [
        { name: "张三", age: 19, tell: 15737546826, 特别关心: "√" },
        { name: "李四", age: 20, tell: 15154862574 },
        { name: "王五", age: 21, tell: 13284569751 },
      ],
    };
  }

  render() {
    let { profile } = this.state;
    return (
      <div id="max">
        <fieldset name="my">
          <legend>我的</legend>
          <ul>
            <li>
              <li>name：{profile.name}</li>
            </li>
            <li>age：{profile.age}</li>
            <li>tell：{profile.tell}</li>
          </ul>
        </fieldset>
        <button onClick={this.subAge.bind(this)}>改变年龄</button>
        <button onClick={this.addFriend.bind(this)}>添加好友数据</button>
        <fieldset name="friends">
          <legend>friends</legend>
          <ul>
            {this.state.friends.map((friend) => {
              return (
                <li key={friend.tell}>
                  {friend.name}
                  <ul>
                    {Object.entries(friend).map(([key, val]) => {
                      return key !== "name" ? (
                        <li key={val}>
                          {key}：{val}
                        </li>
                      ) : (
                        false
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </div>
    );
  }
  subAge() {
    let profile = { ...this.state.profile };
    profile.age--;
    this.setState({
      profile,
    });
  }
  addFriend() {
    let friends = [].concat(this.state.friends);
    friends.push({
      name: "小明",
      age: 12,
      tell: 13845784925,
    });
    this.setState({
      friends,
    });
  }
  // subAge() {
  //   this.state.profile.age -= 1;
  //   this.setState({
  //     profile: this.state.profile,
  //   });
  // }
  // addFriend() {
  //   this.state.friends.push({
  //     name: "小明",
  //     age: 12,
  //     tell: 13845784925,
  //   });
  //   this.setState({
  //     friends: this.state.friends,
  //   });
  // }
}
