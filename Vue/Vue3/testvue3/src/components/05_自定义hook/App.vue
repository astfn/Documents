<template>
  <main>
    <button @click="changeShow">changeShow</button>
    <child v-if="isShow" />
  </main>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Child from "./Child.vue";
  export default defineComponent({
    components: {
      Child,
    },
    setup() {
      const state = reactive({
        isShow: true,
      });
      const changeShow = () => {
        state.isShow = !state.isShow;
      };
      return {
        ...toRefs(state),
        changeShow,
      };
    },
  });
</script>
<!--
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
  import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    toRefs,
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
      return {
        //Counter
        counter,
        increment,
        decrement,
        isDisabled,
        //Mouse
        ...toRefs(MouseState),
        //showPrice
        showPrice,
      };
    },
  });
</script>
-->
