import { PureComponent } from "react";
import { Button, Input } from "antd";
import styled from "styled-components";

const StyleWrapper = styled.div`
  margin-top: 10px;
  position: relative;
  button {
    margin: 5px;
    position: relative;
    bottom: 0px;
    right: 5px;
  }
`;
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
        <Input.TextArea
          value={content}
          onChange={(e) => this.handleChange(e)}
          placeholder={placeholder}
          rows={2}
        />
        <Button
          onClick={() => this.submitComment()}
          type="primary"
          size="small"
          shape="round"
        >
          提交
        </Button>
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
