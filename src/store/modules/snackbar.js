const state = {
  show: false,
  text: "",
};
const mutations = {
  showSnackbar(state, text) {
    console.log("asdasdasd");
    let timeout = 0;
    if (state.show) {
      state.show = false;
      timeout = 300;
    }
    setTimeout(() => {
      state.show = true;
      state.text = text;
    }, timeout);
  },
  hideSnackbar(state) {
    state.show = false;
  },
};
const actions = {};
const getters = {
  getText: (state) => {
    return state.text;
  },
  showSnackbar: (state) => {
    return state.show;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
