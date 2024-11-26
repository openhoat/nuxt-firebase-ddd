<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <v-card>
    <v-card-title>Counter demo</v-card-title>
    <Counter />
  </v-card>
</template>
