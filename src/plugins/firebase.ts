import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
} from 'firebase/auth'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  console.log('config in firebase plugin:', config)
  const {
    firebaseApiKey: apiKey,
    firebaseAppId: appId,
    firebaseAuthDomain: authDomain,
    firebaseAuthEmulatorUrl,
    firebaseMeasurementId: measurementId,
    firebaseMessagingSenderId: messagingSenderId,
    firebaseProjectId: projectId,
    firebaseStorageBucket: storageBucket,
    useFirebaseAuthEmulator,
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
  const auth = useFirebaseAuthEmulator ? getAuth() : getAuth(firebaseApp)
  if (useFirebaseAuthEmulator) {
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
