import { capitalize } from 'vue'

export type BreadcrumbsItem = {
  title: string
  disabled?: boolean
  to?: string
}

export const buildBreadcrumbsItems = (routePath: string): BreadcrumbsItem[] => {
  const routeParts = routePath === '/' ? [] : routePath.substring(1).split('/')
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
