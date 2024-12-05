import type { FirebaseApp } from '@firebase/app'
import type { Auth } from '@firebase/auth'
import type { Firestore } from 'firebase-admin/firestore'

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

declare module 'h3' {
  interface H3EventContext {
    firebase: {
      firebaseApp: FirebaseApp
      firestore: Firestore
    }
  }
}
