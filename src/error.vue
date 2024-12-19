<script lang="ts" setup>
import PageHead from '~/components/PageHead.vue'
import { type NuxtError, clearError } from '#app'

const { error } = defineProps({
  error: Object as () => NuxtError,
})
if (error) {
  console.warn(error.message)
}
const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <PageHead subtitle="Error" />
    <v-card>
      <v-card-title>Error</v-card-title>
      <v-card-subtitle
        >{{ error?.statusMessage }} ({{ error?.statusCode }})</v-card-subtitle
      >
      <v-card-text>{{ error?.message }}</v-card-text>
      <v-btn @click="handleClearError">Clear</v-btn>
    </v-card>
  </NuxtLayout>
</template>
