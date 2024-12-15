import { type EventHandler, createError, defineEventHandler } from 'h3'
import { getTodoService } from '~/domains/todo/infra/todo.service'

const eventHandler: EventHandler = async (event) => {
  const { firestore } = event.context.firebase
  const counterService = getTodoService({ firestore })
  const id = event.context.params?.id
  if (id === undefined) {
    return createError({ message: 'Resource id missing', status: 404 })
  }
  const removed = await counterService.removeTodo(id)
  if (!removed) {
    return createError({
      message: `Resource (id:${id}) not found`,
      status: 404,
    })
  }
  return undefined
}

export default defineEventHandler(eventHandler)
