import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
} from 'firebase/auth'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const {
    fbApiKey: apiKey,
    fbAppId: appId,
    fbAuthDomain: authDomain,
    fbMessagingSenderId: messagingSenderId,
    fbProjectId: projectId,
    fbStorageBucket: storageBucket,
    useFbAuthEmulator,
  } = config.public
  const firebaseApp = initializeApp({
    apiKey,
    appId,
    authDomain,
    messagingSenderId,
    projectId,
    storageBucket,
  })
  const auth = useFbAuthEmulator ? getAuth() : getAuth(firebaseApp)
  if (useFbAuthEmulator) {
    connectAuthEmulator(auth, 'http://localhost:9099')
  } else {
    await auth.setPersistence(browserLocalPersistence)
  }
  return {
    provide: {
      auth,
    },
  }
})
