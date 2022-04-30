---
title: DOM
date: 2021-05-16 13:41:21
tags:
categories:
- [Web前端,JavaScript大总结]
---

## DOM

### 基础知识

DOM 即Document Object Model 文档对象模型。如果对HTML很了解使用DOM并不复杂。

通过js操作界面元素，操作的对象即DOM。

浏览器在加载页面时会生成DOM对象，以供我们使用JS控制页面元素。

#### 文档渲染

浏览器会将HTML文本内容进行渲染，并生成相应的JS对象，同时会对不符规则的标签进行处理。

- 浏览器会将标签规范后渲染页面
- 目的一让页面可以正确呈现
- 目的二可以生成统一的JS可操作对象



##### 标签修复

在html文件中，若只有内容`阿顺特烦恼`而**没有任何标签时**，浏览器会自动修复成以下格式

```
<html>
<head></head>
<body>
阿顺特烦恼
</body>
</html>
```

下面H1标签结束错误并且属性也没有引号，浏览器在渲染中会进行修复

```text
<body>
  <h1 id=ashun>阿顺特烦恼<h1>
</body>
```

处理后的结果

```text
<html>
	<head></head>
	<body>
    <h1 id="ashun">阿顺特烦恼</h1>
  </body>
</html>
```

##### 表格处理

表格tabel中不允许有内容，浏览器在渲染过程中会进行处理

```text
    <table>
      阿顺特烦恼
      <tr>
        <th>阿顺</th>
      </tr>
    </table>
```

渲染后会添加tbody标签并将table中的字符移出到table标签外部

```text
阿顺特烦恼
<table>
  <tbody>
  	<tr>
      <th>阿顺</th>
    </tr>
  </tbody>
</table>
```

##### 标签移动

所有内容要写在BODY标签中，下面的SCRIPT标签写在了BODY后面，浏览器渲染后也会进行处理

```text
<body></body>
<script>
  console.dir('阿顺特烦恼')
</script>
```

渲染后处理的结果

```text
<body>
  <script>
    console.dir('阿顺特烦恼')
  </script>
</body>
```



---

#### 操作时机

需要保证浏览器已经渲染了内容才可以读取的节点对象，下例将无法读取到节点对象

```text
<script>
  const node = document.getElementById('as');
  console.log(node); //null
</script>
<h1 id="as">阿顺特烦恼</h1>
```

不过我们可以将脚本通过事件放在页面渲染完执行

```text
<script>
  window.onload = () => {
    const node = document.getElementById('as');
    console.log(node);
  }
</script>
<h1 id="as">阿顺特烦恼</h1>
```

或使用定时器将脚本设置为异步执行

```text
<script>
  setTimeout(() => {
   	const node = document.getElementById('as');
    console.log(node)
  })
</script>
<h1 id="as">阿顺特烦恼</h1>
```

为脚本设置`type="module"`,会延迟解析模块脚本

```
<script type="module">
   	const node = document.getElementById('as');
    console.log(node)
</script>
<h1 id="as">阿顺特烦恼</h1>
```

或将脚本设置在外部文件并使用`defer/async`属性加载，即会等到DOM解析后迟延执行

* 仅引入外部脚本时有效
* 多个外部脚本使用`defer/async`属性加载，不能够保证加载的前后顺序，当模块之间存在依赖时要注意

```text
<script defer src="index.js"></script>
<div id="as"></div>
```

```
<script async src="index.js"></script>
<div id="as"></div>
```



---

#### 节点对象

JS中获取html内容的对象，称为DOM节点对象（node)，即然是对象就包括操作NODE的属性和方法

- 包括12种类型的节点对象
- 常用了节点为document、标签元素节点、文本节点、注释节点
- 节点均继承自Node类型，所以拥有相同的属性或方法
- document是DOM操作的起始节点

```text
<body id="as">
  <!-- 阿顺特烦恼 -->
</body>
<script>
	// document节点 noteType为9
  console.log(document.nodeType)
  
  // 第一个子节点为<!DOCTYPE html>，且nodetype为10
  console.log(document.childNodes.item(0).nodeType)
  
  // body 是标签节点 nodeType为1
  console.log(document.body.nodeType) 
  
  // body的属性节点nodeType 为2
  console.log(document.body.attributes[0].nodeType)
  
	// body的第一个节点为文本节点，nodeType为3
  console.log(document.body.childNodes.item(0).nodeType)
  
  // body的第二个节点为注释，nodeType类型为8
  console.log(document.body.childNodes[1].nodeType)
</script>
```



---

#### 原型链

在浏览器渲染过程中会将文档内容生成为不同的对象，来对下例中的h1标签进行讨论，其他节点情况相似

- 不同类型节点由专有的构造函数创建对象
- 使用console.dir 可以打印出DOM节点对象结构
- 节点也是对象所以也具有JS对象的特征

```text
<h1 id="as">阿顺特烦恼</h1>
<script>
  function prototype(el) {
    console.log(el.__proto__)
    el.__proto__ ? prototype(el.__proto__) : ''
  }
  const node = document.getElementById('as')
  prototype(node)
</script>
```

最终得到的节点的原型链为

| 原型               | 说明                                            |
| ------------------ | ----------------------------------------------- |
| Object             | 根对象                                          |
| EventTarget        | 提供事件支持                                    |
| Node               | 提供parentNode等节点操作方法                    |
| Element            | 提供getElementsByTagName、querySelector等方法   |
| HTMLElement        | 所有元素的基础类，提供className、nodeName等方法 |
| HTMLHeadingElement | Head标题元素类                                  |

为标签元素和表单元素添加内容截取方法substr

```text
    <div id="as">阿顺特烦恼</div>
    <input type="text" value="ashuntefannao" />
<script>
      class Utils {
      	//检查是否为表单元素
        static isForm(node) {
          return node instanceof HTMLInputElement;
        }
        //获取原型
        static getPrototype(node) {
          let prototypes = [];
          let test = node.__proto__;
          if (test) {
            prototypes.push(test);
            prototypes.push(...Utils.getPrototype(test));
          }
          return prototypes;
        }
      }
      
      Node.prototype.substr = function (m, n) {
        if (Utils.isForm(this)) {
          return this.value.substr(m, n);
        } else {
          return this.innerText.substr(m, n);
        }
      };
      
      //表单测试
      let input = document.querySelector("input");
      console.log(input.substr(0, 2));
      console.log(Utils.getPrototype(input));
      //标签测试
      let div = document.querySelector("div");
      console.log(div.substr(0, 2));
      console.log(Utils.getPrototype(div));
</script>
```



---

#### 对象特征

即然DOM与我们其他JS创建的对象特征相仿，所以也可以为DOM对象添加属性或方法。

对于系统应用的属性，应该明确含义不应该随意使用，比如ID是用于标识元素唯一属性，不能用于其他目地

- 后会会讲到其他解决方案，来自定义属性，下面的直接修改ID属性是不建议的

```text
let as = document.getElementById("as");
as.id = "Ashun";
console.log(as);
```

title用于鼠标停留时显示提示文档也不应该用于其他目地

```text
<div id="as">阿顺特烦恼</div>
<script>
  let as = document.getElementById('as')
  as.title = 'Ashun'
  console.log(as)
</script>
```

下面是为对象合并属性的示例

```text
<div id="as">阿顺特烦恼</div>
<script>
  let as = document.getElementById('as')
  Object.assign(as, {
    color: 'red',
    change() {
      this.innerHTML = 'Ashun'
      this.style.color = this.color
    },
    onclick() {
      this.change()
    },
  })
</script>
```

合并对象属性更改样式

