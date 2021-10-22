import { Fragment, PureComponent } from "react";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        {/* 按钮类型 */}
        <div>
          <Button>次按钮</Button>
          <Button type="primary">主按钮</Button>
          <Button type="dashed">虚线按钮</Button>
          <br />
          <Button type="text">文本按钮</Button>
          <Button type="link" href="https://github.com/astfn">
            链接按钮
          </Button>
        </div>
        {/* 图标按钮 */}
        <div>
          <br />
          <br />

          <Tooltip title="message内容">
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              size="large"
              style={{ margin: "0px 15px" }}
            />
          </Tooltip>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ margin: "0px 15px" }}
          >
            Search
          </Button>
          <Button type="primary" size="small" style={{ margin: "0px 15px" }}>
            Ashun <SearchOutlined />
          </Button>
        </div>
      </Fragment>
    );
  }
}
