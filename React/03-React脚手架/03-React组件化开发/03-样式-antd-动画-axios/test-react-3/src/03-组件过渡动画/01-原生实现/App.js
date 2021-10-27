import { createRef, PureComponent } from "react";
import styled from "styled-components";
const StyledWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  text-align: center;
  div {
    margin: 20px;
    padding: 20px;
    color: white;
    font-size: 20px;
    background-color: #9b59b6;
    /* 动画 */
    animation: divDefault 1s forwards;
  }
  @keyframes divActive {
    from {
      transform: scale(0) rotate(0deg);
    }
    to {
      transform: scale(1) rotate(360deg);
    }
  }
  @keyframes divDefault {
    from {
      transform: scale(1) rotate(360deg);
    }
    to {
      transform: scale(0) rotate(0deg);
    }
  }
  .active {
    animation: divActive 1s forwards;
  }

  button {
    margin: 20px;
  }
`;
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = { isActive: true, isunMount: false };
    this.childRef = createRef();
  }

  render() {
    const { isActive, isunMount } = this.state;
    return (
      <StyledWrapper>
        {!isunMount && (
          <div className={isActive ? "active" : ""} ref={this.childRef}>
            我是子组件😀
          </div>
        )}
        <button onClick={() => this.changeShow()}>toggle</button>
      </StyledWrapper>
    );
  }
  changeShow() {
    const { isActive, isunMount } = this.state;
    if (isunMount) {
      this.setState({ isunMount: !isunMount });
    }
    this.setState(
      {
        isActive: !isActive,
      },
      () => {
        console.log(this.state.isActive);
        if (!this.state.isActive) {
          this.childRef.current.addEventListener("animationend", () => {
            this.setState({ isunMount: !isunMount });
          });
        }
      }
    );
  }
}
