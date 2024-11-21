import { type FirebaseOptions, initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
} from 'firebase/auth'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const {
    fbApiKeyProd,
    fbApiKeyStaging,
    fbAuthDomainProd,
    fbAuthDomainStaging,
    fbEnvTarget: envTarget,
    useFbAuthEmulator,
  } = config.public
  const firebaseConfigs: Record<string, FirebaseOptions> = {
    staging: {
      apiKey: fbApiKeyStaging,
      authDomain: fbAuthDomainStaging,
    },
    prod: {
      apiKey: fbApiKeyProd,
      authDomain: fbAuthDomainProd,
    },
  }
  const firebaseConfig = firebaseConfigs[envTarget] ?? firebaseConfigs.staging
  const firebaseApp = initializeApp(firebaseConfig)
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
