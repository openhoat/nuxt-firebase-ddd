import { protectRoutes } from '~/utils/route-protector'

export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuthStore()
  return protectRoutes(to, user, abortNavigation)
})
