<template>
    <v-text-field
      :value="$store.state.search"
      @input="$store.commit('setSearch', $event)"
      @focus="searchClosed = false"
      @blur="searchClosed = true"
      :disabled="$store.state.sorting"
      class="expanding-search mt-1"
      :class="{ 'closed' : searchClosed && !$store.state.search }"
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
        searchClosed: true
      }
    }
  }
  </script>
  