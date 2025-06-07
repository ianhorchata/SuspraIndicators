<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav style="padding: 1em; background: #f5f5f5; display: flex; gap: 1em; align-items: center;">
    <router-link to="/" style="font-weight: bold;">Home</router-link>
    <router-link to="/user">User</router-link>
    <router-link to="/community">Community</router-link>
    <router-link to="/food">Food</router-link>
    <router-link to="/water">Water</router-link>
    <router-link to="/movement">Movement</router-link>
    <router-link to="/energy">Energy</router-link>
    <router-link to="/goods">Goods</router-link>
    <router-link to="/habitat">Habitat</router-link>
    <router-link to="/score">Score</router-link>
  </nav>
  <RouterView />
</template>
