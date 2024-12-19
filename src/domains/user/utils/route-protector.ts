import { createError } from 'h3'
import type { NuxtError } from '#app'
import type { RouteLocationNormalized } from '#vue-router'

export type RequireAuthentication<T = unknown> = (
  to: RouteLocationNormalized,
  user: T | null,
) => NuxtError | undefined

export const requireAuthentication: RequireAuthentication = (to, user) => {
  if (user === null) {
    const message = `Not logged in: page ${to.path} is forbidden`
    return createError({
      message,
      status: 403,
      statusText: 'Access forbidden',
    })
  }
  return
}
