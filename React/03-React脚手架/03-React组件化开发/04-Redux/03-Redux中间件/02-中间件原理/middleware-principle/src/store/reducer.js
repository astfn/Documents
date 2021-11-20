import { INCREMENT, DECREMENT, ADD_NUMBER, SUB_NUMBER } from "./constants.js";

const defaultState = {
  counter: 0,
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
    default: {
      return state;
    }
  }
}

export default reducer;
