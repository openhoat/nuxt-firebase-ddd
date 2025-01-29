import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'auth-guard-middleware-plugin',
  setup: async () => {
    const authGuardMiddleware = (
      await import('../middleware/auth-guard.middleware')
    ).default
    return { provide: { authGuardMiddleware } }
  },
})
