import type { GetService } from '../../service'
import type { User } from '../domain/user'

export type UserService = {
  getCurrentUser: () => User | null
  signIn: () => Promise<User | null>
  signOut: () => Promise<void>
}

export type GetUserService<T = void> = GetService<UserService, T>