```text
<div id="as">阿顺特烦恼</div>
<script>
  let as = document.getElementById('as')
  Object.assign(as.style, {
    color: 'white',
    backgroundColor: 'red',
  })
</script>
```



---

### DOCUMENT

document是window对象的属性，是由HTMLDocument类实现的实例。

- document包含 DocumentType（唯一）或 html元素（唯一）或 comment等元素

原型链中也包含Node，所以可以使用有关节点操作的方法如nodeType/NodeName等

```text
console.dir(document.nodeType)
console.dir(document.nodeName)
```

> 有关使用Document操作cookie与本地储存将会在相应章节中介绍

#### HTML

下面通过节点的`nodeType`来获取html元素

```text
let html = [...document.childNodes].filter((node) => {
  if (node.nodeType === 1) {
    return node
  }
})[0]
console.log(html)
```

获取整个html元素：`document.documentElement`

```text
console.log(document.documentElement)
```

#### 文档信息

使用`title`获取和设置文档标题

```text
//获取文档标题内容
console.log(document.title)

//设置文档标签内容
document.title = '阿顺特烦恼-Ashun'
```

获取`body`标签

```
document.body
```

获取当前`URL`

```text
console.log(document.URL)
```

`domain`获取域名

```text
document.domain
```

`referrer`获取来源地址

```text
console.log(document.referrer)
```



---

### 节点属性

不同类型的节点拥有不同属性，下面是节点属性的说明与示例

#### nodeType

nodeType指以数值返回节点类型

| nodeType | 说明         |
| -------- | ------------ |
| 1        | 元素节点     |
| 2        | 属性节点     |
| 3        | 文本节点     |
| 8        | 注释节点     |
| 9        | document对象 |

下面是节点nodeType的示例

```
<div id="app">
  <div>阿顺</div>
  <div class="shun">SHUN</div>
  <div class="ashun"><!-- 阿顺特烦恼 --></div>
</div>
<script>
  const node = document.querySelector(`#app`)
  console.log(node.nodeType) //1
  console.log(node.firstChild);// #text{…}
  console.log(node.firstChild.nodeType) //3

  const as = document.querySelector('.ashun')
  console.log(as.childNodes[0].nodeType) //8
</script>
```

当然也可以使用对象的原型检测节点类型

```text
let h1 = document.querySelector('h1')
let p = document.querySelector('p')
console.log(h1 instanceof HTMLHeadingElement) //true
console.log(p instanceof HTMLHeadingElement) //false
console.log(p instanceof Element) //true
```

下面递归获取所有标签元素，并返回符合html嵌套结构的数据。

```text
  <div id="as">
    <ul>
      <li>
        <strong>阿顺特烦恼</strong>
      </li>
    </ul>
    <p1>ashun<span>ashuna</span></p1>
  </div>
<script>
				function childTag(node) {
          let result = [];
          [...node.childNodes].map((v) => {
            if (v.nodeType === 1) {
              result.push({ node: v, childs: childTag(v) });
            }
          });
          return result;
        }
        let as = document.getElementById("as");
        console.log(childTag(as));
</script>
```

优化：当没有子节点时，childs为null

```
……
result.push({ node: v, childs: childTag(v).length ? childTag(v) : null });
……
```



---

#### nodeName

nodeName指定节点的名称

- 获取值为大写形式

| nodeType种类 | nodeName返回结果 |
| ------------ | ---------------- |
| 1            | 元素名称如DIV    |
| 2            | 属性名称         |
| 3            | #text            |
| 8            | #comment         |

下面来操作 nodeName

```text
<div id="app">
  <div>阿顺</div>
  <div class="shun">SHUN</div>
  <div class="ashun"><!-- 阿顺特烦恼 --></div>
</div>
<script>
  const node = document.querySelector(`#app`)
  console.log(node.nodeName) //DIV
  console.log(node.firstChild.nodeName) //#text

  const as = document.querySelector('.ashun')
  console.log(as.childNodes[0].nodeName) //#comment
  console.log(as.attributes.class.nodeName);//calss
</script>
```

#### tagName

nodeName可以获取不限于节点种类的名称，tagName仅能用于获取标签元素节点名称

- tagName存在于Element类的原型中
- 元素上使用tagName与nodeName无异
- 获取值为大写形式

```text
<h1>ashun</h1>
<script>
  const node = document.querySelector('h1')
  console.log(node.tagName) //H1
</script>
```



---

#### nodeValue

使用nodeValue或data函数获取节点值，也可以使用节点的data属性获取节点内容

| nodeType | nodeValue |
| -------- | --------- |
| 1        | null      |
| 2        | 属性值    |
| 3        | 文本内容  |
| 8        | 注释内容  |

下面来看nodeValue的示例

```text
<div id="app">
  <div>阿顺特烦恼</div>
  <div class="as">ASHUN</div>
  <div class="ashun"><!-- 阿顺 --></div>
</div>
<script>
  const node = document.querySelector(`#app`)
  console.log(node.nodeValue) //null
  console.log(node.innerHTML)

  const as = document.querySelector('.as')
  console.log(as.firstChild.nodeValue) //ASHUN

  const ashun = document.querySelector('.ashun')
  console.log(ashun.childNodes[0].nodeValue) // 阿顺
</script>
```

使用data属性获取节点内容

```text
<div id="app">
  阿顺特烦恼
</div>

<script>
  const app = document.querySelector('#app')
  console.log(app.childNodes[0].data)
</script>
```



#### 树状节点

下面获取标签树状结构即多级标签结构，来加深一下nodeType/nodeName等知识

```text
<div id="app">阿顺特烦恼</div>
<script>
    function element(node) {
        if (node.nodeType != 1) return

        return Array.from(node.childNodes)
            .filter(node => node.nodeType == 1)
            .map(node => ({
                name: node.nodeName,
                children: element(node),
            }))
    }

    let nodes = element(document.documentElement)
    console.log(nodes)
</script>
```



---

### 节点集合

Nodelist与HTMLCollection都是包含多个节点标签的集合，大部分功能也是相同的。

- `getElementsBy...`等方法、`node.children` 返回的是HTMLCollection
- `querySelectorAll `、`node.childNodes` 返回的是 NodeList
- 二者都是`类数组`结构，可直接通过下标访问dom，但不能直接使用Array的方法，二者都可以迭代，二者也存在差异



**HTMLCollection**

* 不可使用`for/each`遍历
* 只是元素集合，包含dom元素

**NodeList**

* 可使用`for/each`遍历
* querySelectorAll 返回的虽然是 NodeList ，但是实际上是元素集合（只包含元素），并且是静态的（其他接口返回的HTMLCollection和NodeList都是live的）
* NodeList是节点集合（可以包含元素，也可以包含文本节点）



nodelist包含文本节点

<img src="C:/Users/张佳顺/Desktop/study1.assets/image-20210411170505383.png" alt="image-20210411170505383" style="zoom:80%;" />

```
<div class="a">
	<div class="cc"></div>
</div>
console.log(document.getElementsByClassName('a')[0].childNodes);//nodelist
console.log(document.getElementsByClassName('a')[0].children);//Htmlcollection
```

HTMLCollection不可使用for/each遍历操作

```
let htmlCollection = document.getElementsByClassName("shun");
let nodeList = document.querySelectorAll(".shun");

nodeList.forEach((v) => console.log(v));
htmlCollection.forEach((v) => console.log(v)); //forEach is not a function
```



#### length

Nodelist与HTMLCollection包含length属性，记录了节点元素的数量

```text
<div name="app">
  <div id="astfn">阿顺特烦恼</div>
  <div>ashun</div>
</div>
<script>
  const nodes = document.getElementsByTagName('div')
  for (let i = 0; i < nodes.length; i++) {
    console.log(nodes[i])
  }
