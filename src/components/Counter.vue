<script setup lang="ts">
const { data: counterData } = await useFetch('/api/counter')
console.log('counterData:', counterData.value)
</script>

<template>
  <div>
    <h4>Counter data</h4>
    <pre>{{ counterData }}</pre>
  </div>
</template>
