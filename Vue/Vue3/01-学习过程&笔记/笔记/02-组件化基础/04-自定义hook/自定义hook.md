## 什么是hook？

很多地方都有 hook 的概念，在 Vue 中 hook 本质上就是一个函数，该函数把 setup 中的一些业务进行了抽离。

我们通常会建立一个单独的 JavaScript 文件存放 hook，当进行 hook 的复用时，只需要在目标组件引入即可，这有点像 Vue2.x 中的 mixin，但 setup 结合 hook，会有更多的好处。

## mixins

**我们先来回顾一下 mixins 的一些特性**

1. mixins 中的生命周期钩子，会与引入该 mixins 的组件的生命周期操作合并在一起。
2. 如果 mixins 中的各个状态(data、methods、computed…)名称与组件中的重名，组件中的状态会覆盖 mixins
3. 不同 mixin 里的同名状态，按照引进的顺序，最后的覆盖之前的。

**mixins的缺点**：

1. 状态来源不明，不利于阅读与后期维护

   ```
   组件里可以引入多个mixin，且在组件中可以直接调用mixin里的变量/方法
   ```

2. 多个mixins的生命周期会融合到一起运行，但是同名属性、同名方法无法融合，可能会导致冲突。

   ```
   比如minxin1中的showInfo方法要输出属性info，
   但是minxin2中也有同名属性info，且覆盖了组件1中的属性info，
   若同时引入两个mixin，当执行minxin1中的showInfo时，输出的是minxin2中的info
   ```

## 自定义hook

### 应用场景

- 使用 Vue3 的 CompositionAPI 封装的可复用的功能函数
- 自定义 hook 的作用类似于 vue2 中的 mixin 技术
- 自定义 Hook 的优势:
  -  很清楚复用功能代码的来源
  -  结合 setup 让对应功能的代码块更加简洁。

下面通过一个案例来体会 hook 使用的好处：

在某组件中使用了3个功能，且这些功能也很可能被其他组件复用，这些功能分别为：

* Counter
* MousePosition
* localStorage

```
<template>
  <main>
    <div class="counterBox">
      <button @click="decrement" :disabled="isDisabled">-</button>
      <strong>{{ counter }}</strong>
      <button @click="increment">+</button>
    </div>

    <div class="mouseBox">
      <p>
        鼠标x坐标:<strong>{{ x }}</strong>
      </p>
      <p>
        鼠标y坐标:<strong>{{ y }}</strong>
      </p>
    </div>

    <div class="localData">
      <button @click="handelChangeUser">handelChangeUser</button>
      <button @click="clearUser">clearUser</button>
      <p>{{ userState }}</p>
    </div>
  </main>
</template>
<script>
  import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    toRefs,
    watch,
  } from "vue";

  export default defineComponent({
    setup() {
      //Counter
      const counter = ref(1);
      const increment = () => {
        counter.value++;
      };
      const decrement = () => {
        counter.value -= counter.value > 1 ? 1 : 0;
      };
      const isDisabled = computed(() => {
        return counter.value <= 1;
      });
      
      //Mouse
      const MouseState = reactive({
        x: 0,
        y: 0,
      });
      const clickFunc = (e) => {
        MouseState.x = e.clientX;
        MouseState.y = e.clientY;
      };
      onMounted(() => {
        window.addEventListener("click", clickFunc);
      });
      onUnmounted(() => {
        window.removeEventListener("click", clickFunc);
      });
      //showPrice
      const showPrice = (price, prefix = "￥") => {
        return `${prefix}${price}`;
      };

      //localStorage
      let userFromLocal = JSON.parse(localStorage.getItem("user"));
      let userState = ref(userFromLocal);

      let handelChangeUser = () => {
        let random = (Math.random() * 100).toFixed(2);
        let newUser = { name: "Ashun" + random, age: 18 };

        userState.value = newUser;
        localStorage.setItem("user", JSON.stringify(newUser));
      };

      let clearUser = () => {
        localStorage.removeItem("user");
        userState.value = null;
      };

      watch(userState, (newUser, oldUser) => {
        console.log(newUser, oldUser);
      });

      return {
        //Counter
        counter,
        increment,
        decrement,
        isDisabled,
        
        //Mouse
        ...toRefs(MouseState),
        
        //useLocalStorage
        userState,
        handelChangeUser,
        clearUser,
      };
    },
  });
</script>
```

