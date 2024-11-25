<script lang="ts" setup>
const text = ref<string>()
const hello = async () => {
  if (text.value) {
    text.value = undefined
    return
  }
  const helloData = await $fetch<{ hello: string }>('/api/hello')
  console.log('helloData:', helloData)
  text.value = helloData.hello
}
</script>

<template>
  <v-container>
    <v-btn @click="hello()">Hello</v-btn>
    <v-card-text :v-if="text">{{ text }}</v-card-text>
  </v-container>
</template>
