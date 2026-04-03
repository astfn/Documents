完成 `deepGet` 函数，给它传入一个对象和字符串，字符串表示对象深层属性的获取路径，可以深层次获取对象内容：

```
const deepGet = (obj, prop) => {
  // TODO: 在此处完善代码
}

/** 以下为测试代码 */
deepGet({
  school: {
    student: { name: 'Tomy' },
  },
}, 'school.student.name') // => 'Tomy'

deepGet({
  school: {
    students: [
      { name: 'Tomy' },
      { name: 'Lucy' },
    ],
  }
}, 'school.students[1].name') // => 'Lucy'

// 对于不存在的属性，返回 undefined
deepGet({ user: { name: 'Tomy' } }, 'user.age') // => undefined
deepGet({ user: { name: 'Tomy' } }, 'school.user.age') // => undefined
```

代码实现：

* 基本框架比较简单
  * 如果当前的 propArr 只有一个元素，代表到达路径的最后一步，直接拼接返回
  * 反之，需要递归处理
* 关键是对 `[xxx]` 形式的处理
  * 将 `[xxx]` 筛选出来，并将 `xxx` 拼接到当前 propArr 的第一个元素后面。

```
const deepGet = (obj, prop) => {
  // TODO: 在此处完善代码
  const propArr = prop.split(".");
  let res = _deep(obj, propArr);
  console.log(res);
  return res;

  function _deep(obj, propArr) {
    if (propArr.length === 1) return obj[propArr[0]];

    /* 对括号的处理 */
    //将`[xxx]`筛选出来，并将`xxx`拼接到当前propArr的第一个元素后面。
    let bracketsProp = propArr[0].match(/\[.+\]/g);

    if (bracketsProp) {
      bracketsProp = bracketsProp.map((v) => v.replace(/[\[\]]/g, ""));
      propArr.splice(1, 0, ...bracketsProp);

      propArr[0] = propArr[0].replace(/\[.+\]/g, "");
    }
    /**/

    return obj[propArr[0]]
      ? _deep(obj[propArr[0]], propArr.slice(1))
      : undefined;
  }
};
```

