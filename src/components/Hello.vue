<script lang="ts" setup>
const text = ref<string>()
const hello = () => {
  console.log('hello!')
  text.value = text.value ? undefined : 'world!'
}
</script>

<template>
  <div>
    <Button @click="hello()">Hello</Button>
    <div :v-if="text">{{ text }}</div>
  </div>
</template>
