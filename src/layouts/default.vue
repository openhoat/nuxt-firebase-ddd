<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { useState } from '#app'

const drawer = useState('drawer', () => false)
const switchDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon @click="switchDrawer()"></v-app-bar-nav-icon>
      <v-app-bar-title> Application </v-app-bar-title>
    </v-app-bar>
    <client-only>
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-item to="/" title="Home"></v-list-item>
          <v-list-subheader title="demos" />
          <v-list-item to="/demos/hello" title="Hello"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </client-only>
    <v-main class="d-flex flex-column align-center justify-center">
      <v-container>
        <Breadcrumbs />
        <v-card style="min-height: 300px"> <slot /></v-card
      ></v-container>
    </v-main>
  </v-layout>
</template>
