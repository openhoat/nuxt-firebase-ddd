<script lang="ts" setup>
import { ref, watch } from 'vue'
import { buildBreadcrumbsItems } from '~/utils/breadcrumbs-helper'
import { useRoute } from '#app'

const route = useRoute()
const breadcrumbsItems = ref(buildBreadcrumbsItems(route.path))

watch(
  route,
  (newRoute) => {
    breadcrumbsItems.value = buildBreadcrumbsItems(newRoute.path)
  },
  { deep: true },
)
</script>

<template>
  <v-breadcrumbs icon="mdi-home" :items="breadcrumbsItems" />
</template>
