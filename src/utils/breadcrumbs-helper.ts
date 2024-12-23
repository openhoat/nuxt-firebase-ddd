import { capitalize } from 'vue'
import type { RouteLocationNormalizedLoaded } from '#vue-router'

export type BreadcrumbsItem = {
  title: string
  disabled?: boolean
  to?: string
}

export const buildBreadcrumbsItems = (
  route: RouteLocationNormalizedLoaded,
): BreadcrumbsItem[] => {
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
