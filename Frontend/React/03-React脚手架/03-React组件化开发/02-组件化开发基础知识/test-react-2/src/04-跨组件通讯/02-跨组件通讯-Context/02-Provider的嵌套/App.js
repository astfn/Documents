import React, { Component } from "react";

//创建Context对象
const UserContext = React.createContext({
  nickName: "默认名称",
  level: "默认等级",
});
//嵌套的Context对象
const TestColorContext=React.createContext({
  color:"red"
})

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
          <TestColorContext.Provider value={{color:"red"}}>
            <Profile />
          </TestColorContext.Provider>
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
//     render() {
//     return (
//       <UserContext.Consumer>
//       {(user)=>(
//         <TestColorContext.Consumer>
//           {
//             (theme)=>
//              (
//               <div className="ProfileContent">
//                 <ul style={{color:theme.color}}>
//                   <li>{user.nickName}</li>    
//                   <li>{user.level}</li>
//                 </ul>
//               </div>
//              )
            
//           }
//         </TestColorContext.Consumer>
//       )
//       }
//       </UserContext.Consumer>
      
//     );
//   }
// }
//另一种设置静态属性的形式
// ProfileContent.contextType = UserContext;

/* 函数订阅组件 */
function ProfileContent(props) {
  return (
    <UserContext.Consumer>
    {(user)=>(
      <TestColorContext.Consumer>
        {
          (theme)=>
           (
            <div className="ProfileContent">
              <ul style={{color:theme.color}}>
                <li>{user.nickName}</li>    
                <li>{user.level}</li>
              </ul>
            </div>
           )
          
        }
      </TestColorContext.Consumer>
    )
    }
    </UserContext.Consumer>
  );
}
