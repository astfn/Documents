### 前言

​	关于声明变量，在 JavaScript 中主要有两种：第一种就是通过"老前辈" var 来声明，第二种就是我们现在最经常使用的 let、const。

至于它们的区别，我们每个人都能说上来：

var：

* 变量提升，可以先使用后声明
* 所声明的标识符会被追加到全局
* 当前所在作用域可以重复声明同名标识符

let、const：

* 具有 TDZ 暂时性死区，必须先声明后使用。

* 结合 `{}` 可形成块级作用域，并会把当前的值立刻分配到块级作用域当中

  ```
    let p = Promise.resolve();
    for (let i = 1; i < 6; i++) {
      p = p.then(() => {
        console.log(i);	// 1 ~ 5
      });
    }
  ```

* 所声明的标识符不会污染全局、当前所在作用域不可重复声明同名标识符

### 本文探讨内容

​	上面我们一直在说使用声明语句去创建变量的情况，那在 JavaScript 中不使用任何声明语句，直接访问/操作一个变量，会怎样呢？

阅读以下代码示例，你将会有所了解，还可能会很诧异

#### 示例一

```
console.log(a);
```

结果: a is not defined

#### 示例二

```
const p = Promise.resolve().then(() => (a = 1));
function test() {
  console.log(a)
}
test();
```

结果: a is not defined

#### 示例三

```
const p = Promise.resolve().then(() => (a = 1));
function test() {
  p.then(() => console.log(a));
}
test();
```

结果: 1

#### 示例四

```
console.log((a = 2))
```

结果：2

#### 示例五

```
function test() {
  a = 2;
  console.log(a);
}
test();
console.log(a);
```

结果：2、2

#### 示例六

```
function test() {
  console.log(a);
  a = 2;
  console.log(a);
}
test();
console.log(a);
```

结果：a is not defined

#### 示例七

```
function test() {
  console.log(a);
  a = 2;
  console.log(a);
}
test();
console.log(a);
```

结果：a is not defined

#### 示例八

```
function test() {
  function nestTest() {
    a = 1;
    console.log(a);
  }
  nestTest();
}
test();
console.log(a);
```

结果：1、1

#### 示例九

```
function test() {
  var a;
  function nestTest() {
    a = 1;
    console.log(a);
  }
  nestTest();
}
test();
console.log(a);
```

结果：1、Error：a is not defined

#### 示例十

```
function test() {
  console.log(a);
  var a;
  function nestTest() {
    a = 1;
    console.log(a);
  }
  nestTest();
}
test();
console.log(a);
```

结果：undefined、1、Error：a is not defined

#### 示例十一

```
function test() {
  console.log(a);
  function nestTest() {
    a = 1;
    console.log(a);
  }
  nestTest();
}
test();
console.log(a);
```

结果：Error：a is not defined

#### 示例十二

```
a = 1;
function test() {
  console.log(a);
  function nestTest() {
    a = 1;
    console.log(a);
  }
  nestTest();
}
test();
console.log(a);
```

结果：1、1、1

### 总结

​	看完上述十二个示例，估计有不少同学已经懵逼了。其实上述代码示例并不是每种都那么特殊，有些特性重复的出现在了多个示例当中，只不过变换了一种形式而已。下面我来总结一下这些特性：

##### 在当前作用域访问一个从未声明过的变量

* 按照作用域链路逐级向上查找，直至查找到顶层(window)
  * 查找到，则成功访问
  * 若一直查找到顶层还未找到，则会报错

**在当前作用域操作一个从未声明过的变量**

* 先查询
  * 按照作用域链路逐级向上查找，直至查找到顶层(window)
* 后操作
  * 若在父级作用域中查找到同名变量，则将会改变此变量的值
  * 若一直查找到顶层若还未找到，则会把该变量追加到顶层(window)上

---

​	你会发现，访问/操作一个从未手动声明过的变量，其实是对作用域链路的知识考察。并且这个过程是在代码运行时体现的，并非预解析阶段。而我们耳熟能详的变量提升是在 JS 的预解析阶段体现的。

​	例如[代码示例九](####示例九)，浏览器并不会在一开始就报出最后一行的错误，而是在代码真正 run 到对应位置才会报错。

### 规避隐患

​	默认情况下，如果你试图访问一个从未手动声明过的变量，则会报错；但如果你直接给一个从未手动声明过的变量去赋值，此时并不会报错，并且可能会产生污染全局 window 的负面影响。

​	如果想要避免这个隐患，也很简单，只要开启脚本的严格模式即可，在严格模式下，如果直接给一个从未手动声明过的变量去赋值，则会直接报错。**因为严格模式下要求：变量必须先声明，才能进行操作**。

​	值得注意的是，严格模式下只会强行约束：变量必须先声明，才能进行操作。但并不强行约束先声明变量，才能访问变量。

​	因为 var 的变量提升特性并不会收到影响，所以依旧存在先访问变量，再手动声明变量，但结果并不会报错的可能。

​	当然了，如果是用 let、const 去声明变量，则不论是否开启了严格模式，都必须先声明再访问/操作变量，否则都会报错。

​	这也是为何现代开发者都只是用 let、const 声明变量的重要原因之一。