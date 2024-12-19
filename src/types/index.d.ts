import type { FirebaseApp } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import type { RouteMiddleware } from '#app'

export type AppRuntimeConfig = {
  firebaseServiceAccountClientEmail?: string
  firebaseServiceAccountPrivateKey?: string
}

export type AppPublicRuntimeConfig = {
  firebaseProjectId?: string
}

export type AppConfig = {
  debug: boolean
  maxInstances: number
  region: string
  runtimeConfig: AppRuntimeConfig & {
    public: AppPublicRuntimeConfig
  }
}

declare module 'nuxt/schema' {
  type RuntimeConfig = AppRuntimeConfig
  type PublicRuntimeConfig = AppPublicRuntimeConfig
}

declare module '#app' {
  interface NuxtApp {
    $authGuardMiddleware?: RouteMiddleware
  }
}

declare module 'h3' {
  interface H3EventContext {
    firebase: {
      firestore: Firestore
    }
    requireAuthentication?: (event: H3Event) => void
  }
}
