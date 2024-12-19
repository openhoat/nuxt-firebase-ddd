import type { GetService } from '../../service'

export type CounterService = {
  getValue: () => Promise<number>
  increment: () => Promise<void>
}

export type GetCounterService<T = void> = GetService<CounterService, T>
