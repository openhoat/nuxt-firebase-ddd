<script lang="ts" setup>
const hello = () => {
  console.log('hello!')
}
</script>

<template>
  <div>
    <h4>
      <button @click="hello()">Hello</button>
    </h4>
  </div>
</template>
