<script setup lang="ts">
import type { Todo } from '~/domains/todo/domain/todo-service'

const todos = ref<Todo[]>([])
const newTodo = ref('')

const createTodo = async () => {
  if (!newTodo.value) {
    return
  }
  await $fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title: newTodo.value }),
  })
  await fetchTodos()
  newTodo.value = ''
}
const fetchTodos = async () => {
  const data: Todo[] = await $fetch('/api/todos')
  if (data) {
    todos.value = data
  }
}
const removeTodo = async (id: string) => {
  await $fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })
  await fetchTodos()
}
const updateTodo = async (id: string, checked: boolean) => {
  const updatedTodo: Todo | null = await $fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done: checked }),
  })
  if (updatedTodo) {
    await fetchTodos()
  }
}
await fetchTodos()
</script>

<template>
  <v-container data-testid="todosContainer" fluid>
    <v-list v-if="todos">
      <v-list-item data-testid="todoItem" v-for="todo in todos" :key="todo.id">
        <template v-slot:prepend>
          <v-checkbox
            data-testid="doneCheckbox"
            :label="todo.title"
            v-model="todo.done"
            @change="updateTodo(todo.id, $event.target.checked)"
          ></v-checkbox>
        </template>
        <template v-slot:append>
          <v-icon
            data-testid="removeIcon"
            icon="mdi-close"
            @click="removeTodo(todo.id)"
          ></v-icon>
        </template>
      </v-list-item>
      <v-text-field
        data-testid="newTodoInputText"
        label="Something new…"
        v-model="newTodo"
        @change="createTodo()"
      ></v-text-field>
    </v-list>
  </v-container>
</template>
