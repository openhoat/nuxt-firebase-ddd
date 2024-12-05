import { useAuthStore } from '~/stores/auth-store'
import { protectRoutes } from '~/utils/route-protector'
import { abortNavigation, defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuthStore()
  return protectRoutes(to, user, abortNavigation)
})
