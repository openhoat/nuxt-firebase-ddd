import type { GetService } from '../../service'

export type Task = {
  id: string
  title: string
  done: boolean
}

export type NewTask = {
  title: string
  done?: boolean
}

export type TaskService = {
  createTask: (task: NewTask) => Promise<Task>
  getTask: (id: string) => Promise<Task | null>
  getTasks: () => Promise<Task[]>
  removeTask: (id: string) => Promise<boolean>
  updateTask: (task: Task) => Promise<Task | null>
}

export type GetTaskService<T = void> = GetService<TaskService, T>
