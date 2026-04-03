import { CHANGE_BANNER, CHANGE_RECOMMEND } from "./constants.js";

const initialHomeInfo = { banners: [], recommends: [] };

function homeReducer(homeInfo = initialHomeInfo, action) {
  const { type } = action;
  switch (type) {
    case CHANGE_BANNER: {
      let newState = { ...homeInfo, banners: action.banners };
      return newState;
    }
    case CHANGE_RECOMMEND: {
      let newState = { ...homeInfo, recommends: action.recommends };
      return newState;
    }
    default: {
      return homeInfo;
    }
  }
}

export default homeReducer;
