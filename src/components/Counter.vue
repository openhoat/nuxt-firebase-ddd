<script setup lang="ts">
const count = ref<number>()
const fetchCounter = async () => {
  const counterData: { value: number } = await $fetch('/api/counter')
  console.log('counterData:', counterData)
  count.value = counterData.value
}
</script>

<template>
  <v-card-text>
    <v-btn @click="fetchCounter()">Counter</v-btn>
    <v-card-text :v-if="count !== undefined">{{ count }}</v-card-text>
  </v-card-text>
</template>
