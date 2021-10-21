/*
    attrs的使用
*/
// import { PureComponent } from "react";
// import styled from "styled-components";

// let InputStyled = styled.input.attrs({
//   type: "password", //type、placeholder，这些特殊属性，可在标签中直接传入，也可在此定义
//   bg_color: "skyblue", //自定义公共样式属性
//   b_radius: (props) => props.radius || "0px", //attrs属性值在定义时，也可访问props
//   color: `yellow`, //普通样式不起作用
// })`
//   border: 3px dotted;
//   outline: none;
//   margin-top: 60px;
//   //也可通过props访问attrs中的属性
//   background-color: ${(props) => props.bg_color};
//   border-radius: ${(props) => props.b_radius};
// `;
// export default class App extends PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       myColor: "yellow",
//     };
//   }
//   render() {
//     return <InputStyled type="text" placeholder="请输入用户名" radius="10px" />;
//   }
// }

/*
    props的传递、使用
*/
// import { PureComponent } from "react";
// import styled from "styled-components";
// import Home from "./Home/Home.js";

// let WrapperComponent = styled.main`
//   /* color: orange; */
//   color: ${(props) => props.color};
//   background: black;
//   border-radius: 3px;
// `;

// export default class App extends PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       myColor: "yellow",
//     };
//   }
//   render() {
//     return (
//       <WrapperComponent color={this.state.myColor}>
//         <h2>App组件</h2>
//         <p>Ashuntefannao</p>
//         <Home />
//       </WrapperComponent>
//     );
//   }
// }

/*
  元素类型、样式表的继承
*/
// import { Fragment, PureComponent } from "react";
// import styled from "styled-components";

// //普通按钮
// const BaseBtn = styled.button`
//   margin: 10px;
//   padding: 8px 20px;
//   border-radius: 5px;
//   font-size: 20px;
//   color: white;
//   background-color: #34495e;
// `;
// //确认按钮
// const ConfirmBtn = styled(BaseBtn)`
//   background-color: #3498db;
// `;
// //警示按钮
// const WarningBtn = styled(BaseBtn)`
//   background-color: #e74c3c;
// `;

// export default class App extends PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       myColor: "yellow",
//     };
//   }
//   render() {
//     return (
//       <Fragment>
//         <BaseBtn>普通按钮</BaseBtn>
//         <ConfirmBtn>确认按钮</ConfirmBtn>
//         <WarningBtn>警示按钮</WarningBtn>
//       </Fragment>
//     );
//   }
// }

/*
  ThemeProvider设置主题
*/
import { PureComponent } from "react";
import styled, { ThemeProvider } from "styled-components";

const HomeWrapper = styled.div`
  color: ${(props) => props.theme.color};
  font-size: ${(props) => props.theme.fontSize};
`;
function Home() {
  return (
    <HomeWrapper>
      <p>我是Home组件</p>
    </HomeWrapper>
  );
}

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      myColor: "yellow",
    };
  }
  render() {
    return (
      <ThemeProvider theme={{ color: "red", fontSize: "30px" }}>
        <Home />
      </ThemeProvider>
    );
  }
}
