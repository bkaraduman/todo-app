import axios from "axios";

const state = {
  todos: [],
  search: null,
  sorting: false,
};
const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },
  addTodo(state, todo) {
    state.todos.push(todo);
  },
  updateTodo(state, todo) {
    const index = state.todos.findIndex((t) => t.id === todo.id);
    state.todos[index] = todo;
  },
  deleteTodo(state, todo) {
    const index = state.todos.findIndex((t) => t.id === todo.id);
    state.todos.splice(index, 1);
  },
  setSearch(state, value) {
    state.search = value;
  },
};
const actions = {
  async getTodoById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/todos/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async fetchTodos({ commit }) {
    const response = await axios.get("http://localhost:3000/todos");
    commit("setTodos", response.data);
  },
  async fetchTodosByQuery({ commit }, query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/todos?q=${query}`)
        .then((res) => {
          resolve(res);
          commit("setSearch", query);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async addTodo({ commit }, todo) {
    const response = await axios.post("http://localhost:3000/todos", todo);
    commit("addTodo", response.data);
    commit("snackbar/showSnackbar", "Task added!", { root: true });
  },
  async updateTodo({ commit }, todo) {
    const response = await axios.put(
      `http://localhost:3000/todos/${todo.id}`,
      todo
    );
    commit("updateTodo", response.data);
    commit("snackbar/showSnackbar", "Task Updated!", { root: true });
  },
  async deleteTodo({ commit }, todo) {
    await axios.delete(`http://localhost:3000/todos/${todo.id}`);
    commit("deleteTodo", todo);
    commit("snackbar/showSnackbar", "Task Deleted!", { root: true });
  },
};
const getters = {
  getAllTodos: (state) => {
    return state.todos;
  },
  tasksFiltered(state) {
    if (!state.search) {
      return state.todos;
    }
    return state.todos.filter((task) =>
      task.title.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
