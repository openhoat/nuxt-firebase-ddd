import type { GetCounterService } from '~/domains/counter/domain/counter-service'

let count = 0

export const getMemoryCounterService: GetCounterService = () => {
  const getValue = () => Promise.resolve(count)
  const increment = () => {
    count += 1
    return Promise.resolve()
  }
  return { getValue, increment }
}
