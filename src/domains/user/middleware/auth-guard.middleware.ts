import { defineNuxtRouteMiddleware, showError } from '#app'
import { useAuthStore } from '../stores/auth-store'
import { requireAuthentication } from '../utils/route-protector'

export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuthStore()
  const error = requireAuthentication(to, user)
  return error ? showError(error) : undefined
})
