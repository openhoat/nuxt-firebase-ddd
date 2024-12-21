import type {
  GetTaskService,
  NewTask,
  Task,
  TaskService,
} from '../../domain/task-service'

const tasks: Task[] = [
  { id: '1', title: 'Buy milk bottle', done: false },
  { id: '2', title: 'Clean the kitchen', done: false },
]

let nextId = tasks.length + 1

export const getMemoryTaskService: GetTaskService = () => {
  const cloneTask = ({ id, title, done }: Task) => ({ id, title, done })
  const getTaskIndex = (id: string) =>
    Promise.resolve(tasks.findIndex((task) => task.id === id))
  const createTask: TaskService['createTask'] = (task: NewTask) => {
    const id = `${nextId++}`
    const newTask = { ...task, id, done: !!task.done }
    tasks.push(newTask)
    return Promise.resolve(newTask)
  }
  const getTask: TaskService['getTask'] = (id: string) => {
    const task = tasks.find((item) => item.id === id)
    return Promise.resolve(task ?? null)
  }
  const getTasks: TaskService['getTasks'] = () =>
    Promise.resolve(tasks.map((item) => cloneTask(item)))
  const removeTask: TaskService['removeTask'] = async (id) => {
    const existingIndex = await getTaskIndex(id)
    if (existingIndex === -1) {
      return Promise.resolve(false)
    }
    tasks.splice(existingIndex, 1)
    return Promise.resolve(true)
  }
  const updateTask: TaskService['updateTask'] = async (task: Task) => {
    const existingIndex = await getTaskIndex(task.id)
    if (existingIndex === -1) {
      return Promise.resolve(null)
    }
    tasks[existingIndex] = cloneTask(task)
    return Promise.resolve(task)
  }
  return { createTask, getTask, getTasks, removeTask, updateTask }
}
