import { PureComponent } from "react";
import { Button, Tooltip } from "antd";
export default class App extends PureComponent {
  render() {
    return (
      <Tooltip title="Ashun按钮">
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ margin: "30px" }}
        >
          Ashun
        </Button>
      </Tooltip>
    );
  }
}
