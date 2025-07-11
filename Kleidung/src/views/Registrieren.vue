<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Registrieren</h2>

          <div v-if="erfolg" class="alert alert-success">{{ erfolg }}</div>
          <div v-if="fehler" class="alert alert-danger">{{ fehler }}</div>

          <form @submit.prevent="registrieren">
            <div class="mb-3">
              <label for="email" class="form-label">E-Mail</label>
              <input type="email" class="form-control" id="email" v-model="benutzer.email" required>
            </div>

            <div class="mb-3">
              <label for="vorname" class="form-label">Vorname</label>
              <input type="text" class="form-control" id="vorname" v-model="benutzer.vorname" required>
            </div>

            <div class="mb-3">
              <label for="nachname" class="form-label">Nachname</label>
              <input type="text" class="form-control" id="nachname" v-model="benutzer.nachname" required>
            </div>

            <div class="mb-3">
              <label for="passwort" class="form-label">Passwort</label>
              <input type="password" class="form-control" id="passwort" v-model="benutzer.passwort" required>
            </div>

            <div class="mb-3">
              <label for="passwortBestaetigen" class="form-label">Passwort bestätigen</label>
              <input type="password" class="form-control" id="passwortBestaetigen" v-model="passwortBestaetigen" required>
            </div>

            <button type="submit" class="btn btn-primary w-100">Registrieren</button>
          </form>

          <div class="mt-3 text-center">
            <router-link to="/anmelden">Bereits registriert? Anmelden</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      benutzer: {
        email: '',
        vorname: '',
        nachname: '',
        passwort: ''
      },
      passwortBestaetigen: '',
      erfolg: '',
      fehler: ''
    }
  },
  methods: {
    async registrieren() {
      if (this.benutzer.passwort !== this.passwortBestaetigen) {
        this.fehler = 'Passwörter stimmen nicht überein'
        return
      }

      try {
        await axios.post('/auth/registrieren', this.benutzer)
        this.erfolg = 'Registrierung erfolgreich! Sie können sich jetzt anmelden.'
        this.fehler = ''
        this.benutzer = {
          email: '',
          vorname: '',
          nachname: '',
          passwort: ''
        }
        this.passwortBestaetigen = ''
      } catch (error) {
        this.fehler = error.response?.data?.message || 'Registrierung fehlgeschlagen'
        console.error('Registrierungsfehler:', error)
      }
    }
  }
}
</script>
