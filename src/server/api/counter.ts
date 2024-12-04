import { type EventHandler, defineEventHandler } from 'h3'
import { getCounterService } from '~/domains/counter/infra/counter.service'

const eventHandler: EventHandler = async (event) => {
  const { firestore } = event.context.firebase
  const counterService = getCounterService({ firestore })
  await counterService.increment()
  const value = await counterService.getValue()
  return { value }
}

export default defineEventHandler(eventHandler)
