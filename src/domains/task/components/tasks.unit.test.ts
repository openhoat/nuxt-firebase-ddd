// @vitest-environment nuxt
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import type { VTextField } from 'vuetify/components'
import type { ComponentWrapper } from '~~/test/utils/test-helper'
import type { Task } from '../domain/task-service'
import Tasks from './Tasks.vue'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('task', () => {
      describe('components', () => {
        describe('Tasks', () => {
          let wrapper: VueWrapper
          let components: {
            tasksContainer: ComponentWrapper
            taskItems: ComponentWrapper[]
            doneCheckboxes: ComponentWrapper[]
            removeIcons: ComponentWrapper[]
            newTaskInputText: VTextField
          }
          let tasks: Task[]
          beforeAll(async () => {
            registerEndpoint('/api/tasks/1', {
              handler: () => {
                tasks[0].done = true
              },
              method: 'PATCH',
            })
            registerEndpoint('/api/tasks/1', {
              handler: () => {
                tasks.splice(0, 1)
              },
              method: 'DELETE',
            })
            registerEndpoint('/api/tasks', {
              handler: () => {
                tasks.push({
                  done: false,
                  id: `${tasks.length + 1}`,
                  title: 'This is a new task',
                })
              },
              method: 'POST',
            })
            registerEndpoint('/api/tasks', () => tasks)
            components = {
              get tasksContainer() {
                return wrapper.findComponent('[data-testid="tasksContainer"]')
              },
              get taskItems() {
                return wrapper.findAllComponents({ name: 'v-list-item' })
              },
              get doneCheckboxes() {
                return wrapper.findAllComponents({ name: 'v-checkbox' })
              },
              get removeIcons() {
                return wrapper.findAllComponents('[data-testid="removeIcon"]')
              },
              get newTaskInputText() {
                return wrapper.findComponent('[data-testid="newTaskInputText"]')
              },
            }
          })
          beforeEach(async () => {
            tasks = [
              { id: '1', title: 'Buy milk bottle', done: false },
              { id: '2', title: 'Clean the kitchen', done: false },
            ]
            wrapper = await mountSuspended(Tasks)
          })
          const expectInitialContent = () => {
            expect(components.tasksContainer.exists()).toBe(true)
            expect(components.tasksContainer.isVisible()).toBe(true)
            expect(components.newTaskInputText.exists()).toBe(true)
            expect(components.newTaskInputText.isVisible()).toBe(true)
            expect(components.newTaskInputText.text()).toContain(
              'Something new…',
            )
            expect(components.doneCheckboxes.length).toBe(tasks.length)
            expect(components.doneCheckboxes[0].exists()).toBe(true)
            expect(components.doneCheckboxes[0].isVisible()).toBe(true)
            expect(components.removeIcons.length).toBe(tasks.length)
            expect(components.removeIcons[0].exists()).toBe(true)
            expect(components.removeIcons[0].isVisible()).toBe(true)
          }
          test('renders the task list', () => {
            // Then
            expectInitialContent()
          })
          test('renders an updated task list with a new task given new task is added', async () => {
            // Given
            expectInitialContent()
            const noTaskItems = tasks.length
            // When
            await components.newTaskInputText.setValue('This is a new task')
            await components.newTaskInputText.trigger('change')
            await vi.waitUntil(
              () => components.taskItems.length === noTaskItems + 1,
            )
            // Then
            expect(components.newTaskInputText.value).toBeUndefined()
            expect(
              components.taskItems.map((taskItem) => taskItem.text()),
            ).toStrictEqual([
              'Buy milk bottle',
              'Clean the kitchen',
              'This is a new task',
            ])
          })
          test('renders the unchanged task list given new task is added with empty value', async () => {
            // Given
            expectInitialContent()
            // When
            await components.newTaskInputText.setValue('')
            await components.newTaskInputText.trigger('change')
            // Then
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve()
              }, 10)
            })
            expect(components.newTaskInputText.value).toBeUndefined()
            expect(
              components.taskItems.map((taskItem) => taskItem.text()),
            ).toStrictEqual(['Buy milk bottle', 'Clean the kitchen'])
          })
          test('renders an updated task list without the first task given first task is removed', async () => {
            // Given
            expectInitialContent()
            const noTaskItems = tasks.length
            // When
            await components.removeIcons[0].trigger('click')
            await vi.waitUntil(
              () => components.taskItems.length === noTaskItems - 1,
            )
            // Then
            expect(components.newTaskInputText.value).toBeUndefined()
            expect(
              components.taskItems.map((item) => item.text()),
            ).toStrictEqual(['Clean the kitchen'])
          })
          test('renders an updated task list with first task marked as done given the first task done checkbox is checked', async () => {
            // Given
            expectInitialContent()
            // When
            await components.doneCheckboxes[0].trigger('change')
            await vi.waitUntil(() => tasks[0].done)
            // Then
            expect(components.newTaskInputText.value).toBeUndefined()
            expect(
              components.taskItems.map((item) => item.text()),
            ).toStrictEqual(['Buy milk bottle', 'Clean the kitchen'])
          })
        })
      })
    })
  })
})
