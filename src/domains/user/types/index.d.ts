import type { FirebaseApp } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import type { RouteMiddleware } from '#app'

export type AuthStore = StoreDefinition<
  'authStore',
  { user: User | null },
  StoreGetters<{ user: User | null }>,
  { signIn(): Promise<void>; signOut(): Promise<void> }
>

declare module '#app' {
  interface NuxtApp {
    $authStore: AuthStore
    $authGuardMiddleware: RouteMiddleware
  }
}

export type AuthUser = {
  authTime?: number
  email: string
  emailVerified?: boolean
  name: string
  picture?: string
  userId: string
}

declare module 'h3' {
  interface H3EventContext {
    firebase: {
      firebaseApp: FirebaseApp
      firestore: Firestore
    }
    user?: AuthUser | null
    requireAuthentication: (event: H3Event) => void
  }
}
