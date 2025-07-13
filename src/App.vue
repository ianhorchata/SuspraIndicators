<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
const drawer = ref(false)
const pathwayItems = [
  { to: '/community', label: 'Community' },
  { to: '/food', label: 'Food' },
  { to: '/water', label: 'Water' },
  { to: '/movement', label: 'Movement' },
  { to: '/energy', label: 'Energy' },
  { to: '/goods', label: 'Goods' },
  { to: '/habitat', label: 'Habitat' },
  { to: '/score', label: 'Score' },
  { to: '/user', label: 'User' },
]
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>SuspraIndicators</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item>
          <RouterLink to="/">
            <v-list-item-title>Home</v-list-item-title>
          </RouterLink>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in pathwayItems" :key="item.to">
          <RouterLink :to="item.to">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
