import type { NuxtApp } from 'nuxt/app'
import type { RouteMiddleware } from '#app'
import type { RouteLocationNormalized } from '#vue-router'

export const applyOptionalMiddleware = (
  nuxtApp: NuxtApp,
  name: string,
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => {
  const middleware = (nuxtApp as unknown as Record<string, unknown>)[name] as
    | RouteMiddleware
    | undefined
  if (!middleware) {
    return
  }
  return middleware(to, from)
}
