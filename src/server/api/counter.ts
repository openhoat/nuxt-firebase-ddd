import { type EventHandler, type H3EventContext, defineEventHandler } from 'h3'
import { getFirestoreCounter } from '~/counter/infra/firestore/firestore-counter'
import { getMemoryCounter } from '~/counter/infra/memory/memory-counter'

type CounterType = 'memory' | 'firestore'

const getCounter = (counterType: CounterType, context: H3EventContext) => {
  switch (counterType) {
    case 'firestore': {
      const { firestore } = context.firebase
      return getFirestoreCounter({ firestore })
    }
    default:
      return getMemoryCounter()
  }
}

const eventHandler: EventHandler = async (event) => {
  try {
    const counter = getCounter('firestore', event.context)
    await counter.increment()
    const value = await counter.getValue()
    return { value }
  } catch (err) {
    const error = err instanceof Error ? err : `${err}`
    throw createError(error)
  }
}

export default defineEventHandler(eventHandler)
