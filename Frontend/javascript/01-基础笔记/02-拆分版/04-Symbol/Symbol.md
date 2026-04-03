---
title: Symbol
date: 2021-05-16 13:27:24
tags:
categories:
- [Web前端,JavaScript大总结]
---

## Symbol

Symbol用于防止属性名冲突而产生的，比如向第三方对象中添加属性时。

Symbol 的值是唯一的，独一无二的不会重复的



### 基础知识

`Symbol`是一个基本类型，`没有构造函数`所以也就不能通过`new`关键字来进行实例化。而是直接使用`Symbol()`声明。既然其没有构造函数，所以不能够使用`instanceof`判断类型。可以使用typeof判断类型。

```text
let as = Symbol();
let edu = Symbol();
console.log(as); //Symbol()
console.log(as == edu); //false

console.log(typeof as); //symbol
```

Symbol 不可以添加属性

```text
let as = Symbol();
as.name = "ashun";
console.log(as.name); //undefined
```

#### 描述参数

可传入字符串用于描述Symbol，方便在控制台分辨Symbol

```text
let as = Symbol("ashun");
let sy = Symbol("Ashuntefannao");

console.log(as); //Symbol(ashun)
console.log(sy.toString()); //Symbol(Ashuntefannao)
```

传入相同参数Symbol也是独立唯一的，因为参数只是描述而已，但使用 `Symbol.for`则不会

```text
let symbol1 = Symbol("ashun");
let symbol2 = Symbol("ashun");
console.log(symbol1 == symbol2); //false
```

使用`description`可以获取传入的描述参数

```text
let as = Symbol("阿顺");
console.log(as.description); //阿顺
```



----

#### Symbol.for

根据描述获取Symbol，如果不存在则新建一个Symbol

- 使用Symbol.for会在系统中将Symbol登记
- 使用Symbol则不会登记

由于Symbol.for会使得系统对Symbol做记录，所以只要`描述相同`，引用的就是同一个内存地址，即恒等。

```text
let as = Symbol.for("ashun");
let zs = Symbol.for("ashun");
console.log(as === zs); //true
```

```
let as = Symbol.for();
let zs = Symbol.for();
console.log(as === zs); //true
```



#### Symbol.keyFor

`Symbol.keyFor(Symbol.for())` 根据使用`Symbol.for`登记的Symbol返回描述，如果找不到返回undefined 。

```text
let as = Symbol.for("ashun");
console.log(Symbol.keyFor(as));//ashun
console.log(Symbol.keyFor(Symbol.for()));//undefined

let symbol=Symbol("Ashun");
console.log(Symbol.keyFor(symbol))//undefined
```

---

#### 设置obj属性

Symbol 是独一无二的所以可以保证对象属性的唯一。

- Symbol 变量在作为对象属性声明和访问时，使用 `[]`（变量）形式操作
- 也不能使用 `.` 语法因为 `.`语法是操作字符串属性的。

下面写法是错误的，会将`symbol` 当成字符串`symbol`处理

```text
let symbol = Symbol("ashun");
let obj = {
	symbol: "Ashuntefannao.com",
};
console.log(obj);//{symbol: "Ashuntefannao.com"}
```

正确写法是以`[]` 变量形式声明和访问

```text
let symbol = Symbol("ashun");
let obj = {
  [symbol]: "Ashuntefannao.com"
};
console.log(obj);//{Symbol(ashun): "Ashuntefannao.com"}
console.log(obj[symbol]); //Ashuntefannao.com
```



---

### 实例操作

##### **缓存操作**

使用`Symbol`可以解决在保存数据时由于名称相同造成的耦合覆盖问题。

```text
class Cache {
	static data = {};
	
	static get(key) {
		return data[key];
	}
	
	static set(val, key) {
		this.data[key] = val;
	}	
}

let user = {
	name: "Ashun",
	type: "Controller",
	key: Symbol("用户"),
};
let cart = {
	name: "ShoppingCart",
	type: "store",
	key: Symbol("购物车"),
};

Cache.set(user, user.key);
Cache.set(cart, cart.key);
console.log(Cache.data[Symbol("用户")]);	//undefined
console.log(Cache.data[user.key]);		//{name: "Ashun", type: "Controller", key: Symbol(用户)}
```



##### 遍历属性

Symbol作为属性名称：不能使用 `for/in`、`for/of` 遍历操作

```text
let symbol = Symbol("ashun");
let obj = {
	 name: "Ashun",
	 type: "Controller",
	 [symbol]: "Ashuntedannao.com",
};

for (let key in obj) {
console.log(key);   //name type
}
for (let val of Object.values(obj)) {
console.log(val);		//Ashun Controller
}
```

可以使用 `Object.getOwnPropertySymbols` 获取所有`Symbol`属性

* `Object.getOwnPropertySymbols`返回的是一个包含所有Symbol类型属性名的Array

```text
...
for (const key of Object.getOwnPropertySymbols(obj)) {
  console.log(key);
}

console.log(Object.getOwnPropertySymbols(obj));
```

也可以使用 `Reflect.ownKeys(obj)` 获取所有属性包括`Symbol`

* Reflect.ownKeys(obj)能够映射obj中的所有属性，包括`Symbol`

```text
...
for (const key of Reflect.ownKeys(obj)) {
  console.log(key);
}
...
```

如果对象属性不想被遍历，可以使用`Symbol`类型进行保护

```text
const site = Symbol("网站名称");

class User {
	constructor(name) {
	this[site] = "阿顺";
	this.name = name;
	}
	getName() {
		return `${this[site]}--${this.name}`;
	}
}

let user = new User("Ashuntefannao.com");
console.log(user.getName());

for (let key in user) {
		console.log(key); //name
}
```

