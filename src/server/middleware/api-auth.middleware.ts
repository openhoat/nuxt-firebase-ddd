import type { HTTPMethod } from 'h3'
import { protectServerRoute } from '~/server/utils/server-route-protector'

export const apiBaseUriPath = '/api/'

export type ProtectedServerRoute = {
  path: RegExp
  method?: HTTPMethod
}

export type ProtectedServerRouteSpec =
  | {
      path: string | RegExp
      method?: HTTPMethod
    }
  | string
  | RegExp

export const protectedServerRoutesPath: ProtectedServerRouteSpec[] = [
  /^counter$/,
  /^todos(\/.*)?$/,
]

export const protectedServerRoutes: ProtectedServerRoute[] =
  protectedServerRoutesPath.map((item) =>
    typeof item === 'string' || item instanceof RegExp
      ? { path: typeof item === 'string' ? new RegExp(item) : item }
      : {
          method: item.method,
          path:
            typeof item.path === 'string' ? new RegExp(item.path) : item.path,
        },
  )

export default defineEventHandler((event) => {
  if (!event.path.startsWith(apiBaseUriPath)) {
    return
  }
  const routePath = event.path.substring(apiBaseUriPath.length)
  const requireAuth = protectedServerRoutes.reduce(
    (requireAuth, route) =>
      requireAuth ||
      (route.path.test(routePath) &&
        (!route.method || route.method === event.method)),
    false,
  )
  if (requireAuth) {
    protectServerRoute(event)
  }
})
