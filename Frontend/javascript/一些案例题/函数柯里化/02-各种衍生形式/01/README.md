完成 `combo` 函数。它接受任意多个单参函数（只接受一个参数的函数）作为参数，并且返回一个函数。它的作为用：使得类似 `f(g(h(a)))` 这样的函数调用可以简写为 `combo(f, g, h)(a)`。

```
const combo = () => {
  // TODO: 请在此处完善代码
}

/* 以下为测试代码 */
const addOne = (a) => a + 1
const multiTwo = (a) => a * 2
const divThree = (a) => a / 3
const toString = (a) => a + ''
const split = (a) => a.split('')

split(toString(addOne(multiTwo(divThree(666)))))
// => ["4", "4", "5"]

const testForCombo = combo(split, toString, addOne, multiTwo, divThree)
testForCombo(666)
// => ["4", "4", "5"]
```

代码实现：

* 每个参数都是一个：接受一个参数的函数
* 并且这些函数执行的结果，将会传入下一个 callback ，被持续维护。

实现思路梳理：

* 执行当前 callback ，并收集结果
* 如果维护的参数数组长度为一，则只需要执行一次，直接返回最终结果
* 反之需要递归，并剔除掉已经执行的 callback
  * curry 最终返回一个函数，调用它，并将上次结果传递，持续维护

```
const combo = (...args) => {
  // TODO: 请在此处完善代码
  return curry(args.reverse(), args.length);
  function curry(args, leng) {
    return (x) => {
      let res = args[0](x);
      if (leng <= 1) return res;
      return curry(args.slice(1), leng - 1)(res);
    };
  }
};
```

