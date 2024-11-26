import { type EventHandler, defineEventHandler } from 'h3'
import { getCounter } from '~/server/utils/firebase/counter'

const eventHandler: EventHandler = async (event) => {
  try {
    const { firestore } = event.context.firebase
    const counter = getCounter(firestore)
    await counter.increment()
    const value = await counter.getValue()
    return { value }
  } catch (err) {
    const error = err instanceof Error ? err : `${err}`
    throw createError(error)
  }
}

export default defineEventHandler(eventHandler)
