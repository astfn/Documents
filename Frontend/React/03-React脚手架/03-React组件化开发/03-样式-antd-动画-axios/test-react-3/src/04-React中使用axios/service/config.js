//timeout
const TIMEOUT = 3000;
//baseURL
const devBaseURL = "https://httpbin.org"; //开发测试
const proBaseURL = "https://production.org"; //上线生产
const baseURL =
  process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;

export { TIMEOUT, baseURL };
