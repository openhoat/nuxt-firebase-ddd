<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Demo</h1>
    <p>Current route: {{ route.path }}</p>
  </div>
  <div>
    <Hello />
  </div>
  <div>
    <Counter />
  </div>
  <div>
    <Login />
  </div>
</template>
