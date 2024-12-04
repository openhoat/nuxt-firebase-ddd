import type { GetCounterService } from '~/domains/counter/domain/counter-service'

export const getMemoryCounterService: GetCounterService = () => {
  let count = 0
  const getValue = () => Promise.resolve(count)
  const increment = () => {
    count += 1
    return Promise.resolve()
  }
  return { getValue, increment }
}
