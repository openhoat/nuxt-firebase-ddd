import type { RouteMiddleware } from '#app'

const authMiddleware: RouteMiddleware = (to) => {
  const { user } = useAuth()
  if (!user) {
    console.log(`Not logged: page ${to.path} is forbidden`)
    return abortNavigation()
  }
  return
}

export default defineNuxtRouteMiddleware(authMiddleware)
