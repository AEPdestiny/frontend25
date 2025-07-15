import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
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
  success: Ref<string | null>
  isLoading: Ref<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  clearMessages: () => void
}

export const useAuthStore = defineStore('auth', (): AuthStore => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)
  const isLoading = ref(false)

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      isLoading.value = true
      error.value = null

      await axios.post('/auth/anmelden',
        new URLSearchParams({ email, passwort: password }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })

      const userResponse = await axios.get('/auth/current-user')
      user.value = userResponse.data
      localStorage.setItem('user', JSON.stringify(user.value))
      success.value = 'Anmeldung erfolgreich'
      return true
    } catch (err) {
      const axiosError = err as AxiosError<{ fehler?: string }>
      error.value = axiosError.response?.data?.fehler || 'Anmeldung fehlgeschlagen'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      isLoading.value = true
      await axios.post('/auth/abmelden')
      user.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      success.value = 'Abmeldung erfolgreich'
      await router.push('/auth/anmelden')
    } catch (err) {
      error.value = (err as AxiosError).message || 'Abmeldung fehlgeschlagen'
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = (): void => {
    error.value = null
    success.value = null
  }

  return {
    user,
    error,
    success,
    isLoading,
    login,
    logout,
    clearMessages
  }
})
