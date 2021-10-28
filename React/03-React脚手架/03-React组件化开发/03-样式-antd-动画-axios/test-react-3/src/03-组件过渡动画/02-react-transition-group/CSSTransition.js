import { PureComponent } from "react";
import { CSSTransition } from "react-transition-group";

import "./CSS/CSSTransition.css";
import styled from "styled-components";
const StyledWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;
export default class CSSTransitionAnimate extends PureComponent {
  constructor() {
    super();
    this.state = { isShow: true };
  }
  render() {
    let { isShow } = this.state;
    console.log(isShow);
    return (
      <StyledWrapper>
        <CSSTransition
          in={isShow}
          classNames="H2"
          timeout={800}
          unmountOnExit
          appear
          onEnter={(el) => {
            console.log("入场动画开始");
          }}
          onEntering={(el) => {
            console.log("入场动画执行中……");
          }}
          onEntered={(el) => {
            console.log("入场动画结束");
          }}
          onExit={(el) => {
            console.log("离场动画开始");
          }}
          onExiting={(el) => {
            console.log("离场动画执行中……");
          }}
          onExited={(el) => {
            console.log("离场动画结束");
          }}
        >
          <h2>Ashuntefannao</h2>
        </CSSTransition>
        {/* <CSSTransition
          in={isShow}
          classNames="H2"
          timeout={800}
          unmountOnExit
          appear
        >
          <h2>Ashuntefannao</h2>
        </CSSTransition> */}
        <button onClick={() => this.changeShow()}>toggle</button>
      </StyledWrapper>
    );
  }
  changeShow() {
    this.setState({ isShow: !this.state.isShow });
  }
}
