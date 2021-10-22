import { PureComponent } from "react";

import classNames from "classnames";
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isClass2: true,
    };
  }
  render() {
    const { isClass2 } = this.state;
    return (
      <main>
        {/*原生绑定*/}
        <div>
          {/*绑定多个class*/}
          {/*不能直接绑定数组，会转化成"class1,class2"*/}
          <h2 className={["class1", "class2"]}>App标题1</h2>
          {/*可以直接写入同一个String中（注意类名之间隔开要加空格）*/}
          <h2 className={"class1 class2 class3 class4"}>App标题2</h2>
          {/*可以使用join进行分隔（不用考虑空格问题）*/}
          <h2 className={["class1", "class2"].join(" ")}>App标题3</h2>
          {/*与state联动时，就变的比较麻烦了*/}
          <h2 className={"class1" + (isClass2 ? " class2" : "")}>App标题4</h2>
          <h2 className={["class1", isClass2 ? "class2" : ""].join(" ")}>
            App标题5
          </h2>
        </div>
        <hr />
        {/*使用classnames*/}
        <div>
          {/*可以直接依次传入类名*/}
          <h2 className={classNames("class1", "class2", "class3")}>App标题1</h2>
          {/*当然也可使用三元表达式*/}
          <h2 className={classNames("class1", isClass2 ? "class2" : "class3")}>
            App标题2
          </h2>
          {/*可以传入Object）*/}
          <h2 className={classNames({ class2: isClass2 })}>App标题3</h2>
          {/*Object,结合其它必传项*/}
          <h2 className={classNames("class1", { class2: isClass2 })}>
            App标题4
          </h2>
          {/*Array结合Object*/}
          <h2 className={classNames(["class1", { class2: isClass2 }])}>
            App标题5
          </h2>
        </div>
      </main>
    );
  }
}
