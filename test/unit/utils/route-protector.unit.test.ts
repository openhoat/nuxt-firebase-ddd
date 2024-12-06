import type { User } from 'firebase/auth'
import {
  type Mock,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import { protectRoutes } from '~/utils/route-protector'
import type { RouteLocationNormalized } from '#vue-router'

describe('Unit tests', () => {
  describe('utils', () => {
    describe('route-protector', () => {
      describe('protectRoute', () => {
        let abortNavigationMock: Mock
        beforeAll(async () => {
          abortNavigationMock = vi.fn(() => false)
        })
        afterEach(() => {
          vi.resetAllMocks()
        })
        test('should abort navigation given user is not logged in', async () => {
          // Given
          const to = {
            name: '/foo',
          } as RouteLocationNormalized
          const user = null
          // When
          protectRoutes(to, user, abortNavigationMock)
          // Then
          expect(abortNavigationMock).toHaveBeenCalled()
        })
        test('should do nothing given user is logged in', () => {
          // Given
          const to = {
            name: '/foo',
          } as RouteLocationNormalized
          const user: User = {
            email: 'foo@bar.io',
            displayName: 'John Doe',
          } as User
          // When
          protectRoutes(to, user, abortNavigationMock)
          // Then
          expect(abortNavigationMock).not.toHaveBeenCalled()
        })
      })
    })
  })
})
