import authGuardMiddleware from '~/domains/user/middleware/auth-guard.middleware'

export default defineNuxtPlugin({
  name: 'auth-guard-middleware-plugin',
  setup: async () => ({
    provide: {
      authGuardMiddleware,
    },
  }),
})
