import { PureComponent } from "react";
import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
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
