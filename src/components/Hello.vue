<script lang="ts" setup>
const { data: helloData } = await useFetch('/api/hello')
console.log('helloData:', helloData.value)
</script>

<template>
  <div>
    <h4>Hello data</h4>
    <pre>{{ helloData }}</pre>
  </div>
</template>
