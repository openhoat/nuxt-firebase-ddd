import type { RouteLocationNormalized } from '#vue-router'

export type RequireAuthentication<T = unknown> = (
  to: RouteLocationNormalized,
  user: T | null,
  abortNavigation: () => boolean,
) => boolean | undefined

export const requireAuthentication: RequireAuthentication = (
  to,
  user,
  abortNavigation,
) => {
  if (user === null) {
    console.warn(`Not logged in: page ${to.path} is forbidden`)
    return abortNavigation()
  }
  return
}