</script>
```



#### 转换数组

有时使用数组方法来操作节点集合，这就需要将节点集合转化为数组类型，有以下几种方式可以实现。

1. 使用call调用原型方法

```text
<h1>阿顺特烦恼</h1>
<h1>Ashuntefannao</h1>
<script>
  let elements = document.getElementsByTagName('h1')
  console.log(elements)
  let arr = Array.prototype.slice.call(elements, 0)
  console.log(arr)
  arr.map((item) => {
    item.style.color = 'red'
  })
</script>
```

2. 使用Array.from转换

```text
<h1>阿顺特烦恼</h1>
<h1>Ashuntefannao</h1>
<script>
  let elements = document.getElementsByTagName('h1')
  console.log(elements)
  console.log(Array.from(elements))
</script>
```

3. 下面使用点语法转换节点为数组

```text
<h1>阿顺特烦恼</h1>
<h1>Ashuntefannao</h1>
<script>
  let elements = document.getElementsByTagName('h1')
  console.log(elements)
  ;[...elements].map((item) => {
    item.addEventListener('click', function () {
      this.style.textTransform = 'uppercase'
    })
  })
</script>
```

#### item

Nodelist与HTMLCollection提供了item()方法来根据索引获取元素

```text
<div name="app">
  <div id="astfn">阿顺特烦恼</div>
  <div>ashun</div>
</div>

<script>
  const nodes = document.getElementsByTagName('div')
  console.dir(nodes.item(0))
</script>
```

使用数组索引获取更方便

```text
<div name="app">
  <div id="astfn">阿顺特烦恼</div>
  <div>ashun</div>
</div>

<script>
  const nodes = document.getElementsByTagName('div')
  console.dir(nodes[0])
</script>
```



#### namedItem

HTMLCollection具有namedItem方法可以按name或id属性来获取元素

```text
<div name="app">
  <div id="astfn">阿顺特烦恼</div>
  <div name="as">ASHUN</div>
</div>

<script>
  const nodes = document.getElementsByTagName('div')
  console.dir(nodes.namedItem('as'))
   console.dir(nodes.namedItem('astfn'))
</script>
```

也可以使用属性方式获取

```text
<div name="app">
  <div id="astfn">阿顺特烦恼</div>
  <div name="as">ASHUN</div>
</div>

<script>
  const nodes = document.getElementsByTagName('div')
  console.dir(nodes['as']);
  console.dir(nodes.astfn)
</script>
```

即HTMLCollection，可以通过属性的形式，获取对应 `索引、id属性、name属性` 的dom元素。

```
<h1 id="astfn">阿顺特烦恼</h1>
<h1 name="as">ASHUN</h1>
<script>
  let items = document.getElementsByTagName('h1')
  console.log(items[0])
  console.log(items["astfn"])
  console.log(items['as'])
</script>
```



#### 常用元素

系统针对特定标签提供了快速选择的方式

下面展示的是获取所有a标签`document.links`

```text
<div name="app">
  <a href="">阿顺特烦恼</a>
  <a href="">Ashuntefannao</a>
</div>
<script>
  const nodes = document.links;
  console.dir(nodes)
</script>
```

获取特定元素方法如下

| 方法                     | 说明                   |
| ------------------------ | ---------------------- |
| document.documentElement | 文档节点即html标签节点 |
| document.body            | body标签节点           |
| document.head            | head标签节点           |
| document.links           | 超链接集合             |
| document.anchors         | 所有锚点集合           |
| document.forms           | form表单集合           |
| document.images          | 图片集合               |



---

### 节点关系

节点是父子级嵌套与前后兄弟关系，使用DOM提供的API可以获取这种关系的元素。

- **文本和注释也是节点，所以也在匹配结果中**
- 若只想获取dom元素，而不希望获得其它类型的节点，可以参考后续的**元素关系**

#### 基础知识

节点是根据HTML内容产生的，所以也存在父子、兄弟、祖先、后代等节点关系，下例中的代码就会产生这种多重关系

- h1与ul是兄弟关系
- span与li是父子关系
- ul与span是后代关系
- span与ul是祖先关系

```text
<h1>阿顺特烦恼</h1>
<ul>
  <li>
    <span>Ashuntefannao</span>
    <strong>ashun</strong>
  </li>
</ul>
```

下面是通过节点关系获取相应元素的方法

| 节点属性        | 说明             |
| --------------- | ---------------- |
| childNodes      | 获取所有子节点   |
| parentNode      | 获取父节点       |
| firstChild      | 子节点中第一个   |
| lastChild       | 子节点中最后一个 |
| nextSibling     | 下一个兄弟节点   |
| previousSibling | 上一个兄弟节点   |

子节点集合与首、尾节点获取

- 文本也是node所以也会在匹配当中

```text
<div id="app">
  <div>Ashuntefannao</div>
  <div>SHUN</div>
  <div>阿顺</div>
</div>
<script>
  const node = document.querySelector(`#app`)
  console.log(node.childNodes) //所有子节点
  console.log(node.firstChild) //第一个子节点是文本节点（换行符和空白字符）
  console.log(node.lastChild) //最后一个子节点也是文本节点（换行符和空白字符）
</script>
```

```
<div id="app">
  <div class="astfn" data="as">Ashuntefannao</div>
  <div class="shun">SHUN</div>
  <div class="ashun">阿顺</div>
</div>
<script>
  const node = app.querySelector(`.shun`)
  console.log(node.parentNode) //div#app
  console.log(node.childNodes) //文本节点
  console.log(node.nextSibling) //下一个兄弟节点是文本节点（换行符和空白字符）
  console.log(node.previousSibling) //上一个节点也是文本节点（换行符和空白字符）
</script>
```

document是顶级节点html标签的父节点是document

```text
<script>
  console.log(document.documentElement.parentNode === document)
</script>
```

下例是查找元素的所有父节点

```
<div id="as">ashuntefannao</div>

<script>
  function parentNodes(node) {
    let nodes = []
    while ((node = node.parentNode)) nodes.push(node)
    return nodes
  }
  const el = document.getElementById('as')
  const nodes = parentNodes(el)
  console.log(nodes)
</script>
```

获取所有的后代元素SPAN的内容

```text
<div id="app">
  <span>Ashuntefannao</span>
  <h2>
    <span>ASHUN</span>
  </h2>
</div>

<script>
  function getChildDom(parent, dom) {
  	let doms = [];
  	for (let elem of parent.childNodes) {
   		if (elem.nodeName === dom.toUpperCase()) doms.push(elem);
    	doms = doms.concat(getChildDom(elem, dom));
      // doms.push(...getChildDom(elem, dom));
  	}
   	return doms;
  }
  const app = document.getElementById('app')
  const nodes = getChildNodeByName(app, 'span')
  console.log(nodes)
</script>
```



### 元素关系

使用childNodes等获取的节点`包括文本与注释`，但这不是我们常用的，系统也提供了只操作元素的方法。

| 节点属性               | 说明                                             |
| ---------------------- | ------------------------------------------------ |
| parentElement          | 获取父元素                                       |
| children               | 获取所有子元素                                   |
| childElementCount      | 子标签元素的数量                                 |
| firstElementChild      | 第一个子标签                                     |
| lastElementChild       | 最后一个子标签                                   |
| previousElementSibling | 上一个兄弟标签                                   |
| nextElementSibling     | 下一个兄弟标签                                   |
| contains               | 返回布尔值，判断传入的节点是否为该节点的后代节点 |

以下实例展示怎样通过元素关系获取元素

```text
<div id="app">
  <div class="astfn">阿顺特烦恼</div>
  <div class="shun">SHUN</div>
  <div class="ashun"><!-- 阿顺 --></div>
