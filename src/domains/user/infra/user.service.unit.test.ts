import type { Auth } from 'firebase/auth'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import type { GetUserService } from '../domain/user-service'
import type { UserServiceConfig } from './user.service'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('user', () => {
      describe('infra', () => {
        describe('user service', () => {
          let getUserService: GetUserService<UserServiceConfig>
          beforeAll(async () => {
            vi.doMock('./firebase/firebase-user.service', () => ({
              getFirebaseUserService: () => ({
                getCurrentUser: () => ({ displayName: 'John Doe' }),
              }),
            }))
            getUserService = (await import('./user.service')).getUserService
          })
          test('should use a firebase user service given config provides firebaseAuth', () => {
            // Given
            const userService = getUserService({
              firebaseAuth: {} as Auth,
            })
            // When
            const result = userService.getCurrentUser()
            // Then
            expect(result).toStrictEqual({ displayName: 'John Doe' })
          })
        })
      })
    })
  })
})
