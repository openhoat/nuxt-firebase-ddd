<script lang="ts" setup>
const route = useRoute()
type BreadcrumbsItem = {
  title: string
  disabled?: boolean
  to?: string
}
const buildBreadcrumbsItems = (): BreadcrumbsItem[] => {
  const routeParts =
    route.path === '/' ? [] : route.path.substring(1).split('/')
  const rootItem = {
    title: 'Home',
    disabled: false,
    to: '/',
  }
  const pathItems = routeParts.map((routePart, index) => {
    const disabled = index === 0 && routePart === 'demos'
    const title = disabled ? routePart : capitalize(routePart)
    const to = disabled
      ? undefined
      : `/${routeParts.slice(0, index + 1).join('/')}`
    return { title, disabled, to }
  })
  return [rootItem, ...pathItems]
}
</script>

<template>
  <v-breadcrumbs icon="mdi-home" :items="buildBreadcrumbsItems()" />
</template>
