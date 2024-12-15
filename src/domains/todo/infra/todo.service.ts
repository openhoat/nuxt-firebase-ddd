import type { Firestore } from 'firebase-admin/firestore'
import type { GetTodoService } from '~/domains/todo/domain/todo-service'
import { getFirestoreTodoService } from '~/domains/todo/infra/firestore/firestore-todo.service'
import { getMemoryTodoService } from '~/domains/todo/infra/memory/memory-todo.service'

export type TodoServiceConfig = { firestore?: Firestore }

export const getTodoService: GetTodoService<TodoServiceConfig> = (config) => {
  const { firestore } = config
  return firestore
    ? getFirestoreTodoService({ firestore })
    : getMemoryTodoService()
}
