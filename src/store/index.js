import { createStore } from "vuex";

import todos from "./modules/todos";
import snackbar from "./modules/snackbar";

const store = createStore({
  modules: {
    todos,
    snackbar,
  },
});

export default store;
