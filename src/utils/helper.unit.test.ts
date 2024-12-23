import { describe, expect, test } from 'vitest'
import { areNotEmpty } from '~/utils/helper'

describe('Unit tests', () => {
  describe('utils', () => {
    describe('helper', () => {
      describe('areNotEmpty', () => {
        type Testcase = {
          args: unknown[]
          expected: boolean
        }
        const cases: Testcase[] = [
          { args: ['foo'], expected: true },
          { args: ['foo', 'bar', true, false, {}], expected: true },
          { args: [''], expected: false },
          { args: [undefined], expected: false },
          { args: [null], expected: false },
          { args: ['foo', true, {}, ''], expected: false },
          { args: ['foo', true, {}, undefined], expected: false },
          { args: ['foo', true, {}, null], expected: false },
        ]
        test.each(cases)(
          'should return $expected given $args',
          async ({ args, expected }) => {
            // When
            const result = areNotEmpty(...args)
            // Then
            expect(result).toBe(expected)
          },
        )
      })
    })
  })
})
