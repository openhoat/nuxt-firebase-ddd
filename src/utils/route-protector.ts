import type { RouteLocationNormalized } from '#vue-router'

export type ProtectRoutes<T = unknown> = (
  to: RouteLocationNormalized,
  user: T | null,
  abortNavigation: () => boolean,
) => boolean | undefined

export const protectRoutes: ProtectRoutes = (to, user, abortNavigation) => {
  if (user === null) {
    console.log(`Not logged: page ${to.path} is forbidden`)
    return abortNavigation()
  }
  return
}
