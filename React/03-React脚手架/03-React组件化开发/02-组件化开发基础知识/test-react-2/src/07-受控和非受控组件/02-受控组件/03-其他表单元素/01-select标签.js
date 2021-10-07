import React, { PureComponent } from "react";
/*
  单选
*/
// export default class App extends PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       selectValue: "Ashun",
//     };
//   }
//   render() {
//     return (
//       <form>
//         <select
//           value={this.state.selectValue}
//           onChange={(e) => this.handleChange(e)}
//         >
//           <option value="Ashuntefannao">Ashuntefannao</option>
//           <option value="Ashun">Ashun</option>
//           <option value="SHUN">SHUN</option>
//           <option value="ASHUN">ASHUN</option>
//         </select>
//       </form>
//     );
//   }
//   handleChange(e) {
//     this.setState({
//       selectValue: e.target.value,
//     });
//     console.log(e.target.value);
//   }
// }
/*
  多选
*/
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectValue: ["ASHUN", "SHUN"],
    };
  }
  render() {
    return (
      <form>
        <select
          multiple
          value={this.state.selectValue}
          onInput={(e) => this.handleChange(e)}
        >
          <option value="Ashuntefannao">Ashuntefannao</option>
          <option value="Ashun">Ashun</option>
          <option value="SHUN">SHUN</option>
          <option value="ASHUN">ASHUN</option>
        </select>
      </form>
    );
  }
  handleChange(e) {
    let selectValue = [...this.state.selectValue];
    let newValue = e.target.value;
    let isSelect = selectValue.indexOf(newValue);
    if (isSelect === -1) {
      selectValue.push(newValue);
    } else {
      selectValue.splice(isSelect, 1);
    }
    this.setState({
      selectValue: selectValue,
    });
    console.log(selectValue);
  }
}
