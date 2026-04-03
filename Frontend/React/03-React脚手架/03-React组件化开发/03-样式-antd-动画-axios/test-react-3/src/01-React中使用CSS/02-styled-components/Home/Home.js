import { PureComponent } from "react";
import styled from "styled-components";
let WrapperComponent = styled.div`
  color: white;
  background-color: #1abc9c;
  border-radius: 20px;
  padding: 5px;
  h2 {
    color: black;
  }
  ul > li {
    list-style: none;
    &.active {
      color: red;
      font-size: 18px;
    }
    &.active::before {
      content: "⭐";
    }
    &:hover {
      color: red;
    }
  }
`;
export default class Home extends PureComponent {
  render() {
    return (
      <WrapperComponent>
        <h2>Home组件</h2>
        <p>Home--ASHUNTEFANNAO</p>
        <ul>
          <li>新闻资讯</li>
          <li className="active">娱乐头条</li>
          <li>科技前沿</li>
        </ul>
      </WrapperComponent>
    );
  }
}
