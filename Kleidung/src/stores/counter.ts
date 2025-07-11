// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: number
  email: string
  vorname: string
  nachname: string
  // Weitere Benutzerfelder je nach Bedarf
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  const login = async (email: string, password: string): Promise<void> => {
    try {
      error.value = null
      const response = await fetch('/auth/anmelden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          passwort: password
        }).toString()
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.fehler || 'Anmeldung fehlgeschlagen')
      }

      // Benutzerdaten abrufen nach erfolgreicher Anmeldung
      const userResponse = await fetch('/api/current-user')
      if (!userResponse.ok) {
        throw new Error('Benutzerdaten konnten nicht geladen werden')
      }

      const userData: User = await userResponse.json()
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      router.push('/dashboard')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Netzwerkfehler. Bitte versuchen Sie es später erneut.'
    }
  }

  const register = async (userData: {
    email: string
    passwort: string
    vorname: string
    nachname: string
  }): Promise<void> => {
    try {
      error.value = null
      success.value = null

      const response = await fetch('/auth/registrieren', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.fehler || 'Registrierung fehlgeschlagen')
      }

      success.value = 'Registrierung erfolgreich! Bitte melden Sie sich an.'
      router.push('/auth/anmelden')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Netzwerkfehler. Bitte versuchen Sie es später erneut.'
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await fetch('/auth/abmelden', { method: 'POST' })
    } finally {
      user.value = null
      localStorage.removeItem('user')
      router.push('/auth/anmelden')
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
    login,
    register,
    logout,
    clearMessages
  }
})