</div>

<script>
  const app = document.querySelector(`#app`)
  console.log(app.children) //所有子元素
  console.log(app.firstElementChild) //第一个子元素 div.astfn
  console.log(app.lastElementChild) //最后一个子元素 div.ashun

  const as = document.querySelector('.ashun')
  console.log(as.parentElement) //父元素 div#app

  console.log(as.previousElementSibling) //上一个兄弟元素 div.astfn
  console.log(as.nextElementSibling) //下一个兄弟元素 div.ashun
</script>
```

html标签的父节点是document，但父标签节点不存在

```text
<script>
  console.log(document.documentElement.parentNode === document) //true
  console.log(document.documentElement.parentElement) //null
</script>
```



### 选取节点

系统提供了丰富的选择节点（NODE）的操作方法，下面我们来一一说明

#### getElementById

使用ID选择是非常方便的选择具有ID值的节点元素，但注意ID应该是唯一的

- 只能通过document对象调用

```text
<div id="as">Ashuntefannao</div>
<script>
  const node = document.getElementById('as')
  console.dir(node)
</script>
```

下面自定义函数来支持批量按ID选择元素

```text
<div id="as">Ashuntefannao</div>
<div id="app"></div>
<script>
  function getByElementIds(ids) {
    return ids.map((id) => document.getElementById(id))
  }
  let nodes = getByElementIds(['as', 'app'])
  console.dir(nodes)
</script>
```

拥有ID的元素可做为WINDOW的属性进行访问

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  console.log(app.innerHTML)
</script>
```

如果声明了变量这种访问方式将无效，所以并不建议使用这种方式访问对象

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  let app = 'ashun'
  console.log(app.innerHTML)
</script>
```

getElementById只能通过document访问，不能通过元素读取拥有ID的子元素，下面的操作将产生错误

```text
<div id="app">
  Ashuntefannao
  <div id="as">阿顺</div>
</div>
<script>
  const app = document.getElementById('app')
  const node = app.getElementById('as') //app.getElementById is not a function
  console.log(node)
</script>
```



#### getElementByName

使用getElementByName获取**设置了name属性的元素**，虽然在DIV等元素上同样有效，但一般用来对表单元素进行操作时使用。

- 返回NodeList节点列表对象
- NodeList顺序为元素在文档中的顺序

```text
<div name="astfn">阿顺特烦恼</div>
<input type="text" name="username" />

<script>
  const div = document.getElementsByName('astfn')
  console.dir(div)
  const input = document.getElementsByName('username')
  console.dir(input)
</script>
```



#### getElementsByTagName

使用getElementsByTagName用于按标签名获取元素

- 返回HTMLCollection元素集合
- 是不区分大小的获取

```text
<div name="astfn">阿顺特烦恼</div>
<div id="app"></div>
<script>
  const divs = document.getElementsByTagName('DIV')
  console.dir(divs)
</script>
```

**通配符**

可以使用通配符 ***** 获取所有元素

```text
<div name="astfn">阿顺特烦恼</div>
<div id="app"></div>

<script>
  const nodes = document.getElementsByTagName('*')
  console.dir(nodes)
</script>
```



#### getElementsByClassName

getElementsByClassName用于按class样式属性值获取元素集合

- 设置多个值时顺序无关，指包含这些class属性的元素

```text
<div class="astfn shun title">阿顺特烦恼</div>
<div class="shun">SHUN</div>
<script>
  const nodes = document.getElementsByClassName('shun')
  console.log(nodes.length) //2

  //查找包含class属性包括 astfn 与 shun 的元素
  const tags = document.getElementsByClassName('astfn shun')
  console.log(tags.length) //1
```



### 遍历节点

#### length

结合节点列表的length属性，使用for遍历

```text
<div name="app">
  <div id="astfn">阿顺特烦恼</div>
  <div name="ashun">ASHUN</div>
</div>
<script>
  const nodes = document.getElementsByTagName('div')
  for (let i = 0; i < nodes.length; i++) {
    console.log(nodes[i])
  }
</script>
```

#### forEach

Nodelist节点列表可以使用forEach来进行遍历，但HTMLCollection则不可以

```text
<div id="astfn">阿顺特烦恼</div>
<div name="ashun">ASHUN</div>
<script>
  const nodes = document.querySelectorAll('div')
  nodes.forEach((node, key) => {
    console.log(node)
  })
</script>
```

#### map

节点集合对象不是Array，原型中不存在map方法，但可以借用Array的原型map方法实现遍历

```text
<div id="astfn">阿顺特烦恼</div>
<div name="ashun">ASHUN</div>

<script>
  const nodes = document.querySelectorAll('div')
  Array.prototype.map.call(nodes, (node, index) => {
    console.log(node, index)
  })
</script>
```

#### Array.from

Array.from用于将类数组转为组件，并提供第二个迭代函数。所以可以借用Array.from实现遍历

```text
<div id="astfn">阿顺特烦恼</div>
<div name="ashun">ASHUN</div>

<script>
  const nodes = document.getElementsByTagName('div')
  Array.from(nodes, (node, index) => {
    console.log(node, index)
  })
</script>
```

也可以先使用Array.from将节点列表转为Array，再使用Array的方法

```
<div id="astfn">阿顺特烦恼</div>
<div name="ashun">ASHUN</div>

<script>
  const nodes = document.getElementsByTagName('div')
  let astfn=Array.from(nodes).filter(v=>v.id==="astfn");
  console.log(astfn)
</script>
```



#### forOf

节点集合是类数组的可迭代对象所以可以使用for...of进行遍历

```text
<div id="astfn">阿顺特烦恼</div>
<div name="ashun">ASHUN</div>
<script>
  const nodes = document.getElementsByTagName('div')
  for (const item of nodes) {
    console.log(item)
  }
</script>
```



#### 迭代器

也可使用`for/of`结合Object迭代器进行遍历

```
<div id="astfn">阿顺特烦恼</div>
<div name="ashun">ASHUN</div>
<script>
  const nodes = document.getElementsByTagName('div')
  for (let [key, dom] of Object.entries(nodes)) {
        console.log(key, dom);
  }
</script>
```

```
for (let key of Object.keys(nodes)) console.log(key);
```

```
for (let dom of Object.values(nodes)) console.log(dom);
```



---

### 样式选择器

在CSS中可以通过样式选择器修饰元素样式，在DOM操作中也可以使用这种方式查找元素。使用过jQuery库的朋友，应该对这种选择方式印象深刻。

使用getElementsByTagName等方式选择元素不够灵活，建议使用下面的样式选择器操作，更加方便灵活

#### querySelectorAll

使用querySelectorAll根据CSS选择器获取Nodelist节点列表

- `获取的NodeList节点列表是静态的，添加或删除元素后不变`
- 可以链式调用，即 既是document的接口，也是dom元素的接口。可以获取对应dom的子孙dom

获取所有div元素

```
<div class="title">阿顺特烦恼</div>
<div id="app">
  <div id="astfn">Ashuntefannao</div>
	<div class="ashun">ASHUN</div>
</div>

<script>
  const app = document.getElementById('app')
  const nodes = app.querySelectorAll('div')
  console.log(nodes.length) //2
</script>
```

可以在其中应用css选择器规则，获取对应的节点列表

* 获取id为app的dom中class为ashun的子节点

```
<div class="title">阿顺特烦恼</div>
<div id="app">
  <div id="astfn" class="ashun">Ashuntefannao</div>
	<div class="ashun">ASHUN</div>
</div>

<script>
 let nodes=document.querySelectorAll("#app .ashun");
 console.log(nodes.length);//2
