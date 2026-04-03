## class中不能被挂载到prototype上的方法

### class中定义箭头方法：

[class中的箭头函数和普通函数的this指向 - 掘金 (juejin.cn)](https://juejin.cn/post/6923086072855396366#comment)

* 箭头方法将不能够被追加到 prototype 上，而是追加到 class 本身
* 箭头函数也依旧保留原来的特性：没有自身的this，在定义时，this已经被指定为父级作用域的this
* 而 class 本质上也是函数，所以 this 指向 class 本身
* 但值得注意的是：如果实例化 class 为 obj ，通过 obj 调用 class 中的箭头函数方法，此时的 this 却能够正常的指向 obj。
* 因为 `new constructor()` 就是将 this 分配到实例的过程。

```
class Product {
  name = "";
  price = 0;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    console.log("the product is " + this.name);
    return this.name;
  }

  // 这种声明形式，将不能被挂载到prototype上
  getPrice = () => {
    console.log("it is " + this.price);
    console.log(this);
    return this.price;
  };
}
```

```
console.log(Product.prototype); //{constructor: ƒ, getName: ƒ}
```

```
let slipper = new Product("slipper", 18);
let gift = new Product("gift");
console.log(slipper.getPrice());
/*
  it is 18
  Product {name: 'slipper', price: 18, getPrice: ƒ}  //这里打印的this就是slipper
  18
*/
console.log(gift.getPrice());
/*
  it is undefined
  Product {name: 'gift', price: undefined, getPrice: ƒ}	//gift
  undefined
*/
```

相当于普通函数：

* show方法被分配到 TEST 自身，但当 new TEST() 时，会将 this 分配给实例对象，因此每一个实例都会有一个 show

```
function TEST() {
  this.show = () => {
    console.log(this.name);
  };
  this.name = "Ashun";
}

console.dir(TEST);

const as = new TEST();
as.show();
console.log(as);
```

看到这里，你可能会有点疑惑？

​	为何在 class 中声明箭头函数方法，会破坏这种特性（class中的方法将被自动挂载到原型对象上），箭头函数就这么特殊吗？

其实不然，本质上和箭头函数没有关系，而是我们声明方法的形式出了问题。

我们先来回顾一个基础知识：

```
class Admin {
  type = "controller";
  weight = Infinity;

  constructor({ name, age }) {
    this.name = name;
    this.age = age;
  }

  show() {
    console.log(`名称:${this.name};年龄${this.age}`);
  }
}
```

当我们打印 admin 实例时，该对象自身应该具有哪些数据？

```
let admin = new Admin({ name: "Ashun", age: 18 });
console.log(admin);
```

这有什么难的，不就是四个嘛：type、weight、name、age。

此时有的同学已经恍然大悟了。

* 在 constructor 外部定义的属性，依旧会被分配到实例上

我们再来看看之前的案例：

```
class Product {
  name = "";
  price = 0;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    console.log("the product is " + this.name);
    return this.name;
  }

  // 这种声明形式，将不能被挂载到prototype上
  getPrice = () => {
    console.log("it is " + this.price);
    console.log(this);
    return this.price;
  };
}
```

getPrice 此时相当于一个在 constructor 外部声明的一个属性，只不过它的属性值是一个函数而已。

这样看起来可能比较清晰：

* name、price、getPrice，它们其实是一样的，都在 constructor 外部使用 `=` 的形式，定义了实例对象自身的属性。

```
class Product {
  name = "";
  price = 0;
  // 这种声明形式，将不能被挂载到prototype上
  getPrice = () => {
    console.log("it is " + this.price);
    console.log(this);
    return this.price;
  };
  
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    console.log("the product is " + this.name);
    return this.name;
  }
}
```

因此，即便 getPrice 不是箭头函数，也不会被划分到 prototype 上。

```
getPrice = function(){……};
```



