import { beforeAll, describe, expect, test } from 'vitest'
import type { CounterService } from '~/domains/counter/domain/counter-service'
import { getMemoryCounterService } from '~/domains/counter/infra/memory/memory-counter.service'

describe('Unit tests', () => {
  describe('counter', () => {
    describe('infra', () => {
      describe('memory', () => {
        describe('memory counter', () => {
          type Testcase = {
            expected: number
          }
          const cases: Testcase[] = Array.from(Array(4).keys()).map(
            (index) => ({ expected: index + 1 }),
          )
          let counter: CounterService
          beforeAll(() => {
            counter = getMemoryCounterService()
          })
          test.each(cases)(
            'should increment counter and return value $expected',
            async ({ expected }) => {
              // When
              await counter.increment()
              // Then
              const result = await counter.getValue()
              expect(result).toBe(expected)
            },
          )
        })
      })
    })
  })
})
