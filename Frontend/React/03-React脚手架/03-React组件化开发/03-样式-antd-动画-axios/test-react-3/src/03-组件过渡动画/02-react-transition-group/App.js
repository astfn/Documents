import { PureComponent } from "react";
// import CSSTransitionAnimate from "./CSSTransition.js";
// import SwitchTransitionAnimate from "./SwitchTransition.js";
import TransitionGroupAnimate from "./TransitionGroup.js";

export default class App extends PureComponent {
  render() {
    return (
      <main>
        {/* <CSSTransitionAnimate />
        <SwitchTransitionAnimate /> */}
        <TransitionGroupAnimate />
      </main>
    );
  }
}
