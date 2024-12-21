import { type EventHandler, defineEventHandler } from 'h3'
import { getTaskService } from '../../../infra/task.service'

const eventHandler: EventHandler = (event) => {
  const {
    firebase: { firestore },
    requireAuthentication,
  } = event.context
  if (requireAuthentication) {
    requireAuthentication(event)
  }
  const taskService = getTaskService({ firestore })
  return taskService.getTasks()
}

export default defineEventHandler(eventHandler)
