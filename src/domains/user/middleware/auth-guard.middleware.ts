import { useAuthStore } from '~/domains/user/stores/auth-store'
import { requireAuthentication } from '~/domains/user/utils/route-protector'
import { abortNavigation, defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuthStore()
  return requireAuthentication(to, user, abortNavigation)
})
