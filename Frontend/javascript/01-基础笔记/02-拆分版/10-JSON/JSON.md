---
title: JSON
date: 2021-05-16 13:33:21
tags:
categories:
- [Web前端,JavaScript大总结]
---

## JSON

- json 是一种轻量级的数据交换格式，易于人阅读和编写。
- 使用`json` 数据格式是替换 `xml` 的最佳方式，主流语言都很好的支持`json` 格式。所以 `json` 也是前后台传输数据的主要格式。
- json 标准中要求使用`双引号包裹属性名称`，虽然有些语言不强制，但使用双引号可避免多程序间传输发生错误语言错误的发生。



**关于Javascript中的JSON**

* javacript中的json数据转化，主要依赖两个内置方法。

* 序列化

  * `JSON.stringify(obj,[...prop],num/str)`
  * 参数说明
    * jsonObj
    * 可选，如果只想得到个别属性，则可传入该参数
    * 可选，为number时:控制缩进数，为string时:控制引导字符串

* 反序列化

* `JSON.parse(jsonStr,(key,val)=>{...})`

  * 参数说明
  * josnStr
    * 可选，可在反序列化的过程中对数据进行操作

  

### 声明定义

##### 基本结构

```text
let json = {
  "title": "阿顺特烦恼",
  "url": "Ashuntefannao.com",
  "Controller": {
  	"name": "Ashun",
  }
}
console.log(json.Controller.name);
```

##### **数组结构**

```text
let lessons = [
  {
    "title": '媒体查询响应式布局',
    "category": 'css',
    "click": 199
  },
  {
    "title": 'FLEX 弹性盒模型',
    "category": 'css',
    "click": 12
  },
  {
    "title": 'MYSQL多表查询随意操作',
    "category": 'mysql',
    "click": 89
  }
];

console.log(lessons[0].title);
```

### 序列化

序列化是将 `json对象` 转换为`字符串`，一般用来向其他语言传输使用。

* `JSON.stringify(obj,[...props])`

```text
let as = {
  "title": "阿顺特烦恼",
  "url": "Ashuntefannao.com",
  "Controller": {
  	"name": "Ashun",
  }
}
console.log(JSON.stringify(as));
//{"title":"阿顺特烦恼","url":"Ashuntefannao.com","Controller":{"name":"Ashun"}}
```

根据第二个参数指定保存的属性

* 可选，若不指定，则返回所有prop

```text
console.log(JSON.stringify(as, ['title', 'url']));
//{"title":"阿顺特烦恼","url":"Ashuntefannao.com"}
```

第三个是参数用来控制TAB缩进数量，如果字符串则为前导字符。

```text
let as = {
  "title": "阿顺特烦恼",
  "url": "Ashuntefannao.com",
  "Controller": {
  	"name": "Ashun",
  }
}
console.log(JSON.stringify(as, null, 2));
/*
{
  "title": "阿顺特烦恼",
  "url": "Ashuntefannao.com",
  "Controller": {
    "name": "Ashun"
  }
}
*/
console.log(JSON.stringify(as, null, "-"));
/*
{
-"title": "阿顺特烦恼",
-"url": "Ashuntefannao.com",
-"Controller": {
--"name": "Ashun"
-}
}
*/
```

为数据添加 `toJSON` 方法来自定义返回格式

```text
let as = {
    "title": "阿顺特烦恼",
    "url": "Ashuntefannao.com",
    "Controller": {
        "name": "Ashun",
    },
    "toJSON": function () {
        return {
            "title": this.url,
            "name": this.Controller.name
        };
    }
}
console.log(JSON.stringify(as)); //{"title":"Ashuntefannao.com","name":"Ashun"}
```

### 反序列化

使用 `JSON.parse` 将`josn字符串` 解析成`json对象`

```text
let as = {
  "title": "阿顺特烦恼",
  "url": "Ashuntefannao.com",
  "Controller": {
  	"name": "Ashun",
  }
}
let jsonStr = JSON.stringify(as);
console.log(JSON.parse(jsonStr));
```

```
let jsonStr=`
{
	"name":"Ashun",
	"age":18	
}
`;
console.log(JSON.parse(jsonStr));
```

使用第二个参数函数来对返回的数据二次处理

```text
let as = {
  title: "阿顺特烦恼",
  url: "Ashuntefannao.com",
  Controller: {
  	"name": "Ashun",
  }
}
let jsonStr = JSON.stringify(as);
console.log(
  JSON.parse(jsonStr, (key, value) => {
    if (key == "title") {
      return `${value}-SHUN`;
    }
    return value;
  })
);
/*
{title: "阿顺特烦恼-SHUN", url: "Ashuntefannao.com", Controller: {…}}
*/
```
