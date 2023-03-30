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
            <v-btn variant="text" color="white" @click="reveal = true">
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
</template>

<script>
import moment from "moment";
export default {
  data() {
    return { todo: null };
  },
  methods: {
    getTodoDetail() {
      const id = this.$route.params.id;
      this.$store.dispatch("todos/getTodoById", id).then((res) => {
        this.todo = res.data;
      });
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
