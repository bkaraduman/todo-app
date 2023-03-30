<template>
  <v-card class="mx-auto">
    <v-toolbar color="deep-purple accent-4">
      <v-toolbar-title>Todos</v-toolbar-title>
      <v-spacer></v-spacer>
      <search v-if="$route.path === '/'" />
    </v-toolbar>
    <v-list lines="two" v-if="tasks && tasks.length">
      <v-list-item v-for="task in tasks" :key="task.id" :title="task.title">
        <v-list-item-subtitle v-if="task.endDate">
          {{ dateTime(task.endDate) }}
        </v-list-item-subtitle>
        <template v-slot:prepend>
          <span class="material-icons task"> task </span>
        </template>

        <template v-slot:append>
          <router-link :to="{ name: 'Todo', params: { id: task.id } }">
            <span class="material-icons"> edit </span>
          </router-link>
          <span class="material-icons" @click="deleteTodoItem(task)">
            delete
          </span> </template
        ><v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
  
  <no-task v-if="!tasks || !tasks.length"></no-task>
</template>

<script>
import moment from "moment";
import NoTask from "../components/NoTask.vue";
import Search from "../components/Search.vue";

export default {
  components: { NoTask, Search },
  data() {
    return {
    };
  },
  computed: {
    tasks() {
      return this.$store.getters["todos/tasksFiltered"];
    },
  },
  methods: {
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    generateUrl(id) {
      return "todos/" + id;
    },
    deleteTodoItem(todo) {
      this.$store.dispatch("todos/deleteTodo", todo);
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.task {
  margin-right: 20px;
}
.material-icons:hover {
  color: #777;
}
</style>
