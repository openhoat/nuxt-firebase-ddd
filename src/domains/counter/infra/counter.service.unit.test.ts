import type { Firestore } from 'firebase-admin/firestore'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import type {
  CounterService,
  GetCounterService,
} from '../domain/counter-service'
import type { CounterServiceConfig } from './counter.service'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('counter', () => {
      describe('infra', () => {
        describe('counter service', () => {
          type Testcase = {
            expected: number
          }
          const cases: Testcase[] = Array.from(Array(4).keys()).map(
            (index) => ({
              expected: index + 1,
            }),
          )
          let getCounterService: GetCounterService<CounterServiceConfig>
          let counterService: CounterService
          beforeAll(async () => {
            vi.doMock('./firestore/firestore-counter.service', () => ({
              getFirestoreCounterService: () => ({
                getValue: () => 123,
                increment: () => {},
              }),
            }))
            getCounterService = (await import('./counter.service'))
              .getCounterService
            counterService = getCounterService({})
          })
          test.each(cases)(
            'should increment counter and return value $expected',
            async ({ expected }) => {
              // When
              await counterService.increment()
              // Then
              const result = await counterService.getValue()
              expect(result).toBe(expected)
            },
          )
          test('should use a firestore counter service given config provides firestore', async () => {
            // Given
            const counterService = getCounterService({
              firestore: {} as Firestore,
            })
            // When
            const result = await counterService.getValue()
            // Then
            expect(result).toBe(123)
          })
        })
      })
    })
  })
})
