import React,{PureComponent,createRef} from "react";

export default class App extends PureComponent{
  constructor(){
    super();
    this.state={
      titleRef:createRef(),
      childRef:createRef(),
    }
    this.titleCallbackRef=this.childCallbackRef=null;
  }
  render(){
    return(
      <main>
        <h2 ref="h2">ref值为：String</h2>
        <Child ref="Child"/>
        <hr/>
        <h2 ref={this.state.titleRef}>ref值为：Object</h2>
        <Child ref={this.state.childRef}/>
        <hr/>
        <h2 ref={(ele)=>{this.titleCallbackRef=ele}}>ref值为：Function</h2>
        <Child ref={(ele)=>{this.childCallbackRef=ele;console.log("childCallbackRef")}}/>
       <hr/>
       <button onClick={this.getH2.bind(this)}>获取h2</button>
       <button onClick={this.getChild.bind(this)}>获取Child</button>
      </main>
    )
  }
  getH2(){
    console.log(this.refs["h2"]);
    console.log(this.state.titleRef);
    console.log(this.titleCallbackRef)
  }
  getChild(){
    console.log(this.refs["Child"]);
    console.log(this.state.childRef);
    console.log(this.childCallbackRef)

  }
}

class Child extends PureComponent{
  constructor(){
    super();
    this.state={
      title:"Child"
    }
  }
  render(){
    return(
      <div>
        <h3>{this.state.title}</h3>
      </div>
    )
  }
  componentDidMount(){
    console.log("Child挂载完毕")
  }
}