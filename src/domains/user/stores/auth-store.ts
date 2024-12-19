import { type StoreDefinition, type StoreGetters, defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import type { User } from '../domain/user'
import { getUserService } from '../infra/user.service'

export type UseAuthStore = StoreDefinition<
  'authStore',
  { user: User | null },
  StoreGetters<{ user: User | null }>,
  {
    signIn(): Promise<void>
    signOut(): Promise<void>
  }
>

export const useAuthStore: UseAuthStore = defineStore('authStore', {
  state: (): { user: User | null } => {
    const { $firebaseAuth } = useNuxtApp()
    const userService = getUserService({ firebaseAuth: $firebaseAuth })
    const user = userService.getCurrentUser()
    return { user }
  },
  actions: {
    async signIn() {
      const { $firebaseAuth } = useNuxtApp()
      const userService = getUserService({ firebaseAuth: $firebaseAuth })
      this.user = await userService.signIn()
    },
    async signOut() {
      const { $firebaseAuth } = useNuxtApp()
      const userService = getUserService({ firebaseAuth: $firebaseAuth })
      await userService.signOut()
      this.user = null
    },
  },
})