</script>
```

* 根据属性选择器获取元素

```
<div class="title">阿顺特烦恼</div>
<div id="app">
  <div id="astfn" data="as">Ashuntefannao</div>
	<div class="ashun">ASHUN</div>
</div>

<script>
 let nodes=document.querySelectorAll("#app [data='as']");
 console.log(nodes[0]);
</script>
```



#### querySelector

querySelector使用CSS选择器获取一个元素，下面是根据属性获取单个元素

```text
<div id="app">
  <div id="astfn" data="as">Ashuntefannao</div>
	<div class="ashun">ASHUN</div>
</div>
<script>
  const node = app.querySelector(`#astfn[data='as']`)
  console.log(node)
</script>
```

若存在多个相同属性的元素，则只获取第一个

```
<div id="app">
  <div id="astfn" class="ashun">Ashuntefannao</div>
	<div class="ashun">ASHUN</div>
</div>
<script>
  const node = app.querySelector(`.ashun`)
  console.log(node)
</script>
```



#### matches

`node.matches(cssSelector)`用于检测**某元素**是否与 **指定的样式选择器匹配**，下面过滤掉所有name属性的LI元素。

```text
<div id="app">
  <li>Ashuntefannao</li>
  <li>ASHUN</li>
  <li name="as">阿顺</li>
</div>
<script>
  const app = document.getElementById('app')
  const nodes = [...app.querySelectorAll('li')].filter((node) => {
    return !node.matches(`[name]`)
  })
  console.log(nodes)
</script>
```



#### closest

查找最近的符合选择器的祖先元素（包括自身），下例查找父级拥有 `.comment`类的元素

```text
<div class="comment">
  <ul class="comment">
    <li>阿顺特烦恼</li>
  </ul>
</div>

<script>
  const li = document.getElementsByTagName('li')[0]
  const node = li.closest(`.comment`)
  console.log(node)
</script>
```



---

### 动态与静态获取

* 下面讨论的是 元素/节点**集合** 的动态与静态，而不是某个元素/节点的动态与静态。

* 获取某个元素都是静态的。

通过 getElementsByTagname 等getElementsBy... 函数获取的Nodelist与HTMLCollection集合是动态的，即有元素添加或移动操作将实时反映最新状态。

- 使用getElement...返回的都是动态的集合
- 使用querySelectorAll返回的是静态集合

#### 动态特性

下例中通过按钮动态添加元素后，获取的元素集合是动态的，而不是上次获取的固定快照。

```text
<h1>阿顺</h1>
<h1>Ashuntefannao</h1>
<button id="add">添加元素</button>

<script>
  let elements = document.getElementsByTagName('h1')
  console.log(elements)
  let button = document.querySelector('#add')
  button.addEventListener('click', () => {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<h1>阿顺特烦恼</h1>')
    console.log(elements)
  })
</script> 
```

document.querySelectorAll获取的集合是静态的

```text
<h1>阿顺</h1>
<h1>Ashuntefannao</h1>
<button id="add">添加元素</button>

<script>
  let elements = document.querySelectorAll('h1')
  
  console.log(elements.length)
  let button = document.querySelector('#add')
  button.addEventListener('click', () => {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<h1>阿顺特烦恼</h1>')
    console.log(elements.length)
  })
</script>
```



#### 使用静态

如果需要保存静态集合，则需要对集合进行复制

```text
<div id="astfn">Ashuntefannao</div>
<div class="ashun">ASHUN</div>
<script>
  const nodes = document.getElementsByTagName('div')
  const clone = Array.prototype.slice.call(nodes)
  console.log(nodes.length);//2
  document.body.appendChild(document.createElement('div'))
  console.log(nodes.length);//3
  console.log(clone.length);//2
</script>
```



### 标准属性

即在js中能够直接通过属性的方式，访问/操作DOM元素的属性。元素的标准属性具有相对应的DOM对象属性

- 操作属性`区分大小写`
- 多个单词属性命名规则为第一个单词小写，其他单词驼峰式命名
- 属性值是多类型并不全是字符串，也可能是对象等
- 事件处理程序属性值为函数
- style属性为CSSStyleDeclaration对象
- DOM对象不同生成的属性也不同

#### 属性别名

有些属性名与JS关键词冲突，系统已经起了别名

| 属性  | 别名      |
| ----- | --------- |
| class | className |
| for   | htmlFor   |

#### 操作属性

元素的标准属性可以直接进行操作，下面是直接设置元素的className

```text
<div id="app">
  <div class="astfn" data="as">阿顺特烦恼</div>
  <div class="ashun">Ashun</div>
</div>
<script>
  const app = document.querySelector(`#app`)
  app.className = 'astfn ashun'
</script>
```

下面设置图像元素的标准属性

```text
<img src="" alt="" />
<script>
  let img = document.images[0]
  img.src = 'https://www.Ashuntefannao.com/icon.jpg'
  img.alt = '阿顺特烦恼'
</script>
```

使用hidden隐藏元素

```text
<div id="app">阿顺特烦恼</div>
<script>
  const app = document.querySelector('#app')
  app.addEventListener('click', function () {
    this.hidden = true
  })
</script>
```

通过style属性改变行内样式

* js操作Dom属性时，多个单词属性命名规则为第一个单词小写，其他单词驼峰式命名
* js中的背景颜色`backgroundColor`,css中`backgorund-color`

```
<div id="app">阿顺特烦恼</div>
<script>
  const app = document.querySelector('#app')
  app.addEventListener('click', function () {
    this.style.backgroundColor = "red"
  })
</script>
```



#### 多类型值

大部分属性值是都是字符串，但并不是全部，下例中需要转换为数值后进行数据运算

```text
<input type="number" name="age" value="88" />

<script>
  let input = document.getElementsByName('age').item(0)
  input.value = parseInt(input.value) + 100
</script>
```

下面表单checked属性值为Boolean类型

```text
<label for="hot"> <input id="hot" type="checkbox" name="hot" />热门 </label>
<script>
  const node = document.querySelector(`[name='hot']`)
  node.addEventListener('change', function () {
    console.log(this.checked)
  })
</script>
```

属性值`并非`都与HTML定义的值一样，下面返回的href属性值是完整链接

```text
<a href="#Ashuntefannao" id="home">阿顺特烦恼</a>
<script>
  const node = document.querySelector(`#home`)
  console.log(node.href)	
  //http://127.0.0.1:5500/dom.html#Ashuntefannao
</script>
```



### 元素特征

#### 基本方法

对于标准的属性可以直接通过DOM属性的方式进行操作，但对于标签的 非标准的定制属性 则不可以。但JS提供了方法来控制标准或非标准的属性

可以理解为元素的属性分两个地方保存，DOM属性中记录标准属性，特征中记录标准和定制属性

- 使用特征操作时属性名称不区分大小写
- 特征值都为字符串类型

| 方法                         | 说明              |
| ---------------------------- | ----------------- |
| getAttribute("prop")         | 获取属性值        |
| setAttribute("prop","value") | 设置属性/添加属性 |
| removeAttribute("prop")      | 删除属性          |
| hasAttribute("prop")         | 属性检测          |

特征是可迭代对象，下面使用for...of来进行遍历操作

```
<body>
<button id="add" class="add">添加元素</button>
</body>
<script>
     let attrs = document.querySelector("#add").attributes;
      console.log(attrs);	//NamedNodeMap {…}
      for (const { name, value } of nameNodeMap) {
        console.log(name, value);
      }
</script>
```

使用`getAttribute`获取的属性值都为`字符串`，所以若要获取数值类型需要进行转换

```text
<input type="number" name="age" value="88" />
<script>
  let input = document.getElementsByName('age').item(0)
  let value = input.getAttribute('value') * 1 + 100
  input.setAttribute('value', value)
