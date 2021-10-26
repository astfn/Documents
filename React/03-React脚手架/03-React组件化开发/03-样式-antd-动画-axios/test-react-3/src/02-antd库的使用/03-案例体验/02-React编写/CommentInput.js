import { PureComponent } from "react";
import StyleWrapper from "./CSS/CommentInputStyled.js";

export default class CommentInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      placeholder: "请输入内容",
    };
  }
  render() {
    const { content, placeholder } = this.state;
    return (
      <StyleWrapper id="CommentInput">
        <div className="inputBox">
          <textarea
            value={content}
            onChange={(e) => this.handleChange(e)}
            placeholder={placeholder}
            rows={2}
          />
        </div>
        <button onClick={() => this.submitComment()}>提交</button>
      </StyleWrapper>
    );
  }
  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
    console.log(this.state.content);
  }
  submitComment() {
    this.props.submitComment(this.state.content);
    this.setState({
      content: "",
    });
  }
}
