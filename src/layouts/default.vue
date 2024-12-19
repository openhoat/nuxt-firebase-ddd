<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { buildNavItems } from '~/utils/nav-items'
import { useState } from '#app'

const drawer = useState('drawer', () => false)
const switchDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon
        data-testid="navigation-drawer"
        @click="switchDrawer()"
      ></v-app-bar-nav-icon>
      <v-app-bar-title> Application </v-app-bar-title>
    </v-app-bar>
    <client-only>
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-item to="/" title="Home"></v-list-item>
          <v-list-subheader title="demos" />
          <template v-for="{ condition, title, to } in buildNavItems()">
            <v-list-item
              v-if="condition === undefined || condition"
              :title="title"
              :to="to"
            ></v-list-item>
          </template>
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
