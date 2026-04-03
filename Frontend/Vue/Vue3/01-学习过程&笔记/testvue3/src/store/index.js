import { createStore } from "vuex";

export default createStore({
  state: {
    isShow: false,
  },
  mutations: {
    show(state, payload) {
      state.isShow = true;
    },
    hidden(state, payload) {
      state.isShow = false;
    },
  },
  actions: {},
  getters: {},
  modules: {},
});
