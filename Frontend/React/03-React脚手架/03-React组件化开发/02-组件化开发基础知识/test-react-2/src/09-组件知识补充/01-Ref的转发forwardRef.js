import React, { createRef, forwardRef, PureComponent } from "react";

function Child(props, ref) {
  return (
    <div id="child">
      <h2 ref={ref}>我是Child组件</h2>
    </div>
  );
}
let ForwardRefChild = forwardRef(Child);

export default class App extends PureComponent {
  constructor() {
    super();
    this.h2RefApp = createRef();
    this.h2RefChild = createRef();
  }
  render() {
    return (
      <main>
        <h2 ref={this.h2RefApp}>App</h2>
        <ForwardRefChild ref={this.h2RefChild} />
        <button onClick={this.getH2.bind(this)}>获取h2</button>
      </main>
    );
  }
  getH2() {
    console.log(this.h2RefApp.current);
    console.log(this.h2RefChild.current);
  }
}

// import React, { createRef, forwardRef, PureComponent } from "react";

// function Child(props, ref) {
//   return (
//     <div id="child">
//       <h2 ref={ref}>我是Child组件</h2>
//     </div>
//   );
// }
// let ForwardRefChild = forwardRef(Child);

// export default class App extends PureComponent {
//   constructor() {
//     super();
//     this.h2RefApp = createRef();
//     this.h2RefChild = createRef();
//   }
//   render() {
//     return (
//       <main>
//         <h2 ref={this.h2RefApp}>App</h2>
//         <ForwardRefChild ref={this.h2RefChild} />
//         <button onClick={this.getH2.bind(this)}>获取h2</button>
//       </main>
//     );
//   }
//   getH2() {
//     console.log(this.h2RefApp.current);
//     console.log(this.h2RefChild.current);
//   }
// }
