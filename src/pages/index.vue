<script setup>
const route = useRoute()
</script>

<template>
  <v-card class="pa-6">
    <h1>Demo</h1>
    <h6>Current route: {{ route.path }}</h6>
  </v-card>
  <v-card class="pa-6">
    <Hello />
  </v-card>
</template>
