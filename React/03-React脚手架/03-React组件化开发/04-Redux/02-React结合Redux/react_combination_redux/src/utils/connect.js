import { PureComponent } from "react";
import { StoreContext } from "./context.js";
export default function connect(mapStateToProps, mapDispatchToProps) {
  //高阶组件
  return function enhanceHOC(WrapperComponent) {
    let newCPN = class extends PureComponent {
      static contextType = StoreContext;
      constructor(props, context) {
        super(props, context);
        this.state = {
          storeStates: mapStateToProps(context.getState()),
        };
        this.unSubscribe = null;
      }
      componentDidMount() {
        this.unSubscribe = this.context.subscribe(() => {
          this.setState({
            storeStates: mapStateToProps(this.context.getState()),
          });
        });
      }
      componentWillUnmount() {
        this.unSubscribe();
      }
      render() {
        return (
          <WrapperComponent
            {...this.props}
            {...mapStateToProps(this.context.getState())}
            {...mapDispatchToProps(this.context.dispatch)}
          />
        );
      }
    };
    //名称设置
    newCPN.displayName = `connectRedux_${WrapperComponent.name}`;
    return newCPN;
  };
}
