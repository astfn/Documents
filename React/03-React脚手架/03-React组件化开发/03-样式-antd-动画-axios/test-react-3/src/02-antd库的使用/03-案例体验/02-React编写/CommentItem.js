import { PureComponent } from "react";
import moment from "moment";
import StyleWrapper from "./CSS/CommentItemStyled.js";

export default class CommentItem extends PureComponent {
  render() {
    const { comments } = this.props;
    return (
      <StyleWrapper id="CommentItemWrapper">
        {comments.map((item, key) => {
          return (
            <div className="CommentItems" key={item.id}>
              <header>
                <div className="avatar">
                  <img alt="avatar" src={item.avatar} />
                </div>
                <div className="info">
                  <span className="author">{item.author}</span>
                  <span className="datetime">
                    {moment(item.datetime).format("MM/DD hh:mm")}
                  </span>
                </div>
              </header>
              <main>
                <p className="content">{item.content}</p>
              </main>
              <footer>
                <div className="delete" onClick={() => this.deleteComment(key)}>
                  🚮删除
                </div>
              </footer>
            </div>
          );
        })}
      </StyleWrapper>
    );
  }
  deleteComment(index) {
    this.props.deleteComment(index);
  }
}
