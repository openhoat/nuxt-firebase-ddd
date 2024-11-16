<script lang="ts" setup>
import {
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  signInWithPopup,
} from 'firebase/auth'

const { $auth } = useNuxtApp()

const user = useState<typeof $auth.currentUser>('user')

console.log('user:', user.value)

const refreshUser = () => {
  user.value = $auth.currentUser
}

refreshUser()

const signIn = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup($auth, provider)
    refreshUser()
  } catch (reason) {
    console.error('Failed sign', reason)
  }
}
const signOut = async () => {
  await firebaseSignOut($auth)
  refreshUser()
}
</script>

<template>
  <v-card-text>
    <p v-if="user">Hello {{ user.displayName }}!</p>
    <v-btn v-if="user" @click="signOut()">SignOut</v-btn>
    <v-btn v-else @click="signIn()">SignIn with Google</v-btn>
  </v-card-text>
</template>
