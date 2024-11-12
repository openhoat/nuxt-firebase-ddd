<script lang="ts" setup>
const text = ref<string>()
const hello = () => {
  console.log('hello!')
  text.value = text.value ? undefined : 'world!'
}
</script>

<template>
  <div>
    <h4>
      <button @click="hello()">Hello</button>
      <p>{{ text }}</p>
    </h4>
  </div>
</template>
