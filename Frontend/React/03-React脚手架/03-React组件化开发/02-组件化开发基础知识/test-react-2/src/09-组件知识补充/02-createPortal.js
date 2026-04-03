import { PureComponent } from "react";
import { createPortal } from "react-dom";

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isShow: false,
    };
  }
  toast() {
    return (
      <ToastAlert>
        <strong>Ashuntefannao</strong>
        <button
          onClick={() => {
            this.changeShow();
          }}
        >
          关闭
        </button>
      </ToastAlert>
    );
  }
  render() {
    return (
      <main>
        <h2>App</h2>
        <button
          onClick={() => {
            this.changeShow();
          }}
        >
          toast
        </button>
        {this.toast()}
      </main>
    );
  }

  changeShow() {
    let newShow = !this.state.isShow;
    this.setState({
      isShow: newShow,
    });
    document.querySelector("#toast").style.display = newShow ? `flex` : `none`;
  }
}

class ToastAlert extends PureComponent {
  constructor() {
    super();
    this.createToast();
  }
  createToast() {
    this.toast = document.createElement("div");
    this.toast.id = "toast";
    this.toast.style.display = `none`;
    document.body.append(this.toast);
  }
  render() {
    return createPortal(this.props.children, this.toast);
  }
}
