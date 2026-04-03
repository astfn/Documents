## 数据类型

### typeof

#### 判断基本类型

​	在 `JavaScript` 中，基本类型有 `6` 种：`number`、`string`、`boolean`、`null`、`undefined`、`symbol`

​	使用 `typeof` 对这些基本数据类型进行判断，只有 `null` 会被错误的推断为 `object`（这实际上是 JavaScript 的历史遗留问题），其余基本类型都能够正常推断。

>历史遗留问题：
>
>​	在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用 **低位存储变量的类型信息** ，000 开头代表是对象，然而 null 表示为全零，也因此将它错误的判断为 object 。

### 关于undefined

​	关于 undefined，我们并不陌生。当仅仅只是声明了一个变量，并没有为其赋予值，此时该变量就是 undefined。

​	也就是说：undefined 实际上是 JavaScript 为上述情况的变量赋予的 **假值** 。

而 undefined 是假值这个特性，就意味着我们要注意一些特殊情况：

* 对未声明的变量执行 typeof 操作，也会返回 "undefined"

```
console.log(typeof ashun)	// "undefined"
```

> 值得注意的是：
>
> * 对于未声明的变量，我们也 **仅仅只能** 对其做 typeof 这一个有效操作
> * 其余的操作都会报错，例如：
>
> ```
> console.log(ashun) // ashun is not defined
> ```

是不是觉得很怪？没错，这就会造成一个歧义：

* 当对一个变量执行 typeof 操作时，我们不知道这个变量究竟是已被声明，还是未被声明。