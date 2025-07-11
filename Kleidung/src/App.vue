<template>
  <div id="app">
    <!-- Navigationsleiste -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link to="/" class="navbar-brand">Kleidungsverwaltung</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/kleidung" class="nav-link">Kleidungsstücke</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <template v-if="!authStore.user">
              <li class="nav-item">
                <router-link to="/auth/anmelden" class="nav-link">Anmelden</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/auth/registrieren" class="nav-link">Registrieren</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <span class="nav-link">Eingeloggt als: {{ authStore.user.vorname }}</span>
              </li>
              <li class="nav-item">
                <button @click="authStore.logout()" class="btn btn-link nav-link">Abmelden</button>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hauptinhalt -->
    <div class="container mt-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Globale Nachrichten -->
    <div v-if="authStore.error || authStore.success" class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div :class="['alert', authStore.error ? 'alert-danger' : 'alert-success']" role="alert">
        {{ authStore.error || authStore.success }}
        <button type="button" class="btn-close" @click="authStore.clearMessages()"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue'

const authStore = useAuthStore()

// Nachrichten nach 5 Sekunden automatisch ausblenden
onMounted(() => {
  setInterval(() => {
    authStore.clearMessages()
  }, 5000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
