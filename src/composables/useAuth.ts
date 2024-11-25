import type { User } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
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
