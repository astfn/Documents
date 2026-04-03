import { PureComponent } from "react";
import { requestTestGet, requestTestPost } from "./service/Home";
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      reqData: null,
    };
  }
  componentDidMount() {
    requestTestGet({
      name: "Ashun",
      age: 18,
      like: "conding",
    }).then(
      (res) => {
        console.log("get请求发送完毕");
        console.log(res);
      },
      (err) => console.log(err)
    );
    requestTestPost({
      name: "Ashun",
      age: 18,
      like: "conding",
    }).then(
      (res) => {
        console.log("post请求发送完毕");
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
  render() {
    return (
      <main>
        <h2>App</h2>
      </main>
    );
  }
}
