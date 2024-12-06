import { beforeAll, describe, expect, test } from 'vitest'
import type { Counter } from '~/counter/domain/counter'
import { getMemoryCounter } from '~/counter/infra/memory/memory-counter'

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
          let counter: Counter
          beforeAll(() => {
            counter = getMemoryCounter()
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
