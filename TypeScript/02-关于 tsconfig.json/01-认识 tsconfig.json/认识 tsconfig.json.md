## tsconfig.json 的作用

#### 个性化配置

* ts 的配置文件，即 `tsconfig.json` ，我们可以在其中对 ts 项目进行各种配置，达到一定的规范。
* 如果一个目录下存在`tsconfig.json`文件，ts 的编译器会把该目录视为一个 ts 的项目目录。

#### 批量处理文件

在 ts 项目目录中（目录下存在`tsconfig.json`文件），可以通过一些指令（**不指定文件名称即可**），批量的处理一些文件。

**举一些例子：**

*批量编译：*

直接使用 `tsc` 指令，ts 编译器会自动把项目目录中包含的所有 ts 文件编译为 js 文件。

>（值得注意的是：若此时依旧指定了某个文件名称，例如 `tsc index.js`，则在编译该文件时，会忽略 `tsconfig.json` 配置文件）

*批量观察：*

直接使用 `tsc -watch` ，ts 编译器会自动观察项目目录中包含的所有 ts 文件。当这些文件被修改时，会自动编译为 js 文件。

如果在批量观察的基础上，希望 ts 文件出错时，不重新编译为 js： `tsc -watch -noEmitOnError` 

#### 自动解决文件冲突

 `tsconfig.json` 不仅能够让我们进行个性化配置，还能够自动解决文件冲突。

什么是文件冲突？

* 默认情况下，编译器会把同级目录下同名的 ts、js 文件**视为同一个块级作用域**。
* 因此，一些变量、函数，将不能够被重复声明。例如：当使用 `let`、`const` 编写 ts ，并将其转化为 js 后，会进行报错

ashun.ts

```
let myName: string = "Ashun";
let age: number = 18;

console.log(myName, age);
```

编译为 ashun.js 后

```
var myName = "Ashun";
var age = 18;
console.log(myName, age);
```

由于 `let`、`const` 定义的变量，不允许重复声明，此时会报错：

<img src="认识 tsconfig.json.assets/001.png" alt="001" style="zoom:100%;" />



## 创建 tsconfig.json

1. 手动创建

2. 运行 `tsc --init` 指令，自动创建。

   使用指令创建的 `tsconfig.json` ，文件中会自动包含一些默认配置项。



