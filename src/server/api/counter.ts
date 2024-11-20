import { type EventHandler, defineEventHandler } from 'h3'

const eventHandler: EventHandler = async () => {
  try {
    const { firestore } = initFirebaseAdmin()
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
