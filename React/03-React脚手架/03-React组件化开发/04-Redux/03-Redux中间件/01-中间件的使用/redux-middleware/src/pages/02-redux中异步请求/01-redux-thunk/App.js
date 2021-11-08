import { PureComponent } from "react";
import Home from "./Home.js";
import Detail from "./Detail.js";
export default class App extends PureComponent {
  render() {
    return (
      <main>
        <Home />
        <hr />
        <Detail />
      </main>
    );
  }
}