通过上述代码，我们可以体会到：

* setup 对比传统 optionsAPI，各个功能代码不会掺杂在一起，形成独立的代码块，逻辑比较清晰
* 但是当业务逐渐庞大时，可以发现 setup 中的代码逐渐变得臃肿
* 我们就可把各个功能抽离为对应的 hook，不仅代码结构更清晰，还更利于功能的复用👇

### 抽离hook

我们通常建立一个目录，专门存放各个包含hook的JavaScript文件，并且各个文件名称通常以`use+功能`进行命名。

例如将上文中的各个功能模块抽离为hook，我会创建一个`hooks`目录，在其中配置各个hook文件

```
├─hooks
│  ├─useCounter.js
│  ├─useLocalStorage.js     
│  ├─useMousePosition.js
│
├─App.vue
```

**useCounter.js**

```
import { ref, computed } from "vue";
export default function() {
  const counter = ref(1);
  const increment = () => {
    counter.value++;
  };
  const decrement = () => {
    counter.value -= counter.value > 1 ? 1 : 0;
  };
  const isDisabled = computed(() => {
    return counter.value <= 1;
  });

  return {
    counter,
    increment,
    decrement,
    isDisabled,
  };
}
```

**useLocalStorage.js**  

```
import { ref, watch } from "vue";

export default function useLocalStorage(name, callback) {
  let item = JSON.parse(localStorage.getItem(name));
  let state = ref(item);

  let setState = (item) => {
    state.value = item;
    localStorage.setItem(name, JSON.stringify(item));
  };

  let clearState = () => {
    localStorage.removeItem(name);
    state.value = null;
  };

  watch(state, callback);

  return [state, setState, clearState];
}
```

**useMousePosition.js**

```
import { onMounted, onUnmounted, reactive, toRefs } from "vue";

export default function () {
  const MouseState = reactive({
    x: 0,
    y: 0,
  });
  const clickFunc = (e) => {
    MouseState.x = e.clientX;
    MouseState.y = e.clientY;
  };
  onMounted(() => {
    window.addEventListener("click", clickFunc);
  });
  onUnmounted(() => {
    window.removeEventListener("click", clickFunc);
  });
  return {
    //Mouse
    ...toRefs(MouseState),
  };
}
```

**App.js**

```
<template> …… </template>
<script>
  import { defineComponent, toRefs } from "vue";
  import useCounter from "./hooks/useCounter.js";
  import useMousePosition from "./hooks/useMousePosition.js";
  import useLocalStorage from "./hooks/useLocalStorage.js";

  export default defineComponent({
    setup() {
      //Counter
      let { counter, increment, decrement, isDisabled } = useCounter();
      //Mouse
      let { x, y } = useMousePosition();

      //useLocalStorage
      let changeUserCallback = (newInfo, oldInfo) => {
        console.log(newInfo, oldInfo);
      };

      let [user, setUser, clearUser] = useLocalStorage(
        "user",
        changeUserCallback
      );

      let handelChangeUser = () => {
        let random = (Math.random() * 100).toFixed(2);
        setUser({ name: "Ashun" + random, age: 18 });
      };

      return {
        //Counter
        counter,
        increment,
        decrement,
        isDisabled,
        //Mouse
        x,
        y,
        //useLocalStorage
        user,
        handelChangeUser,
        clearUser,
      };
    },
  });
</script>
```

可以看到，hook 引入各个功能模块：

* 能够非常清晰的知道各个 state、method 的来源。
* 结合 setup，代码逻辑非常清晰

