<template>
  <v-dialog v-model="showAddTodoDialog" max-width="600" persistent>
    <v-card>
      <v-form ref="myForm" @submit.prevent>
        <v-card-title>Add Todo</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newTodo.title"
            label="Title"
            :rules="titleRules"
          ></v-text-field>
          <v-divider></v-divider>

          <VueDatePicker
            v-model="newTodo.endDate"
            :auto-position="false"
          ></VueDatePicker>

          <v-divider></v-divider>
          <v-checkbox label="Is Completed" v-model="newTodo.state"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" type="submit" @click="submit">Add</v-btn>
          <v-btn @click="showAddTodoDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    VueDatePicker,
  },
  data: () => ({
    showAddTodoDialog: false,
    newTodo: {
      title: "",
      endDate: null,
      state: "",
    },
    customPosition: () => ({ top: 0, left: 0 }),
    titleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
    ],
  }),
  computed: {
    isFormValid() {},
  },
  methods: {
    submit() {
      if (this.newTodo.state === true) {
        this.newTodo.state = "Completed";
      } else {
        this.newTodo.state = "Todo";
      }

      this.$store.dispatch("todos/addTodo", this.newTodo);

      this.showAddTodoDialog = false;
    },
    openDialog() {
      this.showAddTodoDialog = true;
    },

    addTodoItem() {},
  },
  mounted() {
    console.log(this.$refs);
    // Access form reference after component has finished rendering
    this.$nextTick(() => {
      console.log(this.$refs.form.validate()); // should output "true" or "false"
    });
  },
};
</script>
