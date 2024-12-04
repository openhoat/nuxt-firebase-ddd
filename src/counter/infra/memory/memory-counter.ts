import type { GetCounter } from '~/counter/domain/counter'

let count = 0

export const getMemoryCounter: GetCounter = () => {
  const getValue = () => Promise.resolve(count)
  const increment = () => {
    count += 1
    return Promise.resolve()
  }
  return { getValue, increment }
}
