<template>
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
</template>

<script>
  export default {
    data: () => ({
      title: '',
      rules: [
        value => {
          if (value) return true

          return 'You must enter t.'
        },
      ],
    }),
  }
</script>