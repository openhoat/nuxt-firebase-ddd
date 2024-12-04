<script lang="ts" setup>
const text = ref<string>()
const hello = () => {
  console.log('hello!')
  text.value = text.value ? undefined : 'world!'
}
</script>

<template>
  <v-container>
    <v-btn @click="hello()">Hello</v-btn>
    <v-card-text :v-if="text !== undefined">{{ text }}</v-card-text>
  </v-container>
</template>
