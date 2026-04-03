import React from "react";
import ReactDOM from "react-dom";
/*
  01-React中使用CSS
*/
// import App from "./01-React中使用CSS/01-普通解决方案/01-引入CSS文件/App.js";
// import App from "./01-React中使用CSS/01-普通解决方案/02-内联样式/App.js";
// import App from "./01-React中使用CSS/01-普通解决方案/03-CSS_Modules/App.js";

// import App from "./01-React中使用CSS/02-styled-components/App.js";

// import App from "./01-React中使用CSS/03-classnames库/App.js";

/*
  02-antd库的使用
*/
// import "antd/dist/antd.css"; //引入antd全局样式
import "antd/dist/antd.less"; //之后自定义主题，引入的将是less

// import App from "./02-antd库的使用/01-基本使用/App.js";
// import App from "./02-antd库的使用/02-高级配置/App.js";

/*全局设置moment时区*/
// import "moment/locale/zh-cn";
// import App from "./02-antd库的使用/03-案例体验/App.js";

/*
  03-组件过渡动画
*/
// import App from "./03-组件过渡动画/01-原生实现/App.js";
import App from "./03-组件过渡动画/02-react-transition-group/App.js";

/*
  04-React中使用axios
*/
// import App from "./04-React中使用axios/App.js";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById("root")
);
