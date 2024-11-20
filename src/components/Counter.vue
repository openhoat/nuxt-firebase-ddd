<script setup lang="ts">
const count = ref<number>()
const fetchCounter = async () => {
  const counterData = await $fetch<{ value: number }>('/api/counter')
  console.log('counterData:', counterData)
  count.value = counterData.value
}
</script>

<template>
  <v-card-text>
    <button @click="fetchCounter()">Counter</button>
    <p :v-if="count">{{ count }}</p>
  </v-card-text>
</template>
