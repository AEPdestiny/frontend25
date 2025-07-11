// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios, { type AxiosError } from 'axios'

interface User {
  id: number
  email: string
  vorname: string
  nachname: string
}

interface AuthStore {
  user: Ref<User | null>
  error: Ref<string | null>
  isLoading: Ref<boolean>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = defineStore('auth', (): AuthStore => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const login = async (email: string, password: string) => {
    // Ihre bestehende Login-Logik
  }

  const logout = async () => {
    try {
      isLoading.value = true
      await axios.post('/auth/abmelden')
      user.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      await router.push('/auth/anmelden')
    } catch (err) {
      error.value = (err as AxiosError).message || 'Abmeldung fehlgeschlagen'
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    error,
    isLoading,
    login,
    logout
  }
})
