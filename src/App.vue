<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" color="white" flat density="compact">
      <v-spacer></v-spacer>

      <v-tabs centered color="grey-darken-2">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-btn
        density="compact"
        @click="showAddTodoDialog = true"
        icon="mdi-plus"
      ></v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <router-view></router-view>
            <snackbar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <v-dialog v-model="showAddTodoDialog" max-width="600">
    <v-card>
      <v-card-title>Add Todo</v-card-title>
      <v-card-text>
        <v-text-field v-model="newTodo.title" label="Title"></v-text-field>
        <v-divider></v-divider>

        <VueDatePicker
          v-model="newTodo.endDate"
          :auto-position="false"
        ></VueDatePicker>

        <v-divider></v-divider>
        <v-checkbox label="Is Completed" v-model="newTodo.state"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addTodoItem">Add</v-btn>
        <v-btn @click="showAddTodoDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showEditTodoDialog" max-width="600">
    <v-card>
      <v-card-title>Add Todo</v-card-title>
      <v-card-text>
        <v-text-field v-model="selectedTodo.title" label="Title"></v-text-field>
        <v-divider></v-divider>

        <VueDatePicker
          v-model="selectedTodo.endDate"
          :auto-position="false"
        ></VueDatePicker>

        <v-divider></v-divider>
        <v-checkbox label="Is Completed" v-model="selectedTodo.state"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addTodoItem">Add</v-btn>
        <v-btn @click="showAddTodoDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style>
body {
  background: #fff;
}
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  color: #555;
}
</style>
<script>
import Search from "./components/Search.vue";
import AddTask from "./components/AddTask.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import Snackbar from "./components/Shared/Snackbar.vue";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "App",
  components: {
    Search,
    Snackbar,
    AddTask,
    VueDatePicker,
  },
  data: () => ({
    links: ["Todos"],
    showPicker: false,
    selectedDate: null,
    date: null,
    customPosition: () => ({ top: 0, left: 0 }),
    showAddTodoDialog: false,
    newTodo: {
      title: "",
      endDate: null,
      state: "",
    },
  }),
  methods: {
    closeDateMenu() {
      this.showPicker = false;
      this.selectedDate = this.date
        ? moment(this.date).format("yyyy-MM-dd")
        : "";
    },
    addTodoItem() {
      if (this.newTodo.state === true) {
        this.newTodo.state = "Completed";
      } else {
        this.newTodo.state = "Todo";
      }

      this.$store.dispatch("todos/addTodo", this.newTodo);
      this.newTodo = {
        title: "",
        endDate: new Date().toISOString(),
        state: false,
      };
      this.showAddTodoDialog = false;
    },
  },
  mounted() {
    this.$store.dispatch("todos/fetchTodos");
  },
};
</script>
<style scoped>
.header-container {
  max-width: none;
}
</style>
