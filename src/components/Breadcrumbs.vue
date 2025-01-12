<script lang="ts" setup>
import { buildBreadcrumbsItems } from '~/utils/breadcrumbs-helper'
import { useRoute } from '#app'
</script>

<template>
  <v-breadcrumbs icon="mdi-home" :items="buildBreadcrumbsItems(useRoute().path)" />
</template>
