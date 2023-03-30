<template>
  <v-card class="mx-auto">
    <v-toolbar color="secondary">
      <v-toolbar-title>Todos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>
    <v-list lines="two" v-if="tasks && tasks.length">
      <v-list-item v-for="task in tasks" :key="task.id" :title="task.title">
        <v-list-item-subtitle v-if="task.endDate">
          {{ dateTime(task.endDate) }}
        </v-list-item-subtitle>
        <template v-slot:prepend>
          <v-icon
            size="large"
            color="grey-lighten-1"
            icon="mdi-message-text"
          ></v-icon>
        </template>

        <template v-slot:append>
          <router-link :to="{ name: 'Todo', params: { id: task.id } }">
            <v-btn
              color="grey-lighten-1"
              icon="mdi-pencil"
              variant="text"
            ></v-btn>
          </router-link>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-delete"
            variant="text"
            @click="deleteTodoItem(task)"
          ></v-btn> </template
        ><v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      todos: [],
      selectedTodo: null,
      showEditTodoDialog: false,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters["todos/getAllTodos"];
    },
  },
  methods: {
    editTodoItem(todo) {
      console.log(todo);
      this.selectedTodo = { ...todo };
      this.showEditTodoDialog = true;
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    generateUrl(id) {
      return "todos/" + id;
    },
    updateTodoItem() {
      this.$store.dispatch("todos/updateTodo", this.selectedTodo);
      this.showEditTodoDialog = false;
      this.selectedTodo.title = "";
    },
    deleteTodoItem(todo) {
      console.log("delete", todo);
      this.$store.dispatch("todos/deleteTodo", todo);
    },
  },
};
</script>
<style scoped>
a { text-decoration: none; }

</style>