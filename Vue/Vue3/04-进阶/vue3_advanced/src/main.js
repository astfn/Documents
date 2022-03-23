import { createApp } from "vue";

/* 01-其它CompositionAPI */
// import App from "./components/01-其它CompositionAPI/01-shallowReactive&shallowRef/App.vue";
// import App from "./components/01-其它CompositionAPI/02-readonly&shallowReadonly/App.vue";
// import App from "./components/01-其它CompositionAPI/03-toRaw&markRaw/markRaw.vue";
// import App from "./components/01-其它CompositionAPI/03-toRaw&markRaw/toRaw.vue";
import App from "./components/01-其它CompositionAPI/04-customRef/App.vue";
// import App from "./components/01-其它CompositionAPI/05-响应式数据的判断/App.vue";

/* 02-新增组件 */
// import App from "./components/02-新增组件/01-fragment/App.vue";
// import App from "./components/02-新增组件/02-teleport/App.vue";
// import App from "./components/02-新增组件/03-suspense/App.vue";

createApp(App).mount("#app");
