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
    <p class="price">{{ showPrice(999) }}</p>
  </main>
</template>
<script>
  import { defineComponent, toRefs } from "vue";
  import useCounter from "./hooks/useCounter.js";
  import useMousePosition from "./hooks/useMousePosition.js";
  import useShowPrice from "./hooks/useShowPrice.js";
  export default defineComponent({
    setup() {
      //Counter
      let { counter, increment, decrement, isDisabled } = useCounter();
      //Mouse
      let { x, y } = useMousePosition();
      //showPrice
      let { showPrice } = useShowPrice();
      return {
        //Counter
        counter,
        increment,
        decrement,
        isDisabled,
        //Mouse
        x,
        y,
        //showPrice
        showPrice,
      };
    },
  });
</script>
