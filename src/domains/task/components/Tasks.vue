<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import type { Task } from '../domain/task-service'

const tasks = ref<Task[]>([])
const newTask = ref('')

const { $withAuthorization } = useNuxtApp()

const createTask = async () => {
  if (!newTask.value) {
    return
  }
  const headers = $withAuthorization ? await $withAuthorization() : undefined
  await $fetch('/api/tasks', {
    body: JSON.stringify({ title: newTask.value }),
    headers,
    method: 'POST',
  })
  await fetchTasks()
  newTask.value = ''
}
const fetchTasks = async () => {
  const headers = $withAuthorization ? await $withAuthorization() : undefined
  const data: Task[] = await $fetch('/api/tasks', { headers })
  if (data) {
    tasks.value = data
  }
}
const removeTask = async (id: string) => {
  const headers = $withAuthorization ? await $withAuthorization() : undefined
  await $fetch(`/api/tasks/${id}`, { headers, method: 'DELETE' })
  await fetchTasks()
}
const updateTask = async (id: string, checked: boolean) => {
  const headers = $withAuthorization ? await $withAuthorization() : undefined
  const updatedTask: Task | null = await $fetch(`/api/tasks/${id}`, {
    body: JSON.stringify({ done: checked }),
    headers,
    method: 'PATCH',
  })
  if (updatedTask) {
    await fetchTasks()
  }
}
await fetchTasks()
</script>

<template>
  <v-container data-testid="tasksContainer" fluid>
    <v-list v-if="tasks">
      <v-list-item data-testid="taskItem" v-for="task in tasks" :key="task.id">
        <template v-slot:prepend>
          <v-checkbox
            data-testid="doneCheckbox"
            :label="task.title"
            v-model="task.done"
            @change="updateTask(task.id, $event.target.checked)"
          ></v-checkbox>
        </template>
        <template v-slot:append>
          <v-icon
            data-testid="removeIcon"
            icon="mdi-close"
            @click="removeTask(task.id)"
          ></v-icon>
        </template>
      </v-list-item>
      <v-text-field
        data-testid="newTaskInputText"
        label="Something new…"
        v-model="newTask"
        @change="createTask()"
      ></v-text-field>
    </v-list>
  </v-container>
</template>
