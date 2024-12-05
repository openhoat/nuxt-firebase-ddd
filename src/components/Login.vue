<script lang="ts" setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const signIn = async () => {
  try {
    await authStore.signIn()
  } catch (reason) {
    console.error('Failed sign', reason)
  }
}
const signOut = async () => {
  await authStore.signOut()
}
</script>

<template>
  <v-card-text>
    <p v-if="user">Hello {{ user.displayName }}!</p>
    <v-btn v-if="user" @click="signOut()">SignOut</v-btn>
    <v-btn v-else @click="signIn()">SignIn with Google</v-btn>
  </v-card-text>
</template>
