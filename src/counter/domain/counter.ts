export type Counter = {
  getValue: () => Promise<number>
  increment: () => Promise<void>
}

export type GetCounter<T = void> = (config: T) => Counter
