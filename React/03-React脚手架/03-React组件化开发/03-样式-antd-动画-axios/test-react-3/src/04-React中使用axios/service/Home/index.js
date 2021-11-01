import { instance1 } from "../request.js";
function requestTestGet(params) {
  return instance1({
    url: "/get",
    method: "get",
    params,
    // method: "post",
    // data: { name: "Ashun" },
  });
}
function requestTestPost(data) {
  return instance1({
    url: "/post",
    method: "post",
    data,
  });
}
export { requestTestGet, requestTestPost };
