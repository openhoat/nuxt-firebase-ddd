import type { User } from 'firebase/auth'
import { type StoreDefinition, type StoreGetters, defineStore } from 'pinia'
import { getUserService } from '~/domains/user/infra/user.service'
import { useNuxtApp } from '#app'

export const setUserJwtCookie = async (user: User) => {
  const jwt = await user.getIdToken()
  const { expirationTime } = await user.getIdTokenResult()
  const userCookie = useCookie('userJwt', {
    expires: new Date(expirationTime),
    secure: true,
  })
  userCookie.value = jwt
}

export type UseAuthStore = StoreDefinition<
  'authStore',
  { user: User | null },
  StoreGetters<{ user: User | null }>,
  { signIn(): Promise<void>; signOut(): Promise<void> }
>

export const useAuthStore: UseAuthStore = defineStore('authStore', {
  state: (): { user: User | null } => {
    const { $firebaseAuth } = useNuxtApp()
    const userService = getUserService({ firebaseAuth: $firebaseAuth })
    const user = userService.getCurrentUser()
    if (user) {
      void setUserJwtCookie(user)
    }
    return { user }
  },
  actions: {
    async signIn() {
      const { $firebaseAuth } = useNuxtApp()
      const userService = getUserService({ firebaseAuth: $firebaseAuth })
      const user = await userService.signIn()
      if (!user) {
        return
      }
      this.user = user
      await setUserJwtCookie(user)
    },
    async signOut() {
      const { $firebaseAuth } = useNuxtApp()
      const userService = getUserService({ firebaseAuth: $firebaseAuth })
      await userService.signOut()
      this.user = null
    },
  },
})
