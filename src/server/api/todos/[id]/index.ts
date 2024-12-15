import {
  type EventHandler,
  type H3Event,
  createError,
  defineEventHandler,
} from 'h3'
import { getTodoService } from '~/domains/todo/infra/todo.service'

const eventHandler: EventHandler = async (
  event: H3Event<{ routerParams: { id: string } }>,
) => {
  const { firestore } = event.context.firebase
  const counterService = getTodoService({ firestore })
  const id = event.context.params?.id
  if (id === undefined) {
    return createError({ message: 'Resource id missing', status: 404 })
  }
  const todo = await counterService.getTodo(id)
  if (!todo) {
    return createError({
      message: `Resource (id:${id}) not found`,
      status: 404,
    })
  }
  return todo
}

export default defineEventHandler(eventHandler)
