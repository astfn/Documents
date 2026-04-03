import { createApp } from "vue";

/* 01-创建响应式数据 */
// import App from "./components/01-创建响应式数据/01-reactive/01-初识reactive.vue";
// import App from "./components/01-创建响应式数据/01-reactive/02-todo案例体验reactive.vue";
// import App from "./components/01-创建响应式数据/02-ref/01-ref基本使用.vue";
// import App from "./components/01-创建响应式数据/02-ref/02-ref访问节点.vue";
// import App from "./components/01-创建响应式数据/03-二者之间的转化/App.vue";

/* 02-computed */
// import App from "./components/02-computed/App.vue";

/* 03-watch相关 */
// import App from "./components/03-watch相关/01-watch/01-侦听ref数据/App.vue";
// import App from "./components/03-watch相关/01-watch/02-侦听reactive数据/App.vue";
// import App from "./components/03-watch相关/01-watch/03-侦听多个数据/App.vue";
// import App from "./components/03-watch相关/01-watch/04-非惰性immediate/App.vue";
// import App from "./components/03-watch相关/01-watch/05-手动取消侦听/App.vue";

// import App from "./components/03-watch相关/02-watchEffect/01-基本使用/App.vue";
// import App from "./components/03-watch相关/02-watchEffect/02-侦听模板引用/App.vue";
import App from "./components/03-watch相关/02-watchEffect/03-清除副作用/App.vue";

createApp(App).mount("#app");
