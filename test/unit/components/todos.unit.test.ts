// @vitest-environment nuxt
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import type { VTextField } from 'vuetify/components'
import Todos from '~/components/Todos.vue'
import type { Todo } from '~/domains/todo/domain/todo-service'
import type { ComponentWrapper } from '~~/test/unit/components/test-helper'

describe('Unit tests', () => {
  describe('components', () => {
    describe('Todos', () => {
      let wrapper: VueWrapper
      let components: {
        todosContainer: ComponentWrapper
        todoItems: ComponentWrapper[]
        doneCheckboxes: ComponentWrapper[]
        removeIcons: ComponentWrapper[]
        newTodoInputText: VTextField
      }
      let todos: Todo[]
      beforeAll(async () => {
        registerEndpoint('/api/todos/1', {
          handler: () => {
            todos[0].done = true
          },
          method: 'PATCH',
        })
        registerEndpoint('/api/todos/1', {
          handler: () => {
            todos.splice(0, 1)
          },
          method: 'DELETE',
        })
        registerEndpoint('/api/todos', {
          handler: () => {
            todos.push({
              done: false,
              id: `${todos.length + 1}`,
              title: 'This is a new TODO',
            })
          },
          method: 'POST',
        })
        registerEndpoint('/api/todos', () => todos)
        components = {
          get todosContainer() {
            return wrapper.findComponent('[data-testid="todosContainer"]')
          },
          get todoItems() {
            return wrapper.findAllComponents({ name: 'v-list-item' })
          },
          get doneCheckboxes() {
            return wrapper.findAllComponents({ name: 'v-checkbox' })
          },
          get removeIcons() {
            return wrapper.findAllComponents('[data-testid="removeIcon"]')
          },
          get newTodoInputText() {
            return wrapper.findComponent('[data-testid="newTodoInputText"]')
          },
        }
      })
      beforeEach(async () => {
        todos = [
          { id: '1', title: 'Buy milk bottle', done: false },
          { id: '2', title: 'Clean the kitchen', done: false },
        ]
        wrapper = await mountSuspended(Todos)
      })
      const expectInitialContent = () => {
        expect(components.todosContainer.exists()).toBe(true)
        expect(components.todosContainer.isVisible()).toBe(true)
        expect(components.newTodoInputText.exists()).toBe(true)
        expect(components.newTodoInputText.isVisible()).toBe(true)
        expect(components.newTodoInputText.text()).toContain('Something new…')
        expect(components.doneCheckboxes.length).toBe(todos.length)
        expect(components.doneCheckboxes[0].exists()).toBe(true)
        expect(components.doneCheckboxes[0].isVisible()).toBe(true)
        expect(components.removeIcons.length).toBe(todos.length)
        expect(components.removeIcons[0].exists()).toBe(true)
        expect(components.removeIcons[0].isVisible()).toBe(true)
      }
      test('renders the todo list', () => {
        // Then
        expectInitialContent()
      })
      test('renders an updated todo list with a new todo given new todo is added', async () => {
        // Given
        expectInitialContent()
        const noTodoItems = todos.length
        // When
        await components.newTodoInputText.setValue('This is a new TODO')
        await components.newTodoInputText.trigger('change')
        await vi.waitUntil(
          () => components.todoItems.length === noTodoItems + 1,
        )
        // Then
        expect(components.newTodoInputText.value).toBeUndefined()
        expect(
          components.todoItems.map((todoItem) => todoItem.text()),
        ).toStrictEqual([
          'Buy milk bottle',
          'Clean the kitchen',
          'This is a new TODO',
        ])
      })
      test('renders the unchanged todo list given new todo is added with empty value', async () => {
        // Given
        expectInitialContent()
        // When
        await components.newTodoInputText.setValue('')
        await components.newTodoInputText.trigger('change')
        // Then
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, 10)
        })
        expect(components.newTodoInputText.value).toBeUndefined()
        expect(
          components.todoItems.map((todoItem) => todoItem.text()),
        ).toStrictEqual(['Buy milk bottle', 'Clean the kitchen'])
      })
      test('renders an updated todo list without the first todo given first todo is removed', async () => {
        // Given
        expectInitialContent()
        const noTodoItems = todos.length
        // When
        await components.removeIcons[0].trigger('click')
        await vi.waitUntil(
          () => components.todoItems.length === noTodoItems - 1,
        )
        // Then
        expect(components.newTodoInputText.value).toBeUndefined()
        expect(
          components.todoItems.map((todoItem) => todoItem.text()),
        ).toStrictEqual(['Clean the kitchen'])
      })
      test('renders an updated todo list with first todo marked as done given the first todo done checkbox is checked', async () => {
        // Given
        expectInitialContent()
        // When
        await components.doneCheckboxes[0].trigger('change')
        await vi.waitUntil(() => todos[0].done)
        // Then
        expect(components.newTodoInputText.value).toBeUndefined()
        expect(
          components.todoItems.map((todoItem) => todoItem.text()),
        ).toStrictEqual(['Buy milk bottle', 'Clean the kitchen'])
      })
    })
  })
})
