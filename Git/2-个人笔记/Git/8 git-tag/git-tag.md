如果要持续维护一个项目，肯定要不断进行以下过程：

1. 功能的更新
2. bug的修复
3. 稳定版本的发布

我们就要思考，怎样进行合理的管理，这里总结一下具体的思路：

## tag名称规范

* A.B.C
  * A: 大版本，大feature更新
  * B: 小版本，小feature的更新、优化
  * C: bug fix（错误修复）版本，只修复bug，无新增feature。

例如：

* v1.0.0  项目最初版本
* v1.1.0  项目更新了一个小feature
* v1.1.1  上次的feature有bug，或之前一直有潜在bug，修复后的版本
* v2.0.0  项目大升级
* ……

## tag的使用

### 了解tag

​	当项目进行不断维护、更新时，对于不同的版本，我们可以打上一个`tag`，更加利于查看和管理。

### 基本命令

* --查看--

| 命令               | 作用              |
| ------------------ | ----------------- |
| git tag            | 打印所有的tag名称 |
| git show `tagName` | 查看目标tag的信息 |

* --增加--

| 命令                             | 作用                             |
| -------------------------------- | -------------------------------- |
| git tag `tagName` -m "`comment`" | 创建tag，该tag会指向当前的commit |

* --推送--

| 命令                          | 作用                    |
| ----------------------------- | ----------------------- |
| git push ssh_origin `tagName` | 将tag推送到目标远程库中 |

* --管理--

| 命令                                     | 作用                                         |
| ---------------------------------------- | -------------------------------------------- |
| git tag -d `tagName`                     | 删除本地的目标tag                            |
| git push ssh_origin :refs/tags/`tagName` | 删除远程库的对应tag                          |
| git tag -f `tagName`                     | -f（force），将目标tag强制转换到当前的commit |

## 场景模拟

下面我们模拟一下开发中可能遇到的场景，通过这些问题的解决，更加深入了解tag的使用、管理。

### 首次版本发布

首次版本的发布(`v1.0.0`)，很简单，我们只需要创建一个tag，该tag会自动指向当前的commit结果。

```
//基本操作
git add .
git commit -m "v1.0.0的发布"
git push ssh_origin master

//tag的创建、推送
git tag v1.0.0
git push ssh_origim v1.0.0
```

### 修复bug

在后期我们可能发现了一些bug，虽然可以直接在master分支上进行修改，但这种形式**很不规范**，因为 master 是主分支，最好不要直接操作。

我们可以创建一个新的分支`1.0.0-bug-fix`进行bug的解决。当bug解决后，将该分支推送到远程库(用于记录)，再切换到`master`,进行`merge`即可。

之后要进行发布。但只是解决了bug，没有feature的更新。所以打一个tag为`v1.0.1`

```
//修改bug后，同样要进行add、commit、push
//创建新的tag，并推送，整个过程与上述代码一样。
```

### 新增feature

后期项目可能还会新增功能，我们需要创建一个新的分支`A.B.C-dev`，用于新版本的开发。

如果是新增小功能，可以创建名称为`1.1.0-dev`的分支，如果是大版本迭代，可以直接创建`2.0.0-dev`

```
git branch 1.1.0-dev
git checkout 1.1.0-dev
```

### 发布稳定版本

`v1.1.0`版本开发完毕，打算发布稳定版本，在提交时，打一个tag（`v1.1.0`）发布该版本。

然后在`1.1.0-dev`的基础上创建一个新的分支`1.1.0-stable`，用于记录该稳定版本的发布。

```
//在1.1.0-dev分支下进行add、commit、push操作
//创建新的tag，并推送
---------------------------------------------
//在1.1.0-dev分支的基础上，创建一个稳定版本分支，推送到远程库
git branch 1.1.0-stable
git checkout 1.1.0-stable
git push ssh_origin 1.1.0-stable
```

### 更新tag

在某些情况下，我们希望将原来的tag内容也进行更新，但git操作不能够直接更新tag。如果想要更新tag的内容，需要经过以下步骤：

1. 删除远程库的tag

   ```
   git push ssh_origin :refs/tags/`tagName`
   ```

2. 本地库重新推送tag

#### 本地库重新推送tag

既然要更新tag，本地库的tag要指向新的commit。实现该操作有两种方式👇

1. 先删除原来的tag，再创建一个新的tag指向当前commit，名称与原tag保持一致即可，再将新tag推送到远程库

   ```
   //最新的提交
   git commit -m "message"
   //tag操作
   git tag -d tagName
   git tag tagName
   git push ssh_origin tagName
   ```

2. 强制切换原有tag的指向，让tag指向当前commit，再向远程库推送

   ```
   //最新的提交
   git commit -m "message"
   //tag操作
   git tag -f tagName
   git push ssh_origin tagName
   ```

   

