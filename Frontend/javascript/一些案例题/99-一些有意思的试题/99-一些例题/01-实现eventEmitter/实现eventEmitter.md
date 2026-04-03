编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。（实例可能监听多个不同的事件，也可以去除监听事件）

```
class People {
  constructor(name) {
    this.name = name
  }

  // TODO: 请在此处完善代码

  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}


/* 以下为测试代码 */
const say1 = (greeting) => {
  console.log(`${greeting}, nice meeting you.`)
}

const say2 = (greeting) => {
  console.log(`${greeting}, nice meeting you, too.`)
}

const jerry = new People('Jerry')
jerry.sayHi()
// => 输出：'Hi, I am Jerry'

jerry.on('greeting', say1)
jerry.on('greeting', say2)

jerry.emit('greeting', 'Hi')
// => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'

jerry.off('greeting', say1)
jerry.emit('greeting', 'Hi')
// => 只输出：'Hi, nice meeting you, too'
```

代码实现：

  实现思路：

* 维护一个事件仓库，是一个Map类型（key：eventName，value：effectSet）
* 关于value：使用 Set 收集事件，好处是可以自动排除重复的事件，提高性能

```
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
```

