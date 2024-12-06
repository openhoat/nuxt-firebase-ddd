<script lang="ts" setup>
const text = ref<string>()
const hello = async () => {
  if (text.value !== undefined) {
    text.value = undefined
    return
  }
  const helloData: { hello: string } = await $fetch('/api/hello')
  console.log('helloData:', helloData)
  text.value = helloData.hello
}
</script>

<template>
  <v-container>
    <v-btn data-testid="helloButton" @click="hello()">Hello</v-btn>
    <v-card-text data-testid="helloText" :v-if="text !== undefined">{{ text }}</v-card-text>
  </v-container>
</template>
