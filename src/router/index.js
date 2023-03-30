import { createWebHistory, createRouter } from "vue-router";
import TodoItem from "../views/TodoDetail.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/todos/:id",
    name: "Todo",
    component: TodoItem,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
