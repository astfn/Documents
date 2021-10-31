import { PureComponent } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./CSS/CSSTransition.css";
import styled from "styled-components";
const StyledWrapper = styled.div`
  padding: 20px;
  text-align: center;
  /* visibility: hidden; */
`;
export default class TransitionGroupAnimate extends PureComponent {
  constructor() {
    super();
    this.state = { users: ["Ashun", "SHUN"] };
  }
  render() {
    return (
      <StyledWrapper>
        <TransitionGroup>
          {this.state.users.map((item, index) => {
            return (
              <CSSTransition key={index} classNames="H2" timeout={800} appear>
                <div>
                  <p>{item}</p>{" "}
                  <button onClick={() => this.removeItem(index)}>-</button>{" "}
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <button onClick={() => this.addUser()}>addUser</button>
      </StyledWrapper>
    );
  }
  addUser() {
    let newUsers = [...this.state.users];
    let id = Date.now().toString().substr(-5, 5);
    newUsers.push(`ASHUN${id}`);
    this.setState({ users: newUsers });
    console.log(this.state.users);
  }
  removeItem(index) {
    let newUsers = [...this.state.users];
    newUsers.splice(index, 1);
    this.setState({ users: newUsers });
  }
}
