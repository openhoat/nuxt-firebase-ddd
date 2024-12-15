import { type EventHandler, defineEventHandler } from 'h3'
import { getTodoService } from '~/domains/todo/infra/todo.service'

const eventHandler: EventHandler = (event) => {
  const { firestore } = event.context.firebase
  const counterService = getTodoService({ firestore })
  return counterService.getTodos()
}

export default defineEventHandler(eventHandler)
