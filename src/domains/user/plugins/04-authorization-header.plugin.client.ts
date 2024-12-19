import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '../stores/auth-store'

export default defineNuxtPlugin({
  dependsOn: ['auth-store-plugin'],
  name: 'user-jwt-plugin',
  setup: () => {
    const authStore = useAuthStore()
    const withAuthorization = async (headers: Headers = new Headers()) => {
      const { user } = authStore
      if (!user) {
        return undefined
      }
      const token = await user.getJwt()
      headers.append('Authorization', `Bearer ${token}`)
      return headers
    }
    return { provide: { withAuthorization } }
  },
})
