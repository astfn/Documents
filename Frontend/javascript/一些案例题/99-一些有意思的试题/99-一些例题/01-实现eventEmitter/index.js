// 题目一
{
  /*
        实现思路：
        维护一个事件仓库，是一个Map类型（key：eventName，value：effectSet）
        关于value，使用 Set 收集事件，好处是可以自动排除重复的事件，提高性能
      */
  class People {
    constructor(name) {
      this.name = name;
      this.eventStore = new Map();
    }

    // TODO: 请在此处完善代码
    on(eventName, callback) {
      let effectSet = this.eventStore.get(eventName);
      if (!effectSet) {
        effectSet = new Set();
        this.eventStore.set(eventName, effectSet);
      }
      effectSet.add(callback);
    }

    emit(eventName, payload) {
      let effectSet = this.eventStore.get(eventName);
      if (!effectSet) return;
      effectSet.forEach((effect) => effect(payload));
    }

    off(eventName, callback) {
      let effectSet = this.eventStore.get(eventName);
      if (!effectSet) return;
      effectSet.delete(callback);
    }

    sayHi() {
      console.log(`Hi, I am ${this.name}`);
    }
  }

  /* 以下为测试代码 */
  const say1 = (greeting) => {
    console.log(`${greeting}, nice meeting you.`);
  };

  const say2 = (greeting) => {
    console.log(`${greeting}, nice meeting you, too.`);
  };

  const jerry = new People("Jerry");
  jerry.sayHi();
  // => 输出：'Hi, I am Jerry'

  jerry.on("greeting", say1);
  jerry.on("greeting", say2);

  jerry.emit("greeting", "Hi");
  // => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'

  jerry.off("greeting", say1);
  jerry.emit("greeting", "Hi");
  // => 只输出：'Hi, nice meeting you, too'
}

//题目二
{
  const sleep = (duration) => {
    // TODO
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };

  const anyFunc = async () => {
    console.log("123"); // 输出 123
    await sleep(300); // 暂停 300 毫秒
    console.log("456"); // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
  };
  anyFunc();
}

//题目三
{
  const deepGet = (obj, prop) => {
    // TODO: 在此处完善代码
    const propArr = prop.split(".");
    let res = _deep(obj, propArr);
    console.log(res);
    return res;

    function _deep(obj, propArr) {
      if (propArr.length === 1) return obj[propArr[0]];

      //对括号的处理
      let bracketsProp = propArr[0].match(/\[.+\]/g);

      if (bracketsProp) {
        bracketsProp = bracketsProp.map((v) => v.replace(/[\[\]]/g, ""));
        propArr.splice(1, 0, ...bracketsProp);

        propArr[0] = propArr[0].replace(/\[.+\]/g, "");
      }
      //

      return obj[propArr[0]]
        ? _deep(obj[propArr[0]], propArr.slice(1))
        : undefined;
    }
  };

  /** 以下为测试代码 */
  deepGet(
    {
      school: {
        student: { name: "Tomy" },
      },
    },
    "school.student.name"
  ); // => 'Tomy'

  deepGet(
    {
      school: {
        students: [{ name: "Tomy" }, { name: "Lucy" }],
      },
    },
    "school.students[1].name"
  ); // => 'Lucy'

  // 对于不存在的属性，返回 undefined
  deepGet({ user: { name: "Tomy" } }, "user.age"); // => undefined
  deepGet({ user: { name: "Tomy" } }, "school.user.age"); // => undefined
}

// 题目4
{
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

  /* 以下为测试代码 */
  const addOne = (a) => a + 1;
  const multiTwo = (a) => a * 2;
  const divThree = (a) => a / 3;
  const toString = (a) => a + "";
  const split = (a) => a.split("");

  split(toString(addOne(multiTwo(divThree(666)))));
  // => ["4", "4", "5"]

  const testForCombo = combo(split, toString, addOne, multiTwo, divThree);
  testForCombo(666);
  // => ["4", "4", "5"]
}

//题目5
{
  /*
    假如有两个人（小明、小红），设让小明赢。
    盘1：5个球 盘2：7个球。
    小明尽力维护两个盘子中的球的数量分别为2个球，这代表即将达到赛点。
    并且要让达到赛点时，让小红先手捉球，这样无论如何都可让小明赢。
    例如小红拿掉盘1的两个球，小明只需要从盘二拿一个球即可。
    若小红只拿掉盘1的一个球，小明只需拿掉盘二的所有球
  */
}
