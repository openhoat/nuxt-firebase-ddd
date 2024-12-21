<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: 'optional-auth-guard-middleware',
})
</script>

<template>
  <v-card>
    <v-card-title>Tasks demo</v-card-title>
    <Tasks />
  </v-card>
</template>
