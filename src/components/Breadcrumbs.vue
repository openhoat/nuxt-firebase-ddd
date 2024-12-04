<script lang="ts" setup>
import { buildBreadcrumbsItems } from '~/utils/breadcrumbs-helper'
import { useRoute } from '#app'

const breadcrumbsItems = buildBreadcrumbsItems(useRoute())
</script>

<template>
  <v-breadcrumbs icon="mdi-home" :items="breadcrumbsItems" />
</template>
