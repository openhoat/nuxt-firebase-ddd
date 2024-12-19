import { useAuthStore } from '~/domains/user/stores/auth-store'

export default defineNuxtPlugin({
  dependsOn: ['firebase-plugin'],
  name: 'auth-store-plugin',
  setup: () => ({
    provide: {
      authStore: useAuthStore(),
    },
  }),
})
