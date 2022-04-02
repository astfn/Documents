import { createApp } from "vue";
// import App from './App.vue'

/*
  01_reactive&ref
*/
// import App from "./components/reactive&ref/1_初识reactive.vue";
// import App from "./components/reactive&ref/2_todo案例体验reactive.vue";
// import App from "./components/reactive&ref&ref/3_ref.vue";
// import App from "./components/reactive&ref/3_ref基本使用.vue";
// import App from "./components/reactive&ref/4_ref访问节点.vue";
// import App from "./components/reactive&ref/5_ref与reactive转换.vue";

/*
  02_watch&computed
*/
// import App from "./components/watch&computed/1_computed使用.vue";
// import App from "./components/watch&computed/2_watch使用.vue";
// import App from "./components/watch&computed/3_watchEffect.vue";

/*
  03_组件通讯
*/
// import App from "./components/03_组件通讯/01_父传子/App.vue";
// import App from "./components/03_组件通讯/02_子传父/App.vue";
// import App from "./components/03_组件通讯/03_provide&inject/App.vue";
// import App from "./components/03_组件通讯/04_mitt实现事件总线/App.vue";

/*
  04_生命周期
*/
// import App from "./components/04_生命周期/App.vue";

/*
  05_自定义hook
*/
// import App from "./components/05_自定义hook/App.vue";

/*
  06_其它CompositionAPI
*/
// import App from "./components/06_其它CompositionAPI/01_shallowReactive&shallowRef/App.vue";
// import App from "./components/06_其它CompositionAPI/02_readonly&shallowReadonly/App.vue";
// import App from "./components/06_其它CompositionAPI/03_toRaw&markRaw/toRaw.vue";
// import App from "./components/06_其它CompositionAPI/03_toRaw&markRaw/markRaw.vue";
// import App from "./components/06_其它CompositionAPI/04_customRef/App.vue";
// import App from "./components/06_其它CompositionAPI/05_响应式数据的判断/App.vue";

/*
  07_新组件
*/
// import App from "./components/07_新组件/02_teleport/App.vue";
// import App from "./components/07_新组件/3_suspense/App.vue";

/*
  08_router使用
*/
import router from "./router";
// import App from "./components/08_router使用/App.vue";

/*
  09_vuex使用
*/
import store from './store'
import App from "./components/09_vuex使用/App.vue";



// createApp(App).use(store).use(router).mount('#app')
// createApp(App).mount("#app");

let app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
