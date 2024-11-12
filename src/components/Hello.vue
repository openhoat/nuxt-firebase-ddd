<script lang="ts" setup>
const text = ref<string>()
const hello = () => {
  console.log('hello!')
  text.value = text.value ? undefined : 'world!'
}
</script>

<template>
  <v-card-text>
    <button @click="hello()">Hello</button>
    <p>{{ text }}</p>
  </v-card-text>
</template>
