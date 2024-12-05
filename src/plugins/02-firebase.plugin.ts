import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
} from 'firebase/auth'

export default defineNuxtPlugin({
  name: 'firebase-plugin',
  setup: async (nuxtApp) => {
    const { $config } = nuxtApp
    const {
      firebaseApiKey: apiKey,
      firebaseAppId: appId,
      firebaseAuthDomain: authDomain,
      firebaseAuthEmulatorUrl,
      firebaseMeasurementId: measurementId,
      firebaseMessagingSenderId: messagingSenderId,
      firebaseProjectId: projectId,
      firebaseStorageBucket: storageBucket,
      firebaseUseAuthEmulator,
    } = $config.public
    const firebaseApp = initializeApp({
      apiKey,
      appId,
      authDomain,
      measurementId,
      messagingSenderId,
      projectId,
      storageBucket,
    })
    const firebaseAuth = firebaseUseAuthEmulator
      ? getAuth()
      : getAuth(firebaseApp)
    if (firebaseUseAuthEmulator) {
      connectAuthEmulator(firebaseAuth, firebaseAuthEmulatorUrl)
    } else {
      await firebaseAuth.setPersistence(browserLocalPersistence)
    }
    return {
      provide: {
        firebaseAuth,
      },
    }
  },
})
