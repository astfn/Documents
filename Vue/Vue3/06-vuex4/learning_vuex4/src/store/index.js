import { createStore } from "vuex";

const store = createStore({
  state: {
    userInfo: {
      name: "Ashun",
      age: 18,
      type: "controller",
    },
    mode: "购物",
    recommends: [],
  },
  mutations: {
    changeUserType(state) {
      state.userInfo.type =
        state.userInfo.type === "controller" ? "admin" : "controller";
    },
    changeMode(state, payload) {
      state.mode = state.mode === "购物" ? "管理" : "购物";
    },
    changeRecommends(state, payload) {
      state.recommends = payload.recommends;
    },
  },
  actions: {
    updateRecommends_action(context, payload) {
      const xhr = new XMLHttpRequest();
      xhr.open("get", "http://152.136.185.210:7878/api/hy66/home/multidata");
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          let res = JSON.parse(xhr.responseText);
          context.commit("changeRecommends", {
            recommends: res.data.recommend.list,
          });
          console.log(res.data);
        }
      };
    },
  },
  getters: {
    getMode(state, getters) {
      return "当前模式：" + state.mode;
    },
    getUserInfo(state, getters) {
      const { name, age, type } = state.userInfo;
      return `
        用户名称：${name}
        年龄：${age}
        身份种类：${type}
      `;
    },
  },
  modules: {},
});

export default store;
