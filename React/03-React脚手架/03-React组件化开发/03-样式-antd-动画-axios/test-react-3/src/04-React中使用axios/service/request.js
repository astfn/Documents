import axios from "axios";

import { TIMEOUT, baseURL } from "./config";
const baseConfig = { baseURL, timeout: TIMEOUT };

function instance1(reqOptions) {
  let api = axios.create(baseConfig);
  api.interceptors.request.use(
    (config) => config,
    (err) => err
  );
  api.interceptors.response.use(
    (data) => data.data,
    (err) => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = "请求失败";
            break;
          case 401:
            err.message = "未授权访问";
            break;
          default:
            break;
        }
      }
      return err;
    }
  );
  return api(reqOptions);
}

// function instance2(reqOptions) {
//  ……
// }
export { instance1 };
