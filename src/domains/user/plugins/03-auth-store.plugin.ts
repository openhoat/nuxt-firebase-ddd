import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '../stores/auth-store'

export default defineNuxtPlugin({
  dependsOn: ['firebase-plugin'],
  name: 'auth-store-plugin',
  setup: () => {
    const authStore = useAuthStore()
    return { provide: { authStore } }
  },
})
