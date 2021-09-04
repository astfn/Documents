## 数据可变性的问题

在React开发中，我们总是会强调数据的不可变性：

- 无论是组件中的state，还是redux中管理的state；
- 事实上在整个JavaScript编码过程中，数据的不可变性都是非常重要的；

数据可变性引发的问题（引用类型）：

- 我们明明没有修改obj，只是修改了obj2，但结果obj也被一并修改了
- 原因非常简单，引用类型数据，它们共同指向同一块内存空间，两个引用都可以任意修改该内存空间中的数据

```
const obj = {
  name: "SHUN",
  age: 18
}

console.log(obj); // {name: "SHUN", age: 18}
const obj2 = obj;
obj2.name = "Ashun";
console.log(obj); // {name: "Ashun", age: 18}
```

有没有办法解决上面的问题呢？

- 进行对象的拷贝即可：Object.assign、扩展运算符、遍历赋值
- 如果存在深层级嵌套，需要进行深拷贝，这里不再赘述

```
console.log(obj); // {name: "SHUN", age: 18}
const obj2 = {...obj};
obj2.name = "Ashun";
console.log(obj); // {name: "SHUN", age: 18}
```

这种对象的浅拷贝有没有问题呢？

- 从代码的角度来说，没有问题，也解决了数据可变性引发的问题；
- 从性能的角度来说，有问题，如果对象过于庞大，这种拷贝的方式会带来性能问题以及内存浪费；

为了解决**性能**问题，我们可以使用**ImmutableJS**👇。

## 认识ImmutableJS

`Immutable`对象的特点是：只要修改了对象，就会返回一个新的对象，旧的对象不会发生改变；

虽然听上去和对象的copy没什么区别，但为了解决**性能**问题，`Immutable`内部做了复杂的操作：

- 为了节约内存，又出现了一个新的算法：Persistent Data Structure（持久化数据结构或一致性数据结构）；

当然，我们一听到持久化第一反应可能是数据被保存到本地或者数据库，但是这里并不是这个含义：

- 用一种数据结构来保存数据；
- 当数据被修改时，会返回一个新对象，但是**新对象会尽可能利用之前的旧数据**，从而解决浪费内存的问题。

如何做到这一点呢？那就是**结构共享**：

<img src="01-初识immutableJS.assets/001.gif" alt="001" style="zoom:55%;" />

<img src="01-初识immutableJS.assets/002.png" alt="002" style="zoom:60%;" />

## Immutable常见API

