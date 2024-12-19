import type { RouteMiddleware } from '#app'
import type { User } from '../domain/user'

export type AuthStore = StoreDefinition<
  'authStore',
  { user: User | null },
  StoreGetters<{ user: User | null }>,
  { signIn(): Promise<void>; signOut(): Promise<void> }
>

declare module '#app' {
  interface NuxtApp {
    $authStore: AuthStore
    $authGuardMiddleware?: RouteMiddleware
    $withAuthorization?: (headers?: Headers) => Promise<Headers | undefined>
  }
}

declare module 'h3' {
  interface H3EventContext {
    requireAuthentication?: (event: H3Event) => void
    user?: Omit<User, 'getJwt'> | null
  }
}
