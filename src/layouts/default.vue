<script setup>
import { ref } from 'vue'

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
        <v-list-item link title="Item 1"></v-list-item>
        <v-list-item link title="Item 2"></v-list-item>
        <v-list-item link title="Item 3"></v-list-item> </v-navigation-drawer
    ></client-only>
    <v-app-bar>
      <v-app-bar-nav-icon @click="switchDrawer()"></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
