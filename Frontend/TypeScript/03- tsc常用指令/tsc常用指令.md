### 汇总

其实可以发现，后续文章介绍的指令看起来很繁多，实际上只不过是 **各个指令之间的组合** ，这里将把这些指令汇总为表格。

最基本的指令为：`tsc`，代表启用 `ts compiler` ，若后面追加指定文件名称，则单独操作该文件，否则为批量处理。

（若想批量处理，则需保证该目录下存在 tsconfig.json）

| command        | desc                                                 |
| -------------- | ---------------------------------------------------- |
| -watch         | 观察 ts 文件：当 ts 文件改变时，自动重新编译为 js 。 |
| -noEmitOnError | ts 文件出错时，不编译为 js，反之重新编译             |
|                |                                                      |



### 编译文件

**编译指定 ts 文件**：`tsc fileName.ts`

**编译 ts 项目目录下的所有 ts 文件**：`tsc` 

* 成为 ts 项目目录的条件：该目录具有 `tsconfig.json` 
* 若在 ts 项目目录中，依旧指定文件名称进行编译，则该文件在编译过程中：会忽略 `tsconfig.json` 中的配置。

**ts 文件出错时，不编译为 js**：`tsc -noEmitOnError fileName.ts`

* 使用上文中的指令，如果 ts 有异常，则依旧会编译为 js。
* 如果期望 ts 文件出错时，不编译为 js。可以使用该指令

### 观察文件

观察文件的含义：当某个被观察的 ts 文件改变时，自动将其编译为 js 。

**观察指定 ts 文件**：`tsc -watch fileName.ts`

**观察 ts 项目目录下的所有 ts 文件**：`tsc -watch`

**如果在批量观察的基础上，希望 ts 文件出错时，不编译为 js**：

* 观察指定文件时：`tsc -watch -noEmitOnError fileName.ts`
* 观察 ts 项目目录下的所有 ts 文件时：`tsc -watch -noEmitOnError`



