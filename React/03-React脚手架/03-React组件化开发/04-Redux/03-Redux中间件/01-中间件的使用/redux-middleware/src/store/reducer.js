import {
  INCREMENT,
  DECREMENT,
  ADD_NUMBER,
  SUB_NUMBER,
  CHANGE_BANNER,
  CHANGE_RECOMMEND,
} from "./constants.js";

const defaultState = {
  counter: 0,
  //初始化对应state数据
  banners: [],
  recommends: [],
};

function reducer(state = defaultState, action) {
  const { type } = action;
  switch (type) {
    case INCREMENT: {
      let newState = { ...state, counter: state.counter + 1 };
      return newState;
    }
    case DECREMENT: {
      let newState = { ...state, counter: state.counter - 1 };
      return newState;
    }
    case ADD_NUMBER: {
      let newState = { ...state, counter: state.counter + action.num };
      return newState;
    }
    case SUB_NUMBER: {
      let newState = { ...state, counter: state.counter - action.num };
      return newState;
    }
    case CHANGE_BANNER: {
      let newState = { ...state, banners: action.banners };
      return newState;
    }
    case CHANGE_RECOMMEND: {
      let newState = { ...state, recommends: action.recommends };
      return newState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;
