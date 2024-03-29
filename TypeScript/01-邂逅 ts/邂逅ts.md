## 什么是 TypeScript？

TypeScript 是 JavaScript **带有类型的超集**，并且可以**编译**为普通的 JavaScript 代码。

这里有三个关键字，分别为：带有类型、超集、编译。

##### 带有类型

​	我们知道：JS 在定义变量时，类型是动态的，只有在 JS 真正运行时，才可确定变量的具体类型。并且变量的类型可以随时被修改。

```
let number = 666;
number = "666";
```

​	而 TS 中则要求：变量在定义时，就要确定变量的类型。并且后续不可随意更改。

```
let num = 666;
num = "Ashun";
// error TS2322: Type '"Ashun"' is not assignable to type 'number'.
```

##### 超集

TS 是 JS 带有类型的超集，`超集` 的意思为：TS 支持所有的 JS 语法，并且在 JS 的基础上增添了许多功能和特性。

也就是说：

* JS 可以被 TS 正确编译
* 我们可以在 TS 中编写传统的 JS
* 自己可以决定使用多少 TS 特性

##### 编译

​	TS 本身不能直接在 `浏览器`、`Node.js` 环境下运行，因为它不是 JS 。因此我们需要通过编译过程，让 TS 编译为 JS。

## 为什么使用 TypeScript？

* 由于 TS 内部具有 `类型检查机制` ，我们可以在编写代码时立即发现类型、语法上的错误。
* 在编写大型项目时，类型本身就起到了文档的作用，我们可以快速得知变量的类型，或者函数需要接受什么类型的参数，这些参数的类型是什么，函数本身返回何类型的值。等等。
* 容易上手：TS 是 JS 带有类型的超集，有了一定的 JS 基础，就可快速学习 TS。



## 如何使用TypeScript

*这里先来概括下 TS 的使用步骤：*

1. 安装 ts 编译器
2. 按照 ts 语法编写代码
3. 通过编译器将 ts 代码编译为：可以在 `浏览器`、`Node.js` 环境下运行的 js 代码。

*详细解析：*

由于 TS **需要进行编译**，才能生成可运行的 JS 代码，所以需要**安装编译器**。

* 在 Node.js 环境下安装 TS 的编译器

```
npm install -g typescript
```

按照 ts 语法编写代码

* 新建一个 index.ts 文件，编写 ts

```
let name : string = "Ashun";
console.log(name);
```

运行指令，使用编译器，将 ts 文件编译为 js

* tsc 意为 `typescript compiler`

```
tsc index.ts
```

此时，项目目录下就会出现已经编译好的 js 文件，运行该文件即可。

```
node index.js
```

即可出现结果

```
Ashun
```

>这是 ts 的基本使用过程，后面我将持续学习、记录 ts 的语法。