在学习Vue时，我们已经接触过`axios`了，关于`axios`的基础知识，这里不再赘述，直接讲解在React中，工程化使用`axios`。

## 前提概要

将`axios`依赖，单独的抽离到一个文件内，暴露出去自己封装的API，进行后期的使用。

​		其实不只是axios，在项目中引入第三方框架、库，如果不做处理，<font color="#d35400">直接将第三方依赖代码使用在各个项目文件中，都是很危险的行为</font>。

​		所谓危险指的是：如果项目中使用的第三方框架、库，出现了严重的BUG，或者官方不再维护。也就代表着项目需要更改这些依赖。如果我们是直接在各个项目文件中直接使用第三方依赖代码，则在更改依赖时，就要在各个项目文件中找到对应代码再进行更改。实际开发的项目是很庞大的，如果依次查找、修改各个文件，这个代价将大的恐怖。

​		所以<font color="#27ae60">我们需要对依赖的第三方库进行一些封装，嵌入各个文件的是封装后的代码</font>，这样，如果第三方库、框架出现BUG或者不再更新维护时，我们只需要更改自己封装的文件代码即可，只要保证封装后的使用形式(API)与原来相同即可，这样就不用依次更改项目文件中的代码了。

## 目录结构

```
├── service					//网络请求目录
│   ├── config.js  	//进行基础的配置
│   ├── request.js  //二次封装axios,暴露API
│   └── Home 				//存放Home组件中的相关请求
│				├──index.js
```

## 代码编写

### config.js

在其中将基础的配置初始化，并暴露出去供`request.js`使用

* `process`是Node全局的一个变量，可通过`process.env.NODE_ENV`判断进程所处的环境。
* 根据所处环境，配置不同的`baseURL`

```
//timeout
const TIMEOUT = 3000;
//baseURL
const devBaseURL = "https://httpbin.org"; //开发测试
const proBaseURL = "https://production.org"; //上线生产
const baseURL =
  process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;

export { TIMEOUT, baseURL };
```

### request.js

* 在其中编写各个接口，对应不同的axios实例，向不同的服务器发送请求
* 当然，这里只写了一个接口，因为我们只是测试，实际开发中，可能会向多个服务器发送请求，到时候在axios实例创建时，传入对应的baseURL即可，我们也可将不同的baseURL再抽离到config.js文件中
* 使用拦截器进行预处理。

```
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

/* 其它接口的编写	*/
// function instance2(reqOptions) {
//  ……
// }

export { instance1 };

```

### Home/index.js

这里的`Home/index.js`的编写只是个简单的例子，实际开发中会涉及到多个组件中发送请求，届时只需配置对应的目录，如果请求种类很多，或者其子组件也会发送请求，我们还可抽离到对应的子目录、子文件中。

* 引入`request`提供的接口
* 在其中编写各个不同的请求，并作为接口暴露出去，供对应组件使用

```
import { instance1 } from "../request.js";
function requestTestGet(params) {
  return instance1({
    url: "/get",
    method: "get",
    params,
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
```

### 使用

在`Home`组件中使用对应的请求接口，直接传入参数即可。

```
import { PureComponent } from "react";
import { requestTestGet, requestTestPost } from "@/service/Home";
export default class Home extends PureComponent {
	//组件被挂载时，发送请求
  componentDidMount() {
    requestTestGet({
      name: "Ashun",
      age: 18,
      like: "conding",
    }).then(
      (res) => {
        console.log("get请求发送完毕");
        console.log(res);
      },
      (err) => console.log(err)
    );
    requestTestPost({
      name: "Ashun",
    }).then(
      (res) => {
        console.log("post请求发送完毕");
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
  render() {
    return <h2>Home</h2>
  }
}
```

