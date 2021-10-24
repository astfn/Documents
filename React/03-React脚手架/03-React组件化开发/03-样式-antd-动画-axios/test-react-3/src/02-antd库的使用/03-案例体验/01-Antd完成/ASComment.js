import { PureComponent } from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

const StyleWrapper = styled.div`
  width: 300px;
  padding: 10px;
  border-radius: 3px;
`;

export default class ASComment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }
  render() {
    const { comments } = this.state;
    return (
      <StyleWrapper id="ASComment">
        <CommentItem
          comments={comments}
          deleteComment={this.deleteComment.bind(this)}
        />
        <CommentInput submitComment={this.submitComment.bind(this)} />
      </StyleWrapper>
    );
  }
  submitComment(content) {
    let newComments = [...this.state.comments];
    let time = Date.now();
    newComments.push({
      id: time,
      avatar:
        "https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/82ceb89c205416c5c62eb0f04d077c28~300x300.image",
      author: "Ashun",
      content,
      datetime: time,
    });
    this.setState({
      comments: newComments,
    });
    console.log(this.state.comments);
  }
  deleteComment(index) {
    let newComments = [...this.state.comments];
    newComments.splice(index, 1);
    this.setState({
      comments: newComments,
    });
  }
}
