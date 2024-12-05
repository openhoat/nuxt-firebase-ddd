import type { FirebaseApp } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import type { Auth } from 'firebase/auth'

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

declare module '#app' {
  interface NuxtApp {
    $firebaseAuth?: Auth
  }
}

declare module 'nuxt/schema' {
  type RuntimeConfig = AppRuntimeConfig
  type PublicRuntimeConfig = AppPublicRuntimeConfig
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
    user: AuthUser
  }
}
