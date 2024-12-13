import type { Auth } from 'firebase/auth'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import type { GetUserService } from '~/domains/user/domain/user-service'
import type { UserServiceConfig } from '~/domains/user/infra/user.service'

describe('Unit tests', () => {
  describe('user', () => {
    describe('infra', () => {
      describe('user service', () => {
        let getUserService: GetUserService<UserServiceConfig>
        beforeAll(async () => {
          vi.doMock(
            '~/domains/user/infra/firebase/firebase-user.service',
            () => ({
              getFirebaseUserService: () => ({
                getCurrentUser: () => ({ displayName: 'John Doe' }),
              }),
            }),
          )
          getUserService = (await import('~/domains/user/infra/user.service'))
            .getUserService
        })
        test('should use a firebase user service given config provides firebaseAuth', () => {
          // Given
          const firebaseUser = getUserService({
            firebaseAuth: {} as Auth,
          })
          // When
          const result = firebaseUser.getCurrentUser()
          // Then
          expect(result).toStrictEqual({ displayName: 'John Doe' })
        })
      })
    })
  })
})
