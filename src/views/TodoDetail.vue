<template>
  <v-container>
    <v-row justify="space-around" v-if="todo">
      <v-card width="400">
        <v-img
          height="200"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          cover
          class="text-white"
        >
          <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
            <v-btn variant="text" color="white" @click="this.$router.go(-1)">
              Go Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="text" color="white" @click="editTodoItem(todo)">
              Edit
            </v-btn>
          </v-toolbar>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">{{ todo.state }}</div>

          <v-timeline density="compact" align="start">
            <v-timeline-item
              :dot-color="generateColor(todo.state)"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ todo.title }}</strong> @{{
                    dateTime(todo.endDate)
                  }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>

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
        <v-checkbox
          label="Is Completed"
          v-model="selectedTodo.done"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="updateTodoItem">Save</v-btn>
        <v-btn @click="showEditTodoDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import Snackbar from "../components/Shared/Snackbar.vue";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    VueDatePicker,
    Snackbar,
  },
  data() {
    return {
      todo: null,
      selectedTodo: null,
      showEditTodoDialog: false,
      customPosition: () => ({ top: 0, left: 0 }),
    };
  },
  methods: {
    getTodoDetail() {
      const id = this.$route.params.id;
      this.$store.dispatch("todos/getTodoById", id).then((res) => {
        this.todo = res.data;
      });
    },
    editTodoItem(todo) {
      console.log(todo);
      this.selectedTodo = { ...todo };
      this.selectedTodo.done = todo.state === "Completed";
      this.showEditTodoDialog = true;
    },
    updateTodoItem() {
      if (this.selectedTodo.done === true) {
        this.selectedTodo.state = "Completed";
      } else {
        this.selectedTodo.state = "Todo";
      }
      this.$store.dispatch("todos/updateTodo", this.selectedTodo);
      this.showEditTodoDialog = false;
      this.todo = this.selectedTodo;
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    generateColor(todoState) {
      if (todoState === "Completed") return "green";
      else return "red";
    },
  },
  mounted() {
    this.getTodoDetail();
  },
};
</script>
