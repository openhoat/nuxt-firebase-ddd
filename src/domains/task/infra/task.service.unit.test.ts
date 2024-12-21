import type { Firestore } from 'firebase-admin/firestore'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import { isNotNull } from '~/utils/helper'
import type { GetTaskService } from '../domain/task-service'
import type { TaskServiceConfig } from './task.service'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('task', () => {
      describe('infra', () => {
        describe('task service', () => {
          const fakeTasks = [
            { id: '1', title: 'Buy milk bottle', done: false },
            { id: '2', title: 'Clean the kitchen', done: false },
          ]
          let getTaskService: GetTaskService<TaskServiceConfig>
          beforeAll(async () => {
            vi.doMock('./firestore/firestore-task.service', () => ({
              getFirestoreTaskService: () => ({
                getTasks: () => fakeTasks,
              }),
            }))
            getTaskService = (await import('./task.service')).getTaskService
          })
          test('should CRUD task list', async () => {
            // Given
            const taskService = getTaskService({})
            {
              // When
              const tasks = await taskService.getTasks()
              // Then
              expect(tasks).toStrictEqual([
                {
                  done: false,
                  id: '1',
                  title: 'Buy milk bottle',
                },
                {
                  done: false,
                  id: '2',
                  title: 'Clean the kitchen',
                },
              ])
            }
            // When
            const newTask = await taskService.createTask({
              title: 'foo',
            })
            expect(newTask).toStrictEqual({
              done: false,
              id: '3',
              title: 'foo',
            })
            expect(await taskService.getTasks()).toStrictEqual([
              {
                done: false,
                id: '1',
                title: 'Buy milk bottle',
              },
              {
                done: false,
                id: '2',
                title: 'Clean the kitchen',
              },
              newTask,
            ])
            // When
            const task = await taskService.getTask(newTask.id)
            // Then
            expect(task).toStrictEqual(newTask)
            // When
            const notFoundTask = await taskService.getTask('999')
            // Then
            expect(notFoundTask).toBeNull()
            // When
            const updatedTask = await taskService.updateTask({
              ...newTask,
              done: true,
            })
            // Then
            if (!isNotNull(updatedTask)) {
              throw new Error('updated task is null')
            }
            expect(updatedTask).toStrictEqual({
              done: true,
              id: '3',
              title: 'foo',
            })
            expect(await taskService.getTasks()).toStrictEqual([
              {
                done: false,
                id: '1',
                title: 'Buy milk bottle',
              },
              {
                done: false,
                id: '2',
                title: 'Clean the kitchen',
              },
              updatedTask,
            ])
            // When
            const updatedNotFoundTask = await taskService.updateTask({
              ...newTask,
              done: true,
              id: '999',
            })
            // Then
            expect(updatedNotFoundTask).toBeNull()
            expect(await taskService.getTasks()).toStrictEqual([
              {
                done: false,
                id: '1',
                title: 'Buy milk bottle',
              },
              {
                done: false,
                id: '2',
                title: 'Clean the kitchen',
              },
              updatedTask,
            ])
            // When
            const removeResult = await taskService.removeTask(updatedTask.id)
            // Then
            expect(removeResult).toBe(true)
            expect(await taskService.getTasks()).toStrictEqual([
              {
                done: false,
                id: '1',
                title: 'Buy milk bottle',
              },
              {
                done: false,
                id: '2',
                title: 'Clean the kitchen',
              },
            ])
            // When
            const removeNotFoundResult = await taskService.removeTask('999')
            expect(removeNotFoundResult).toBe(false)
            expect(await taskService.getTasks()).toStrictEqual([
              {
                done: false,
                id: '1',
                title: 'Buy milk bottle',
              },
              {
                done: false,
                id: '2',
                title: 'Clean the kitchen',
              },
            ])
          })
          test('should use a firestore task service given config provides firestore', () => {
            // Given
            const taskService = getTaskService({
              firestore: {} as Firestore,
            })
            // When
            const result = taskService.getTasks()
            // Then
            expect(result).toStrictEqual(fakeTasks)
          })
        })
      })
    })
  })
})
