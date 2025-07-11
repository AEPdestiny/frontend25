<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Anmelden</h2>

          <div v-if="authStore.error" class="alert alert-danger">
            {{ authStore.error }}
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="email" class="form-label">E-Mail</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                required
                :disabled="authStore.isLoading"
              >
            </div>

            <div class="mb-3">
              <label for="passwort" class="form-label">Passwort</label>
              <input
                type="password"
                class="form-control"
                id="passwort"
                v-model="passwort"
                required
                :disabled="authStore.isLoading"
              >
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="authStore.isLoading"
            >
              <span v-if="authStore.isLoading">
                <span class="spinner-border spinner-border-sm" role="status"></span>
                Wird verarbeitet...
              </span>
              <span v-else>Anmelden</span>
            </button>
          </form>

          <div class="mt-3 text-center">
            <router-link to="/registrieren">Noch kein Konto? Registrieren</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { error, isLoading } = storeToRefs(authStore)
const email = ref<string>('')
const passwort = ref<string>('')

const handleLogin = async (): Promise<void> => {
  await authStore.login(email.value, passwort.value)
}
</script>

<style scoped>
.spinner-border {
  margin-right: 8px;
}
</style>
