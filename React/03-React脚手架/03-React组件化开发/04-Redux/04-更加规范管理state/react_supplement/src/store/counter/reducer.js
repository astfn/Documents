import { INCREMENT, DECREMENT, ADD_NUMBER, SUB_NUMBER } from "./constants.js";

const initialConterInfo = { counter: 0 };

function counterReducer(counterInfo = initialConterInfo, action) {
  const { type } = action;
  switch (type) {
    case INCREMENT: {
      let newState = { ...counterInfo, counter: counterInfo.counter + 1 };
      return newState;
    }
    case DECREMENT: {
      let newState = { ...counterInfo, counter: counterInfo.counter - 1 };
      return newState;
    }
    case ADD_NUMBER: {
      let newState = {
        ...counterInfo,
        counter: counterInfo.counter + action.num,
      };
      return newState;
    }
    case SUB_NUMBER: {
      let newState = {
        ...counterInfo,
        counter: counterInfo.counter - action.num,
      };
      return newState;
    }
    default: {
      return counterInfo;
    }
  }
}

export default counterReducer;
