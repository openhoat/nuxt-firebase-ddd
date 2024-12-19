import type { FirebaseApp } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import type { Auth } from 'firebase/auth'
import type { RouteMiddleware } from '#app'

export type AppRuntimeConfig = {
  firebaseServiceAccountClientEmail?: string
  firebaseServiceAccountPrivateKey?: string
}

export type AppPublicRuntimeConfig = {
  firebaseApiKey: string
  firebaseAppId: string
  firebaseAuthDomain: string
  firebaseAuthEmulatorUrl: string
  firebaseMeasurementId: string
  firebaseMessagingSenderId: string
  firebaseProjectId?: string
  firebaseStorageBucket: string
  firebaseUseAuthEmulator: boolean
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
    $firebaseAuth?: Auth
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
      firestore: Firestore
    }
    requireAuthentication?: (event: H3Event) => void
  }
}
