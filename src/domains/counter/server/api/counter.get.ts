import { type EventHandler, defineEventHandler } from 'h3'
import { getCounterService } from '../../infra/counter.service'

const eventHandler: EventHandler = async (event) => {
  const {
    firebase: { firestore },
    requireAuthentication,
  } = event.context
  if (requireAuthentication) {
    requireAuthentication(event)
  }
  const counterService = getCounterService({ firestore })
  await counterService.increment()
  const value = await counterService.getValue()
  return { value }
}

export default defineEventHandler(eventHandler)
