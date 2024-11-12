<script lang="ts" setup>
const {
  subtitle,
  title = 'Demo sandbox',
  description = 'Demo project about nuxt and firebase functions',
} = defineProps({
  title: String,
  subtitle: String,
  description: String,
})
const fullTitle = subtitle ? `${title} - ${subtitle}` : title
</script>

<template>
  <Head>
    <Title>{{ fullTitle }}</Title>
    <Meta name="description" :content="description" />
  </Head>
</template>
