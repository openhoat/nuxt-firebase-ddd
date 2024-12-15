import type { Firestore } from 'firebase-admin/firestore'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import type { GetTodoService } from '~/domains/todo/domain/todo-service'
import type { TodoServiceConfig } from '~/domains/todo/infra/todo.service'
import { isNotNull } from '~/utils/helper'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('todo', () => {
      describe('infra', () => {
        describe('todo service', () => {
          const fakeTodos = [
            { id: '1', title: 'Buy milk bottle', done: false },
            { id: '2', title: 'Clean the kitchen', done: false },
          ]
          let getTodoService: GetTodoService<TodoServiceConfig>
          beforeAll(async () => {
            vi.doMock(
              '~/domains/todo/infra/firestore/firestore-todo.service',
              () => ({
                getFirestoreTodoService: () => ({
                  getTodos: () => fakeTodos,
                }),
              }),
            )
            getTodoService = (await import('~/domains/todo/infra/todo.service'))
              .getTodoService
          })
          test('should CRUD todo list', async () => {
            // Given
            const todoService = getTodoService({})
            {
              // When
              const todos = await todoService.getTodos()
              // Then
              expect(todos).toStrictEqual([
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
            const newTodo = await todoService.createTodo({
              title: 'foo',
            })
            expect(newTodo).toStrictEqual({
              done: false,
              id: '3',
              title: 'foo',
            })
            expect(await todoService.getTodos()).toStrictEqual([
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
              newTodo,
            ])
            // When
            const todo = await todoService.getTodo(newTodo.id)
            // Then
            expect(todo).toStrictEqual(newTodo)
            // When
            const notFoundTodo = await todoService.getTodo('999')
            // Then
            expect(notFoundTodo).toBeNull()
            // When
            const updatedTodo = await todoService.updateTodo({
              ...newTodo,
              done: true,
            })
            // Then
            if (!isNotNull(updatedTodo)) {
              throw new Error('updatedTodo is null')
            }
            expect(updatedTodo).toStrictEqual({
              done: true,
              id: '3',
              title: 'foo',
            })
            expect(await todoService.getTodos()).toStrictEqual([
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
              updatedTodo,
            ])
            // When
            const updatedNotFoundTodo = await todoService.updateTodo({
              ...newTodo,
              done: true,
              id: '999',
            })
            // Then
            expect(updatedNotFoundTodo).toBeNull()
            expect(await todoService.getTodos()).toStrictEqual([
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
              updatedTodo,
            ])
            // When
            const removeResult = await todoService.removeTodo(updatedTodo.id)
            // Then
            expect(removeResult).toBe(true)
            expect(await todoService.getTodos()).toStrictEqual([
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
            const removeNotFoundResult = await todoService.removeTodo('999')
            expect(removeNotFoundResult).toBe(false)
            expect(await todoService.getTodos()).toStrictEqual([
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
          test('should use a firestore todo service given config provides firestore', () => {
            // Given
            const todoService = getTodoService({
              firestore: {} as Firestore,
            })
            // When
            const result = todoService.getTodos()
            // Then
            expect(result).toStrictEqual(fakeTodos)
          })
        })
      })
    })
  })
})
