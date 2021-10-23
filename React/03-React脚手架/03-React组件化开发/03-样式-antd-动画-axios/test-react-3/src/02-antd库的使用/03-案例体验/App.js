import { PureComponent } from "react";
import ASComment1 from "./01-Antd完成/ASComment.js";
import ASComment from "./02-React编写/ASComment.js";

import styled from "styled-components";
const StyleWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
export default class App extends PureComponent {
  render() {
    return (
      <StyleWrapper>
        <ASComment />
        <ASComment1 />
      </StyleWrapper>
    );
  }
}
