<script lang="ts" setup>
const auth = useAuth()
const { user } = storeToRefs(auth)

const signIn = async () => {
  try {
    await auth.signIn()
  } catch (reason) {
    console.error('Failed sign', reason)
  }
}
const signOut = async () => {
  await auth.signOut()
}
</script>

<template>
  <v-card-text>
    <p v-if="user">Hello {{ user.displayName }}!</p>
    <v-btn v-if="user" @click="signOut()">SignOut</v-btn>
    <v-btn v-else @click="signIn()">SignIn with Google</v-btn>
  </v-card-text>
</template>
