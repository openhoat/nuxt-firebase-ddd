import type { Firestore } from 'firebase-admin/firestore'

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

export type AppRuntimeConfig = {
  firebaseServiceAccountClientEmail?: string
  firebaseServiceAccountPrivateKey?: string
  public: AppPublicRuntimeConfig
}

export type AppConfig = {
  debug: boolean
  maxInstances: number
  region: string
  runtimeConfig: AppRuntimeConfig
}

declare module 'nuxt/schema' {
  type RuntimeConfig = AppRuntimeConfig
  type PublicRuntimeConfig = AppPublicRuntimeConfig
}

declare module '#app' {
  interface NuxtApp {
    $firebaseAuth?: Auth
  }
}

declare module 'h3' {
  interface H3EventContext {
    firebase: {
      firestore: Firestore
    }
  }
}

export type FeatureNavItem = {
  condition?: boolean
  order?: number
  title: string
  to: string
}

export type Feature = {
  name: string
  navItems?: FeatureNavItem[]
}

declare module '#app' {
  interface NuxtApp {
    appConfig: {
      features: Record<string, Feature>
    }
  }
}
