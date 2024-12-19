<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const count = ref<number>()

const { $withAuthorization } = useNuxtApp()

const fetchCounter = async () => {
  const headers = $withAuthorization ? await $withAuthorization() : undefined
  const counterData: { value: number } = await $fetch('/api/counter', {
    headers,
  })
  console.log('counterData:', counterData)
  count.value = counterData.value
}
</script>

<template>
  <v-card-text data-testid="counterContainer">
    <v-btn data-testid="counterButton" @click="fetchCounter()">Counter</v-btn>
    <v-card-text data-testid="counterText" :v-if="count !== undefined">{{
      count
    }}</v-card-text>
  </v-card-text>
</template>
