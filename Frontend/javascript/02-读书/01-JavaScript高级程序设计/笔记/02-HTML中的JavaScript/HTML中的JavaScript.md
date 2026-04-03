

## \<script>标签属性

总共有8个属性：

1. src
2. language
3. type
4. async
5. defer
6. crossorigin
7. integrity
8. charset

### **src**

属性值：引入外部 JS 文件的链接

* 若配置了该属性，代表改该 script 标签引入的是外部的 js 文件
* 此时如果再向 \<script> 标签对儿内部插入自己写的 js 脚本，那么这些自己写的 js 脚本将会被忽略。

解决跨域：

​	解决跨域的方法之一，就是利用 script 标签的 src 发送 JSONP get 请求，这样的请求不会受到浏览器同源策略的限制。

安全问题：

​	由于 JSONP get 请求，不受浏览器同源策略的限制，代表我们可以随意的引入他人服务器的 js 脚本，如果这个 js 脚本被恶意替换，是非常危险的。

​	我们可以配置 [integrity](###integrity) 属性进行防范，但这个属性并没有被所有的浏览器支持

### **language（已废弃）**

用于定义 \<script> 代码块内部的脚本语言类型，例如 `JavaScript`、`JavaScript 1.2`、`VBScript`。

现在大多数浏览器都会忽略这个属性，不该再使用它

### **type（代替 language）**

表示代码块中脚本语言的内容类型（也称为 `MIME` 类型）

* 按照惯例，这个值始终都是 `text/javascript`，尽管它和 `text/ecmascript` 都已被废弃。
* JavaScript 文件的 MIME 类型通常是 `application/x-javascript`
* 现在配置 type 属性，通常会设置为 `module`，此时 \<script> 标签内的代码会被识别为 ES6 模块，可以通过 import、export 进行导入和导出 js 代码。

><img src="HTML中的JavaScript.assets/001.png" alt="001" style="zoom:80%;" />
>
>* 文件类型 -> MIME -> 浏览器根据 MIME 启动对应的应用程序打开该文件
>
>​	之前使用 node.js 写服务时，我们就配置过 mime.js ，该文件中包含一个 JSON，这个 JSON 中就存储了大量的`文件后缀名` 与 `对应的 mime 类型` 的映射关系。
>
>​	服务器接受网络请求，如果请求的是某种文件，就可以通过 mime.js 找到对应的 mime 类型，在响应头中配置`Content-type` 告知浏览器客户端请求文件的 mime 类型，浏览器就会启动对应的应用程序进行打开

### **async & defer**

二者的作用：都能异步加载所引入的外部 js 脚本文件。

* 这里有两个关键字：`异步加载` 与 `引入的外部 js 脚本`，意味着 async 和 defer 只对配置了 src 属性的 script 标签有效。

区别：

* async：异步加载 ，立即执行（可能会阻塞页面的加载，因为异步加载完毕后，可能页面还没有被加载完毕，此时若立即执行脚本，就会阻塞页面的加载）
* defer：异步加载，异步执行（会等到页面内容完全加载完毕后执行）

应用场景：

代码自上而下顺序执行，此时如果把外部引入的 js 放在 head 中，则会阻塞页面的加载

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 等待 example1.js 与 example2.js 执行完毕后，页面内容才开始加载-->
    <script src="example1.js"></script>
    <script src="example2.js"></script>
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

当然，我们也可以在页面尾部引入 js ，这样就不会阻塞页面内容的加载

```
<body>
    <!-- 页面内容…… -->
    <script src="example1.js"></script>
    <script src="example2.js"></script>
</body>
```

但如果既要在 head 部分引入，又不想阻塞页面的加载，就可以配置 defer 属性

```
<head>
    ……
    <!-- 异步下载，异步执行-->
    <script defer src="example1.js"></script>
    <script defer src="example2.js"></script>
</head>
```

竟态问题：

​	**配置了 defer、async 属性的外部 script 脚本，都不能保证按序执行**

* 示例1

```
<script defer src="example1.js"></script>
<script defer src="example2.js"></script>
```

* 示例2

```
<script async src="example1.js"></script>
<script async src="example2.js"></script>
```

示例1、2中的 `example2.js` 可能会优先于 `example1.js` 执行，如果 `example2.js` 需要依赖 `example1.js` ，很显然程序会出错！

### **crossorigin**

用于配置请求的 CORS（跨域资源共享）设置，默认不使用 CORS。

>若 script 标签配置了 src 属性，则本质上就是发送了 JSONP 请求

属性值：

* `anonymous`(匿名的)：不设置凭证信息
* `use-credentials`(使用凭证)：出站请求会包含凭证信息

### **integrity**

用于配置约定的加密签名，该属性可与确保 `内容分发网络`（CND，Content Delivery Network）不会提供而已内容。

### charset

使用 src 属性指定的代码字符集，这个属性很少使用，因为大多数浏览器不在乎它的值。

## 动态加载脚本