<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth-store'

const authStore = useAuthStore()
const { signIn, signOut } = authStore
const { user } = storeToRefs(authStore)
</script>

<template>
  <v-card-text data-testid="loginContainer">
    <v-container data-testid="loggedContainer" v-if="user">
      <v-card-text data-testid="loggedText"
        >Hello {{ user.displayName }}!</v-card-text
      >
      <v-btn data-testid="signOutButton" @click="signOut()">SignOut</v-btn>
    </v-container>
    <v-container data-testid="notLoggedContainer" v-else>
      <v-btn data-testid="signInWithGoogleButton" @click="signIn()"
        >SignIn with Google</v-btn
      >
    </v-container>
  </v-card-text>
</template>
