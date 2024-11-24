import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
} from 'firebase/auth'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
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
  } = config.public
  const firebaseApp = initializeApp({
    apiKey,
    appId,
    authDomain,
    measurementId,
    messagingSenderId,
    projectId,
    storageBucket,
  })
  const auth = firebaseUseAuthEmulator ? getAuth() : getAuth(firebaseApp)
  if (firebaseUseAuthEmulator) {
    connectAuthEmulator(auth, firebaseAuthEmulatorUrl)
  } else {
    await auth.setPersistence(browserLocalPersistence)
  }
  return {
    provide: {
      auth,
    },
  }
})
