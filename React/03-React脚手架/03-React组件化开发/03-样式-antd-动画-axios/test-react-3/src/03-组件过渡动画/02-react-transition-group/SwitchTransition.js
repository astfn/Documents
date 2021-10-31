import { PureComponent } from "react";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./CSS/SwitchTransition.css";
import styled from "styled-components";
const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  .child2,
  .child1 {
    color: white;
    font-size: 18px;
  }
  .child1 {
    background-color: #e67e22;
  }
  .child2 {
    background-color: #2980b9;
  }
`;
export default class SwitchTransitionAnimate extends PureComponent {
  constructor() {
    super();
    this.state = {
      isChange: true,
    };
  }
  render() {
    const { isChange } = this.state;
    return (
      <StyledWrapper>
        {/* <SwitchTransition mode="in-out">
          <CSSTransition
            key={isChange ? "in" : "out"}
            timeout={500}
            classNames="btn"
          >
            <button onClick={() => this.setState({ isChange: !isChange })}>
              {isChange ? "on" : "off"}
            </button>
          </CSSTransition>
        </SwitchTransition> */}
        <SwitchTransition mode="in-out">
          <CSSTransition
            key={isChange ? "in" : "out"}
            timeout={500}
            classNames="btn"
          >
            {this.currentChild()}
          </CSSTransition>
        </SwitchTransition>
        <button onClick={() => this.setState({ isChange: !isChange })}>
          change
        </button>
      </StyledWrapper>
    );
  }
  currentChild() {
    return this.state.isChange ? (
      <div className="child1">我是子组件1</div>
    ) : (
      <div className="child2">我是子组件2</div>
    );
  }
}
