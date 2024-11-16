<script lang="ts" setup>
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const { $auth } = useNuxtApp()

const user = useState<typeof $auth.currentUser>('user')

console.log('user:', user)

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
</script>

<template>
  <div>
    <h2>Login</h2>
    <span v-if="user">Hello {{ user.displayName }}!</span>
    <button v-else @click="signIn()">SignIn with Google</button>
  </div>
</template>
