<script lang="ts" setup>
const text = ref<string>()
const hello = () => {
  console.log('hello!')
  text.value = text.value ? undefined : 'world!'
}
</script>

<template>
  <div>
    <button @click="hello()">Hello</button>
    <div :v-if="text !== undefined">{{ text }}</div>
  </div>
</template>
