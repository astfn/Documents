import React, { Component } from "react";

// export default class App extends Component {
//   constructor() {
//     super();
//     this.title = "Ashuntefannao";
//     this.state = {
//       nickName: "Ashun",
//       level: 99,
//     };
//   }
//   render() {
//     let { nickName, level } = this.state;
//     return (
//       <div id="main">
//         <h2>{this.title}</h2>
//         <Profile nickName={nickName} level={level} />
//       </div>
//     );
//   }
// }

// function Profile(props) {
//   let { nickName, level } = props;
//   return (
//     <div id="profile">
//       <header>profile</header>
//       <ProfileContent nickName={nickName} level={level} />
//     </div>
//   );
// }
// function ProfileContent(props) {
//   return (
//     <div className="ProfileContent">
//       <ul>
//         <li>{props.nickName}</li>
//         <li>{props.level}</li>
//       </ul>
//     </div>
//   );
// }

/*

  简洁方式：解构语法传递
*/
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
        <h2>{this.title}</h2>
        <Profile {...this.state} />
      </div>
    );
  }
}

function Profile(props) {
  return (
    <div id="profile">
      <header>profile</header>
      <ProfileContent {...props} />
    </div>
  );
}
function ProfileContent(props) {
  return (
    <div className="ProfileContent">
      <ul>
        <li>{props.nickName}</li>
        <li>{props.level}</li>
      </ul>
    </div>
  );
}

