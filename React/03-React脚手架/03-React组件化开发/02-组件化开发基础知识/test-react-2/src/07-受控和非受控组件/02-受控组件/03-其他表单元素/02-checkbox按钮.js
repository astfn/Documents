import React, { PureComponent } from "react";
/*
  单选
*/
// export default class App extends PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       isSlect: false,
//     };
//   }
//   render() {
//     return (
//       <form>
//         <label>
//           <input
//             type="checkbox"
//             checked={this.state.isSlect}
//             onChange={(e) => this.handleChange(e)}
//           ></input>
//           同意该协议
//         </label>
//       </form>
//     );
//   }
//   handleChange(e) {
//     this.setState({
//       isSlect: e.target.checked,
//     });
//     console.log(e.target.checked);
//   }
// }
/*
  多选
*/
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isSlects: ["唱歌", "跑酷", "Coding"],
    };
    this.likes = ["唱歌", "街舞", "跑酷", "Coding"];
  }
  render() {
    return (
      <form>
        选择你的爱好：
        {this.likes.map((item) => {
          return (
            <div key={item}>
              <label>
                <input
                  type="checkbox"
                  value={item}
                  checked={this.state.isSlects.includes(item)}
                  onChange={(e) => this.handleChange(e)}
                ></input>
                {item}
              </label>
              <br />
            </div>
          );
        })}
      </form>
    );
  }
  handleChange(e) {
    const isSelects = [...this.state.isSlects];
    let newValue = e.target.value;
    let index = isSelects.indexOf(newValue);
    if (index === -1) {
      isSelects.push(newValue);
    } else {
      isSelects.splice(index, 1);
    }
    this.setState({
      isSlects: isSelects,
    });
    console.log(isSelects);
  }
}