</script>
```

使用removeAttribute删除元素的class属性，并通过hasAttribute进行检测删除结果

```text
<div class="ashun">阿顺特烦恼</div>
<script>
  let as = document.querySelector('.ashun')
  as.removeAttribute('class')
  console.log(as.hasAttribute('class')) //false
</script>
```

特征值与HTML定义的值是`一致的`，这和标准属性进行访问是不同的

```text
<a href="#Ashuntefannao" id="home">后盾人</a>
<script>
  const node = document.querySelector(`#home`)
  
  // http://127.0.0.1:5500/dom.html#Ashuntefannao
  console.log(node.href)
  
  // #Ashuntefannao
  console.log(node.getAttribute('href'))
</script>
```



#### attributes

元素提供了attributes 属性可以只读的获取元素的属性

```text
<div class="astfn" data-content="阿顺">Ashuntefannao</div>
<script>
  let astfn = document.querySelector('.astfn')；
  console.log(astfn.attributes);
  console.dir(astfn.attributes['class'].nodeValue) //astfn
  console.dir(astfn.attributes['data-content'].nodeValue) //阿顺
</script>
```



#### 自定义特征

虽然可以随意定义特征并使用getAttribute等方法管理，但很容易造成与标签的现在或未来属性重名。建议使用以data-为前缀的自定义特征处理，针对这种定义方式JS也提供了接口方便操作。

- 元素中以data-为前缀的属性会添加到内置的data属性集中
- 使用`dom.dataset`可获取对应dom的data属性集
- 改变dataset的值也会影响到元素上

下面演示使用属性集设置DIV标签内容

```text
<div class="astfn" data-content="阿顺特烦恼" data-color="red">ashun</div>

<script>
  let astfn = document.querySelector('.astfn')
  let content = astfn.dataset.content
  console.log(content) //阿顺特烦恼
  astfn.innerHTML = `<span style="color:${astfn.dataset.color}">${content}</span>`
</script>
```

多个单词的特征使用驼峰命名方式读取

```text
<div class="astfn" data-title-color="red">ashun</div>
<script>
  let astfn = document.querySelector('.astfn')
  astfn.innerHTML = `
    <span style="color:${astfn.dataset.titleColor}">${astfn.innerHTML}</span>
  `
</script>
```

改变dataset值也会影响到页面元素上

```text
div class="astfn" data-title-color="red">ashun</div>
<script>
  let astfn = document.querySelector('.astfn')
  astfn.addEventListener('click', function () {
    this.dataset.titleColor = ['red', 'green', 'blue'][Math.floor(Math.random() * 3)]
    this.style.color = this.dataset.titleColor
  })
</script>
```



#### 属性同步

特征和标准属性，是记录元素属性的两个不同场所，`大部分更改会进行同步操作`。

* 有些情况，通过标准属性更改，不能同步到元素特征，但元素特征的更改，能够同步到标准属性
* 推荐使用属性特征方法

下面使用属性更改了className，会自动同步到了特征集中，反之亦然

```text
<div id="app" class="red">ASHUNTEFANNAO</div>
<script>
  const app = document.querySelector('#app')
  app.className = 'astfn'
  console.log(app.getAttribute('class')) //astfn
  app.setAttribute('class', 'blue')
  console.log(app.className) //blue
</script>
```

下面对input值使用标准属性设置，**但并没有同步到特征**

```text
<input type="text" name="package" value="Ashuntefannao" />
<script>
  const package = document.querySelector(`[name='package']`)
  package.value = '阿顺'
  console.log(package.getAttribute('value'))//Ashuntefannao
</script>
```

但改变input的特征value会同步到DOM对象的标准属性

```text
<input type="text" name="package" value="Ashuntefannao" />
<script>
  const package = document.querySelector(`[name='package']`)
  package.setAttribute('value', '阿顺')
  console.log(package.value) //阿顺
</script>
```



### 创建节点

创建节点的就是构建出DOM对象，然后根据需要添加到其他节点中

#### createTextNode

创建文本节点并添加到元素中

```text
<div id="app"></div>
<script>
  let app = document.querySelector('#app')
  let text = document.createTextNode('阿顺特烦恼')
  app.append(text)
</script>
```

#### createElement

使用createElement方法可以标签节点，下例创建span标签新节点并添加到div#app

```text
<div id="app"></div>
<script>
  let app = document.querySelector('#app')
  let span = document.createElement('span')
  span.innerHTML = 'Ashun'
  app.append(span)
</script>
```

使用PROMISE结合节点操作来加载外部JAVASCRIPT文件

```text
function js(file) {
  return new Promise((resolve, reject) => {
    let js = document.createElement('script')
    js.type = 'text/javascript'
    js.src = file
    js.onload = resolve
    js.onerror = reject
    document.head.appendChild(js)
  })
}

js('11.js')
  .then(() => console.log('加载成功'))
  .catch((error) => console.log(`${error.target.src} 加载失败`))
```

使用同样的逻辑来实现加载CSS文件

```text
function css(file) {
  return new Promise((resolve, reject) => {
    let css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = file
    css.onload = resolve
    css.onerror = reject
    document.head.appendChild(css)
  })
}
css('1.css').then(() => {
  console.log('加载成功')
})
```



#### cloneNode&importNode

使用cloneNode和document.importNode用于复制节点对象操作

- cloneNode是节点的方法：`dom.cloneNode(boolean)`
- cloneNode 参数为true时递归复制子节点即深拷贝
- importNode是documet对象方法：`document.importNode(elem,boolean)`

`dom.cloneNode(true)`复制div#app节点及其子节点，并添加到body元素中

```text
<div id="app"><span>阿顺特烦恼</span></div>
<script>
  let app = document.querySelector('#app')
  let newApp = app.cloneNode(true)
  document.body.appendChild(newApp)
</script>
```

`dom.cloneNode(false)`只clone目标节点本身,不递归复制子节点

```
<div id="app"><span>阿顺特烦恼</span></div>
<script>
	const node = document.querySelector(`#app`);
	let newNode = node.cloneNode(false);
	console.log(newNode);
</script>
```

`document.importNode(elem,boolean)`方法是低版本IE浏览器不支持的，也是复制节点对象的方法

- 第一个参数为节点对象
- 第二个参数为true时递归复制

```text
<div id="app"><span>阿顺特烦恼</span></div>
<script>
  let app = document.querySelector('#app')
  let newApp = document.importNode(app, true)
  document.body.appendChild(newApp)
</script>
```





---

### 节点内容

#### innerHTML

inneHTML用于向标签中添加html内容，同时触发浏览器的解析器`重绘DOM`。

下例使用innerHTML获取和设置div内容

```text
<div id="app">
  <span>阿顺特烦恼</span>
  <div class="as">Ashun</div>
</div>
<script>
  let app = document.querySelector('#app')
  console.log(app.innerHTML)

  app.innerHTML = '<h1>阿顺</h1>'
</script>
```

**重绘节点**

使用innertHTML操作会重绘元素，下面在点击第二次就没有效果了

- 因为对#app内容进行了重绘，即删除原内容然后设置新内容
- 重绘后产生的button对象`也没有了事件`
- 重绘后又产生了新img对象，所以在控制台中可看到新图片在加载

```text
<div id="app">
  <button>Ashuntefannao</button>
  <img src="1.jpg" alt="" />
</div>
<script>
  const app = document.querySelector('#app')
  app.querySelector('button').addEventListener('click', function () {
    alert(this.innerHTML)
    this.parentElement.innerHTML += '<hr/>阿顺特烦恼'
  })
