import type { User } from 'firebase/auth'
import { describe, expect, test } from 'vitest'
import type { RouteLocationNormalized } from '#vue-router'
import { requireAuthentication } from './route-protector'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('user', () => {
      describe('utils', () => {
        describe('route-protector', () => {
          describe('requireAuthentication', () => {
            test('should abort navigation given user is not logged in', async () => {
              // Given
              const to = {
                name: '/foo',
              } as RouteLocationNormalized
              const user = null
              // When
              const result = requireAuthentication(to, user)
              // Then
              expect(result).toBeInstanceOf(Error)
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
              const result = requireAuthentication(to, user)
              // Then
              expect(result).toBeUndefined()
            })
          })
        })
      })
    })
  })
})
