import React,{Component} from "react";

export default class App extends Component{
  constructor(){
    super();
    this.state={
      title:"Ashuntefannao",
      message:"hello Ashun!",
      info:{
        name:"Ashun",
        age:18,

      }
    }
  }
  render(){
    return(
      <main>
        <h1>{this.state.title}</h1>
        <ul>
          {Object.entries(this.state.info).map(([key,val])=><li key={key}>{key}--{val}</li>)}
        </ul>
        <button onClick={()=>{this.hello()}}>hello</button>
      </main>
    )
  }
  hello(){
    alert(this.state.message)
  }
}