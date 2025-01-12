<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>()
const hello = () => {
  console.log('hello!')
  text.value = text.value ? undefined : 'world!'
}
</script>

<template>
  <v-container data-testid="helloContainer">
    <v-btn data-testid="helloButton" @click="hello()">Hello</v-btn>
    <v-card-text data-testid="helloText" :v-if="text !== undefined">{{
      text
    }}</v-card-text>
  </v-container>
</template>