我们来学习一下ImmutableJS常用的API，更多详情参照[官网](https://immutable-js.com/)

在 Immutable.js 的世界里有一套属于它自己的规则，如果我们想要拥有它所提供的便利性，就**必须先把我们熟知的原生数据结构转换成它内部提供的数据结构**来做更进一步的操作。 由于 Immutable.js 有提供各式各样不同的结构，下文将只介绍较基本且常用到的 `List`，`Map`。

* List：对应原生JS的Array。
  * 当我们希望Array具有数据不变性时，就可将其通过ImmutableJS转化为List
* Map：对应原生JS的Object。
  * 当我们希望Object具有数据不变性时，就可将其通过ImmutableJS转化为Object
* 如果涉及到引用类型的深层级嵌套，可以使用`fromJS()`进行深转换 ，会将深层级的 Array/Object 自动转化为 List/Map



### List

在使用List之前，我们先来对比一下原生代码：

* 很显然，在更改newArr后，arr也会被一并更改。

```
let arr = [1, 2, 3];
let newArr = arr;
newArr.push(4);
console.log(arr, newArr);
```

`immjs.List(arr)`，将目标数组转化为List

值得注意的是：ImmutableJS为我们提供了熟悉的API操作数组，但这些**API的返回值**与原生的API是不一样的。

* 当使用ImmutableJS提供的API更改原数据时，会返回一个新的数据，且该数据不会影响原数据。这也是我们之前一直提到的特性。
* 例如：原生Array的push方法，返回值为length，但在List中，会返回一个新的List

```
import immjs from "immutable";

let immArr = immjs.List([1, 2, 3]);
let newimmArr = immArr.push(4);
console.log(immArr, newimmArr);
```

控制台结果：

<img src="01-初识immutableJS.assets/003.png" alt="003" style="zoom:80%;" />

#### 常用方法

* `push(arg)`、`pop()`、`unshift(arg)`、`shift()`
* `delete(index)`、`set(index,arg)`、`get(index)`

```
let immArr1 = immjs.List([1, 2, 3]);

// 3.1.添加数据
console.log(immArr1.push("aaa"));
console.log(immArr1.set(2, "aaa"));

// 3.2.修改数据
console.log(immArr1.set(1, "aaaa"));

// 3.3.删除数据
console.log(immArr1.delete(0).get(0)); // 2

// 3.4.查询数据
console.log(immArr1.get(1));

//这些操作数据的方法都会返回一个新的immutable对象，原来的数据是不变的
console.log(immArr1);
```

#### 多层级嵌套List

当 List 内部又有包其他 List 时，则需要使用 和 ：`setIn()`、`getIn()`

`setIn(arr)` 和 `getIn(arr)` 的用法也很简单，arr中的数字其实就是每个层级的 Index。 我们只要指向对应的 Index 就可以了。 

* 下例在` setIn` 里的 [1，1] 其实就是要取得 [1，[2，3]，4] 里的 [2，3] 里的 3 并将它修改成 100。
*  `getIn()`也同理，可应用于取值。

```
var list1 = Immutable.fromJS([1,[2,3],4]);
var list2 = list1.setIn([1,1],100);
// 此时 list2 相当于 Immutable.fromJS([1,[2,100],4])
console.log(list2.getIn([1,0])); // 2
console.log(list2.getIn([1,1])); // 100
```

前面我们也说到过：如果涉及到引用类型的深层级嵌套，可以使用`fromJS()`进行深转换 ，会将深层级的 Array/Object 自动转化为 List/Map：

```
let arr = [[1, 2], { name: "ASHUN" }, { name: "lisi" }];
let immArr = immjs.fromJS(arr);
console.log(immArr);
```

<img src="01-初识immutableJS.assets/004.png" alt="004" style="zoom:80%;" />

当然，如果我们**没有**深层级转化为immutable数据结构，依然**不会影响**数据的不可变性：

```
let arr = [[1, 2], { name: "ASHUN" }, { name: "lisi" }];
let immArr = immjs.List(arr);
let newImmArr = immjs.List(arr).push("Ashuntefannao");
console.log(newImmArr, immArr);
```

<img src="01-初识immutableJS.assets/005.png" alt="005" style="zoom:80%;" />

### Map

ImmutableJS中的`Map`与原生JS中的`Object`相对应。

```
let obj = { name: "Ashun", age: 18 };
let immObj = immjs.Map(obj);
console.log(immObj);
```

<img src="01-初识immutableJS.assets/006.png" alt="006" style="zoom:80%;" />

常用方法：

* `get("propName")`，获取对应属性值
* `set("propName",value)`，增加/修改属性
* `delete("propName")`，删除某属性

```
let obj = { name: "Ashun", age: 18 };
let immObj = immjs.Map(obj);
console.log(immObj.set("name", "ASHUN"));
console.log(immObj.set("title", "Ashuntefannao"));
console.log(immObj.get("age"));
console.log(immObj.delete("title"));
```

同理，深层级嵌套，也可使用`fromJS()`进行深转换。

* 此时操作深层级的数据，也可使用`getIn(arr)`、`setIn(arr)`逐级锁定对应的属性。

```
let obj = {
  name: "Ashun",
  age: 18,
  info: {
    type: "Controller",
    like: "coding",
  },
};
let immObj = immjs.fromJS(obj);
console.log(immObj.setIn(["info", "type"], "VIP"));
console.log(immObj.getIn(["info", "type"]));	//Controller
```

### immutable 转为 JS对象

前面我们一直将JS对象转化为immutable数据结构，但如果我们想获取原来的JS对象，可以使用`toJS()`

```
let obj = {
  name: "Ashun",
  age: 18,
};
let arr = [1, 2, 3];

let immObj = immjs.Map(obj);
let immArr = immjs.List(arr);

let rawObj = immObj.toJS();
let rawArr = immArr.toJS();
console.log(rawObj, rawArr);
// {name: "Ashun", age: 18}  [1, 2, 3]
```
