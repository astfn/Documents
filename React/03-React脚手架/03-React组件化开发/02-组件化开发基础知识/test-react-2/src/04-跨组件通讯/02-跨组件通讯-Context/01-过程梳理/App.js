import React, { Component } from "react";

//创建Context对象
const UserContext = React.createContext({
  nickName: "默认名称",
  level: "默认等级",
});

export default class App extends Component {
  constructor() {
    super();
    this.title = "Ashuntefannao";
    this.state = {
      nickName: "Ashun",
      level: 99,
    };
  }
  render() {
    return (
      <div id="main">
        <h2 onClick={this.change.bind(this)}>{this.title}</h2>
        {/* 使用Context.Provider组件，将订阅组件包裹*/}
        <UserContext.Provider
          value={{ nickName: this.state.nickName, level: this.state.level }}
        >
          <Profile />
        </UserContext.Provider>
      </div>
    );
  }
  change() {
    let newState = { nickName: "更换名称：SHUN", level: "98" };
    this.setState(newState);
  }
}

function Profile() {
  return (
    <div id="profile">
      <header>profile</header>
      <ProfileContent />
    </div>
  );
}

/*  class订阅组件 */
// class ProfileContent extends Component {
//   //订阅组件设置contextType静态属性，订阅目标Context对象
//   static contextType = UserContext;
//   render() {
//     return (
//       <div className="ProfileContent">
//         <ul>
//           <li>{this.context.nickName}</li>    {/* 通过this.context访问共享变量 */}
//           <li>{this.context.level}</li>
//         </ul>
//       </div>
//     );
//   }
// }
//另一种设置静态属性的形式
// ProfileContent.contextType = UserContext;

/* 函数订阅组件 */
function ProfileContent(props) {
  return (
    <UserContext.Consumer>
      {
        (context)=>{
          return (
            <div className="ProfileContent">
              <ul>
                <li>{context.nickName}</li>
                <li>{context.level}</li>
              </ul>
            </div>
          )
        }
      }
    </UserContext.Consumer>
  );
}
