<template>
  <v-text-field
    v-model="search"
    @input="searchTodos()"
    class="expanding-search mt-1"
    :class="{ closed: searchClosed && !$store.state.search }"
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    filled
    dense
    clearable
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      search: null,
    };
  },
  methods: {
    searchTodos() {
      this.$store.dispatch("todos/fetchTodosByQuery", this.search);
    },
  },
};
</script>
