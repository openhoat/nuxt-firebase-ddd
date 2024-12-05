import type { User } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('authStore', {
  state: (): { user: User | null } => {
    const { $firebaseAuth } = useNuxtApp()
    return {
      user: $firebaseAuth.currentUser,
    }
  },
  actions: {
    async signIn() {
      const { $firebaseAuth } = useNuxtApp()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup($firebaseAuth, provider)
      this.user = userCredential.user
    },
    async signOut() {
      const { $firebaseAuth } = useNuxtApp()
      await signOut($firebaseAuth)
      this.user = null
    },
  },
})
