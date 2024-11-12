<script setup>
import { ref } from 'vue'

const route = useRoute()
const drawer = ref(false)
const switchDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-app id="inspire">
    <client-only>
      <v-navigation-drawer v-model="drawer">
        <v-list-item title="Navigation" subtitle="Menu"></v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/" title="Home"></v-list-item>
        <v-divider></v-divider>
        <v-list-item title="demos"></v-list-item>
        <v-list-item to="/hello" title="Hello"></v-list-item>
        <v-list-item to="/counter" title="Counter"></v-list-item>
      </v-navigation-drawer>
    </client-only>
    <v-app-bar>
      <v-app-bar-nav-icon @click="switchDrawer()"></v-app-bar-nav-icon>
      <v-app-bar-title> Application </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-card-text> Current route: {{ route.path }} </v-card-text>
      <v-card> <slot /></v-card>
    </v-main>
  </v-app>
</template>
