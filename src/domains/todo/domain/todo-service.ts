import type { GetService } from '~/domains/service'

export type Todo = {
  id: string
  title: string
  done: boolean
}

export type NewTodo = {
  title: string
  done?: boolean
}

export type TodoService = {
  createTodo: (todo: NewTodo) => Promise<Todo>
  getTodo: (id: string) => Promise<Todo | null>
  getTodos: () => Promise<Todo[]>
  removeTodo: (id: string) => Promise<boolean>
  updateTodo: (todo: Todo) => Promise<Todo | null>
}

export type GetTodoService<T = void> = GetService<TodoService, T>
