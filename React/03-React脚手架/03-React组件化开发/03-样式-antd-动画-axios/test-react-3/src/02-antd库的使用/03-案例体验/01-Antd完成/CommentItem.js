import { PureComponent } from "react";
import { Comment, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";

const StyleWrapper = styled.div`
  position: relative;
  span.delete {
    font-size: 12px;
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
`;
export default class CommentItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { comments } = this.props;
    return (
      <StyleWrapper id="CommentItem">
        {comments.map((item, key) => (
          <Comment
            key={item.id}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={
              <Tooltip
                title={moment(item.datetime).format("YYYY-MM-DD HH:mm:ss")}
              >
                {/* 评论距离当前的时间 */}
                <span>{moment(item.datetime).fromNow()}</span>
              </Tooltip>
            }
          >
            <span
              className="delete"
              onClick={() => {
                this.deleteComment(key);
              }}
            >
              <DeleteOutlined />
              删除
            </span>
          </Comment>
        ))}
      </StyleWrapper>
    );
  }
  deleteComment(index) {
    this.props.deleteComment(index);
  }
}