</script>
```



#### outerHTML

outerHTML与innerHTML的区别是包含父标签

- outerHTML不会删除原来的旧元素
- 只是用新内容替换替换旧内容，旧内容（标签元素）依然存在
  - 设置后，再次打印获取dom或outerHTML还是原来的旧内容，但界面已经发生了更改

下面将div#app替换为新内容

```text
<div id="app">
  <div class="astfn" data="as">Ashuntefannao</div>
  <div class="shun">SHUN</div>
</div>
<script>
  let app = document.querySelector('#app')
  app.outerHTML = '<h1>阿顺特烦恼</h1>'
</script>
```

使用innerHTML内容是被删除然后使用新内容

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  const app = document.querySelector('#app')
  console.log(app)
  app.innerHTML = '阿顺特烦恼'
  console.log(app)
</script>
```

而使用outerHTML是保留旧内容，页面中使用新内容

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  const app = document.querySelector('#app')
  console.log(app,app.outerHTML)
  app.outerHTML = '阿顺特烦恼'
  console.log(app,app.outerHTML)
</script>
```



#### innerText与textContent

textContent与innerText是访问或添加文本内容到元素中

- textContent部分IE浏览器版本不支持
- innerText部分FireFox浏览器版本不支持
- 获取时忽略所有标签,只获取文本内容
- 设置时将内容中的标签当文本对待不进行标签解析

获取时忽略内容中的所有标签

```text
<div id="app">
  <h1>Ashuntefannao</h1>
</div>
<script>
  let app = document.querySelector('#app')
  console.log(app.textContent)
</script>
```

设置内容时会将标签当普通文本对待，即转为HTML实体内容

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  let app = document.querySelector('#app')
  app.textContent="<h1>阿顺特烦恼</h1>"
</script>
```



#### outerText

与innerText差别是：outerText会所操作标签本身，innerText操作标签内容

```text
<h1>Ashuntefannao</h1>
<script>
  let h1 = document.querySelector('h1')
  h1.outerText = '阿顺特烦恼'
  console.log(document.querySelector('h1')); //null
</script>
```



#### insertAdjacentText

`insertAdjacentText(position,str)`

将文本插入到元素指定位置，不会对文本中的标签进行解析，包括以下位置

| 选项        | 说明         |
| ----------- | ------------ |
| beforebegin | 元素本身前面 |
| afterend    | 元素本身后面 |
| afterbegin  | 元素内部前面 |
| beforeend   | 元素内部后面 |

添加文本内容到div#app前面

* 使用`insertAdjacentText`方法，只能追加普通文本，不会解析其中的HTML标签
* 若想要追加包含HTML标签的文本，并希望对其解析，可以使用后续章节**节点管理**中的`insertAdjacentHTML`

```text
<div id="app">
  <div class="astfn" data="hd">Ashuntefannao</div>
  <div class="shun">SHUN</div>
</div>
<script>
  let app = document.querySelector('#app')
  app.insertAdjacentText('beforebegin', '<h1>阿顺特烦恼</h1>')  //不会解析HTML标签
</script>
```



### 节点管理

现在我们来讨论下节点元素的管理，包括添加、删除、替换等操作

#### 推荐方法

| 方法                        | 说明                         |
| --------------------------- | ---------------------------- |
| `dom.append(elem/str)`      | 节点内尾部添加新节点或字符串 |
| `dom.prepend(elem/str)`     | 节点内开头添加新节点或字符串 |
| `dom.before(elem/str)`      | 节点前面添加新节点或字符串   |
| `dom.after(elem/str)`       | 节点后面添加新节点或字符串   |
| `dom.replaceWith(elem/str)` | 将节点替换为新节点或字符串   |
| `dom.remove()`              | 删除节点                     |

在标签内容后面添加新内容

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  let app = document.querySelector('#app')
  app.append('-阿顺特烦恼')
</script>
```

同时添加多个内容，包括字符串与元素标签

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  let app = document.querySelector('#app')
  let h1 = document.createElement('h1')
  h1.append('阿顺特烦恼')
  app.append('@', h1)
</script>
```

将标签替换为新内容

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  let app = document.querySelector('#app')
  let h1 = document.createElement('h1')
  h1.append('阿顺特烦恼')
  app.replaceWith(h1)
</script>
```

添加新元素h1到目标元素div#app里面

```text
<div id="app"></div>
<script>
  let app = document.querySelector('#app')
  let h1 = document.createElement('h1')
  h1.innerHTML = '阿顺特烦恼'
  app.append(h1)
</script>
```

将h2移动到h1之前

```text
<h1>阿顺特烦恼</h1>
<h2>Ashuntefannao</h2>
<script>
  let h1 = document.querySelector('h1')
  let h2 = document.querySelector('h2')
  h1.before(h2)
</script>
```

使用remove方法可以删除节点

```text
<div id="app">
  Ashuntefannao
</div>
<script>
  let app = document.querySelector('#app')
  app.remove()
</script>
```



#### insertAdjacentHTML

`insertAdjacentHTML(position,str)`

将html文本插入到元素指定位置，浏览器会对文本进行标签解析，包括以下位置

| 选项        | 说明         |
| ----------- | ------------ |
| beforebegin | 元素本身前面 |
| afterend    | 元素本身后面 |
| afterbegin  | 元素内部前面 |
| beforeend   | 元素内部后面 |

在div#app前添加HTML文本

```text
<div id="app">
  <div class="astfn" data="hd">Ashuntefannao</div>
  <div class="shun">SHUN</div>
</div>
<script>
  let app = document.querySelector('#app')
  app.insertAdjacentHTML('beforebegin', '<h1>阿顺特烦恼</h1>')  
</script>
```



#### insertAdjacentElement

`insertAdjacentElement(position,elem)`

insertAdjacentElement() 方法将指定元素插入到元素的指定位置，包括以下位置

- 第一个参数是位置
- 第二个参数为**新元素节点**

| 选项        | 说明         |
| ----------- | ------------ |
| beforebegin | 元素本身前面 |
| afterend    | 元素本身后面 |
| afterbegin  | 元素内部前面 |
| beforeend   | 元素内部后面 |

在div#app 标签前插入span标签

```
<div id="app">
  <div class="astfn">Ashuntefannao</div>
  <div class="shun">SHUN</div>
</div>
<script>
  let app = document.querySelector('#app')
  let span = document.createElement('span')
  span.innerHTML = '阿顺特烦恼'
  app.insertAdjacentElement('beforebegin', span)
