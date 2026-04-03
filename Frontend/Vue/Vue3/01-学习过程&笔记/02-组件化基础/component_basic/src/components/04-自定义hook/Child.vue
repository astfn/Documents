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
      <p>{{ user }}</p>
    </div>
  </main>
</template>
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
