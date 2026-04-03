// import redux from "redux";
//引入redux
const redux=require("redux")
//初始化state
const defaultState={
  counter:0
}
//创建reducer，用于处理状态变更
function reducer(state=defaultState,action){
  const {type}=action;
  switch(type){
    case "INCREMENT":{
      let newState={...state,counter:state.counter+1};
      return newState;
    }
    case "DECREMENT":{
      let newState={...state,counter:state.counter-1};
      return newState;
    } 
    case "ADD_NUMBER":
    { 
      let newState={...state,counter:state.counter + action.number};
      return newState;
    }
    default: 
      return state;
    }
}
//创建Store存储state
const store=redux.createStore(reducer);
//dispatch action之前可通过subscribe订阅状态变化
store.subscribe(()=>{
  console.log(store.getState())
})

//派发action，交由reducer处理状态变更
store.dispatch({
  type:"INCREMENT"
})
store.dispatch({
  type:"DECREMENT"
})
store.dispatch({
  type:"ADD_NUMBER",
  number:6
})