</script>
```



#### 古老方法

下面列表过去使用的操作节点的方法，现在不建议使用了。但在阅读老代码时可来此查看语法

| 方法         | 说明                           |
| ------------ | ------------------------------ |
| appendChild  | 添加节点                       |
| insertBefore | 用于插入元素到另一个元素的前面 |
| removeChild  | 删除节点                       |
| replaceChild | 进行节点的替换操作             |



#### DocumentFragment

在了解DocumentFragment之前，我们先了解一下页面的呈现、回流、重绘的过程。

##### 基本知识

页面呈现、重绘、回流。

###### 界面呈现

> 获取html解析为Dom tree-->获取css样式解析为样式结构体-->Dom tree与样式结构体结合形成render tree

1. ```
   浏览器把获取到的html代码解析成1个Dom树，html中的每个tag都是Dom树中的1个节点，根节点就是我们常用的document对象(<html> tag)。dom树就是我们用开发者工具看到的html结构，里面包含了所有的html tag
   ```

2. ```
   浏览器把所有样式(主要包括css和浏览器的样式设置)解析成样式结构体，在解析的过程中会去掉浏览器不能识别的样式，比如IE会去掉-moz开头的样式，而firefox会去掉_开头的样式。
   ```

3. ```
   dom tree和 样式结构体 结合后构建 呈现树(render tree)
   render tree有点类似于dom tree，但其实区别有很大，render tree能识别样式，render tree中每个node都有自己的style，而且render tree不包含隐藏的节点(比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，所以就不会包含到render tree中。
   注意 visibility:hidden隐藏的元素还是会包含到render tree中的，因为visibility:hidden 会影响布局(layout)，会占有空间。根据css2的标准，render tree中的每个节点都称为box，box所有属性：width,height,margin,padding,left,top,border等。
   ```

4. ```
   一旦render tree构建完毕后，浏览器就可以根据render tree来绘制页面了。
   ```

   

###### 界面回流

当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(其实我觉得叫重新布局更简单明了些)。每个页面至少需要一次回流，就是在页面第一次加载的时候。

影响布局的操作都会产生回流，发生回流(节点重新构建)一定会触发重绘。

###### 界面重绘

当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。

界面重绘不一定存在界面回流。



----

##### 问题解决

当对节点进行添加、删除等操作时，都会引起页面回流来重新构建DOM渲染页面,

**解决以上问题可以使用以下几种方式**

1. 可以将DOM写成html字符串，然后使用innerHTML添加到页面中，但这种操作会比较麻烦，且不方便使用节点操作的相关方法。
2. 使用createDocumentFragment来管理节点时，此时节点都在内存中，而不是DOM树中。对节点的操作不会引发页面回流,带来比较好的性能体验。

**DocumentFragment特点**

- createDocumentFragment父节点为null
- 继承自node所以可以使用NODE的属性和方法
- createDocumentFragment创建的是文档碎片，节点类型nodeType为11。因为不在DOM树中所以只能通过JS进行操作
- 添加createDocumentFragment添加到DOM后,就不可以再操作createDocumentFragment元素了,这与DOM操作是不同的
- 将文档DOM添加到createDocumentFragment时,会移除文档中的DOM元素
- createDocumentFragment创建的节点添加到其他节点上时，会将子节点一并添加
- createDocumentFragment是虚拟节点对象，不直接操作DOM所以性能更好
- 在排序/移动等大量DOM操作时建议使用createDocumentFragment



### 表单控制

表单是高频操作的元素，下面来掌握表单项的DOM操作

#### 表单查找

JS为表单的操作提供了单独的集合控制

- 使用`document.forms`获取表单集合
- 使用`document.forms.formName`获取对应name属性的form表单
- 使用`form.elements.inputName\form.inputName`获取form中对应name属性的input表单元素
- 针对radio/checkbox获取的表单项是一个集合

```
<form action="" name="from1">
  <input type="text" name="form1_input" />
</form>
<script>
  const form = document.forms.form1
  console.log(form.elements.form1_input)
</script>
```

通过表单项可以反向查找FORM

```text
<form action="" name="form1">
  <input type="text" name="form1_input" />
</form>
<script>
  const form = document.forms.form1
  console.log(form.form1_input.form === form) //true
</script>
```





### 样式管理

通过DOM修改样式可以通过更改元素的class属性或通过style对象设置行样式来完成。

- 建议使用class控制样式，将任务交给CSS处理，更简单高效

#### 批量设置

* 使用`className`或`setAttribute`设置calss属性，**会覆盖原来的类名**

使用JS的className可以批量设置样式

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  
  console.log(app.getAttribute("class"))
  app.className = 'astfn'
  console.log(app.getAttribute("class"))
</script>
```

也可以通过特征的方式来更改

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  
  console.log(app.getAttribute("class"))
  app.setAttribute('class', 'astfn')
  console.log(app.getAttribute("class"))
</script>
```



#### classList

classList操作的是class属性列表，用于操作单个className，不会影响其它的className。如果对类单独进行控制使用 classList属性操作

| 方法                    | 说明     |
| ----------------------- | -------- |
| node.classList.add      | 添加类名 |
| node.classList.remove   | 删除类名 |
| node.classList.toggle   | 切换类名 |
| node.classList.contains | 类名检测 |

在元素的原有class上添加新class

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  
  console.log(app.getAttribute("class"))
  app.classList.add("ashun")
  console.log(app.getAttribute("class"))
</script>
```

使用classList也可以移除class列表中的某个class

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  
  console.log(app.getAttribute("class"))
  app.classList.remove('container')
  console.log(app.getAttribute("class"))
</script>
```

使用toggle切换类，即类已经存在时删除，不存在时添加

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  app.addEventListener('click', function () {
    this.classList.toggle('astfn')
  })
</script>
```

使用contains检查class是否存在

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  console.log(app.classList.contains('container')) //true
  console.log(app.classList.contains('as')) //false
</script>
```



#### 设置行样式

通过style对象可以对行内样式属性单独设置，使用cssText可以批量设置行内样式

>直接通过dom.prop能够访问/修改节点的对应属性,那么这个属性就是之前讲到的标准属性.
>
>通过style能够直接访问/修改 节点的样式属性 , 即操作的都是行内样式.

**样式属性设置**

使用节点的style对象来设置行样式

- 多个单词的属性使用驼峰进行命名

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  app.style.backgroundColor = 'red'
  app.style.color = 'yellow'
</script>
```

**批量设置行样式**

使用 `cssText="...cssStr"`属性可以批量设置行样式，**属性名和写CSS一样不需要考虑驼峰命名**

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  app.style.cssText = `background-color:red;color:yellow`
</script>
```

也可以通过`setAttribute`改变style特征来批量设置样式

```text
<div id="app" class="d-flex container">阿顺特烦恼</div>
<script>
  let app = document.getElementById('app')
  app.setAttribute('style', `background-color:red;color:yellow;`)
</script>
```



#### 获取样式

* 可通过`dom.style.prop`或`getAttribute`获取行内样式
* 可通过`window.getComputedStyle(dom).prop`对象获取样式属性，下面进行说明



`style`和`getAttribute`只能获取行样式

```text
<style>
  div {
    background-color: black;
  }
</style>
<body><div id="app">阿顺特烦恼</div></body>
<script>
      let app = document.getElementById("app");

      function getLineStyle(dom) {
        console.log(`getAttribute---${dom.getAttribute("style")}`);
        console.log(`dom.stype.prop---${dom.style.backgroundColor}`);
      }
      app.addEventListener("click", () => {
        getLineStyle(app);
        setTimeout(() => {
          app.style.backgroundColor = "yellowgreen";
          getLineStyle(app);
        }, 100);
      });
</style>
```



**getComputedStyle**

使用window.getComputedStyle可获取所有应用在元素上的样式属性

- 函数第一个参数为元素
- 第二个参数为伪类
- 获取计算后的样式属性，是所有样式复合的结果 , 所以取得的单位和定义时的可能会有不同

```
<style>
  div {
    background-color: black;
  }
</style>
<body><div id="app">阿顺特烦恼</div></body>
<script>
      let app = document.getElementById("app");
      app.addEventListener("click", () => {
        console.log(window.getComputedStyle(app).backgroundColor);
        setTimeout(() => {
          app.style.backgroundColor = "yellowgreen";
          console.log(window.getComputedStyle(app).backgroundColor);
        }, 100);
      });
</style>
```

window.getComputedStyle获取的是计算后的样式属性 , 是所有样式复合的结果

* 由于行内样式优先级别高 , 所以打印的是蓝色对应的rgb值

```
<style>
div {
	background-color: black;
}
</style>
<body><div id="app" style="background-color: blue">阿顺特烦恼</div></body>
<script>
      let app = document.getElementById("app");
      console.log(window.getComputedStyle(app).backgroundColor);  //rgb(0,0,255)
</style>
```

