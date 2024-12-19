import type { Feature, FeatureNavItem } from '~/types'
import { useAppConfig } from '#app'

export const buildNavItems: () => FeatureNavItem[] = () => {
  const appConfig = useAppConfig()
  const features: Feature[] = Object.values(appConfig.features)
  const featureNavItems: FeatureNavItem[] = features
    .map(({ navItems }) => navItems)
    .filter((navItems) => navItems !== undefined)
    .reduce((acc, navItems) => {
      acc.push(...navItems)
      return acc
    }, [] as FeatureNavItem[])
    .sort(
      (a, b) =>
        (typeof a.order !== 'undefined' ? a.order : Number.MAX_SAFE_INTEGER) -
        (typeof b.order !== 'undefined' ? b.order : Number.MAX_SAFE_INTEGER),
    )
  return featureNavItems
}
