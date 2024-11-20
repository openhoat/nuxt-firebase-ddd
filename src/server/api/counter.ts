import { type EventHandler, defineEventHandler } from 'h3'
import { initFirebase } from '~/utils/firebase'
import { getCounter } from '~/utils/firebase/counter'

const eventHandler: EventHandler = async () => {
  const { firestore } = initFirebase()
  const counter = getCounter(firestore)
  await counter.increment()
  const value = await counter.getValue()
  return { value }
}

export default defineEventHandler(eventHandler)
