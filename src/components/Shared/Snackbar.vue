<template>
  <v-snackbar v-model="$store.getters['snackbar/showSnackbar']">
    {{ $store.getters["snackbar/getText"] }}

    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="$store.commit('snackbar/hideSnackbar')"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {};
</script>

<style>
div.v-snack:not(.v-snack--absolute) {
  height: 100%;
}
</style>
