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

      <v-btn density="compact" @click="openDialog()" icon="mdi-plus"></v-btn>
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

  <add-task ref="dialogComponent" />
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
import Snackbar from "./components/Shared/Snackbar.vue";

export default {
  name: "App",
  components: {
    Search,
    Snackbar,
    AddTask,
  },
  data: () => ({
    links: ["Todos"],
  }),
  methods: {
    openDialog() {
      this.$refs.dialogComponent.openDialog();
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
