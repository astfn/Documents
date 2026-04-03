import { all, put, takeLatest } from "redux-saga/effects";

import axios from "axios";
import { FETCH_HOME_MULTIDATA } from "./constants.js";
import {
  changeBannersAction,
  changeRecommendsAction,
} from "./actionCreators.js";

/*各个拦截action的业务处理*/
function* fetchHomeMultidata() {
  const result = yield axios.get("http://123.207.32.32:8000/home/multidata");
  const data = result.data.data;
  // yield put(changeBannersAction(data.banner.list));
  // yield put(changeRecommendsAction(data.recommend.list));
  yield all([
    put(changeBannersAction(data.banner.list)),
    put(changeRecommendsAction(data.recommend.list)),
  ]);
  console.log(result.data.data);
}

/* 总的saga逻辑 */
function* mySaga() {
  yield takeLatest(FETCH_HOME_MULTIDATA, fetchHomeMultidata);
}

export default mySaga;
