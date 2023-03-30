import { createStore } from "vuex";

export default createStore({
  state: {
    count: 100,
  },
  getters: {},
  mutations: {
    decrement(state) {
      state.count--;
    },
  },
  actions: {},
  modules: {},
});
