<script lang="ts" setup>
const route = useRoute()
const capitalize = (value: string) =>
  value.replace(/(?:^|\s|-)\S/g, (firstLetter) => firstLetter.toUpperCase())
type BreadcrumbsItem = {
  title: string
  disabled?: boolean
  href: string
}
const buildBreadcrumbsItems = (): BreadcrumbsItem[] => {
  const routeParts = route.path.split('/')
  return routeParts.map((routePart, index) =>
    index === 0
      ? {
          title: 'Home',
          href: '/',
        }
      : {
          title: capitalize(routePart),
          disabled: false,
          href: routeParts.slice(0, index).join('/'),
        },
  )
}
</script>

<template>
  <v-breadcrumbs icon="mdi-home" :items="buildBreadcrumbsItems()" />
</template>
