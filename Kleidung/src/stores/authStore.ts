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
      isLoading.value = true;
      error.value = null;

      // 1. Login-Request (URL-encoded)
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('passwort', password);

      const loginResponse = await axios.post('/api/auth/anmelden', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true // WICHTIG für Session-Cookies
      });

      // 2. Bei Erfolg: Benutzerdaten abrufen
      if (loginResponse.data.success) {
        const userResponse = await axios.get('/auth/current-user', {
          withCredentials: true
        });
        user.value = userResponse.data;
        localStorage.setItem('user', JSON.stringify(user.value));
        return true;
      }
      return false;
    } catch (err) {
      error.value = "Anmeldung fehlgeschlagen";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

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
