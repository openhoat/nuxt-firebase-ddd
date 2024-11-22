import {
  GoogleAuthProvider,
  type User,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): { user?: User } => ({
    user: undefined,
  }),
  actions: {
    async signIn() {
      const { $auth } = useNuxtApp()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup($auth, provider)
      this.user = userCredential.user
    },
    async signOut() {
      const { $auth } = useNuxtApp()
      await signOut($auth)
      this.user = undefined
    },
  },
})
