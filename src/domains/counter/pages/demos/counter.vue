<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: 'optional-auth-guard-middleware',
})
</script>

<template>
  <v-card>
    <v-card-title>Counter demo</v-card-title>
    <Counter />
  </v-card>
</template>
