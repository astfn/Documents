import axios from "axios";

import {
  CHANGE_BANNER,
  CHANGE_RECOMMEND,
  FETCH_HOME_MULTIDATA,
} from "./constants.js";

const changeBannersAction = (banners) => ({
  type: CHANGE_BANNER,
  banners,
});
const changeRecommendsAction = (recommends) => ({
  type: CHANGE_RECOMMEND,
  recommends,
});

const getHomeMultidataAction = (banners) => {
  return (dispatch, getState) => {
    axios({
      url: "http://123.207.32.32:8000/home/multidata",
    }).then(
      (res) => {
        const data = res.data.data;
        dispatch(changeBannersAction(data.banner.list));
        dispatch(changeRecommendsAction(data.recommend.list));
        console.log(data.banner.list);
        console.log(data.recommend.list);
        console.log(getState());
      },
      (err) => {
        console.log(err);
      }
    );
  };
};

const fetchHomeMultidataAction = () => ({
  type: FETCH_HOME_MULTIDATA,
});

export {
  changeBannersAction,
  changeRecommendsAction,
  getHomeMultidataAction,
  fetchHomeMultidataAction,
};
