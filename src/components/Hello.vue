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
  <div>
    <button @click="hello()">Hello</button>
    <p :v-if="text">{{ text }}</p>
  </div>
</template>
