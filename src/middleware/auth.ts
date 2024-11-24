import { useAuthStore } from '~/store/auth'
import type { RouteMiddleware } from '#app'

const authMiddleware: RouteMiddleware = (to) => {
  const authStore = useAuthStore()
  if (!authStore.user) {
    console.log(`Not logged: page ${to.path} is forbidden`)
    return abortNavigation()
  }
  return
}

export default defineNuxtRouteMiddleware(authMiddleware)
