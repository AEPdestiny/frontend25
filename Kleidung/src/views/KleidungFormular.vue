<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card">
        <div class="card-header">
          <h2 class="mb-0">{{ istBearbeitung ? 'Kleidungsstück bearbeiten' : 'Neues Kleidungsstück' }}</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="speichern">
            <div v-if="erfolg" class="alert alert-success">{{ erfolg }}</div>
            <div v-if="fehler" class="alert alert-danger">{{ fehler }}</div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Bezeichnung*</label>
                <input type="text" class="form-control" v-model="kleidungsstueck.bezeichnung" required>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Größe*</label>
                <select class="form-select" v-model="kleidungsstueck.groesse" required>
                  <option v-for="groesse in groessen" :value="groesse" :key="groesse">{{ groesse }}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Kategorie</label>
                <select class="form-select" v-model="kleidungsstueck.kategorie">
                  <option v-for="kategorie in kategorien" :value="kategorie" :key="kategorie">{{ kategorie }}</option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Farbe</label>
                <input type="text" class="form-control" v-model="kleidungsstueck.farbe">
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Lagerbestand*</label>
                <input type="number" min="0" class="form-control" v-model="kleidungsstueck.lagerbestand" required>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Lager</label>
                <input type="text" class="form-control" v-model="kleidungsstueck.lager">
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Beschreibung</label>
              <textarea class="form-control" rows="3" v-model="kleidungsstueck.beschreibung"></textarea>
            </div>

            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary">
                {{ istBearbeitung ? 'Aktualisieren' : 'Speichern' }}
              </button>

              <router-link to="/kleidung" class="btn btn-outline-secondary">
                Abbrechen
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      kleidungsstueck: {
        bezeichnung: '',
        groesse: 'M',
        kategorie: 'HEMD',
        farbe: '',
        lagerbestand: 0,
        lager: '',
        beschreibung: ''
      },
      groessen: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      kategorien: ['HEMD', 'HOSE', 'KLEID', 'JACKE', 'SCHUHE', 'ACCESSOIRES', 'SONSTIGES'],
      erfolg: '',
      fehler: '',
      isLoading: false
    }
  },
  computed: {
    istBearbeitung() {
      return this.id !== null
    }
  },
  async created() {
    if (this.istBearbeitung) {
      await this.ladeKleidungsstueck()
    }
  },
  methods: {
    async ladeKleidungsstueck() {
      this.isLoading = true
      try {
        const response = await axios.get(`/api/kleidung/${this.id}`)
        this.kleidungsstueck = response.data
      } catch (error) {
        this.fehler = 'Fehler beim Laden des Kleidungsstücks'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async speichern() {
      this.erfolg = ''
      this.fehler = ''

      try {
        if (this.istBearbeitung) {
          await axios.put(`/api/kleidung/${this.id}`, this.kleidungsstueck)
          this.erfolg = 'Kleidungsstück erfolgreich aktualisiert!'
        } else {
          await axios.post('/api/kleidung', this.kleidungsstueck)
          this.erfolg = 'Kleidungsstück erfolgreich erstellt!'
          this.kleidungsstueck = {
            bezeichnung: '',
            groesse: 'M',
            kategorie: 'HEMD',
            farbe: '',
            lagerbestand: 0,
            lager: '',
            beschreibung: ''
          }
        }

        // Nach 3 Sekunden Erfolgsmeldung ausblenden
        setTimeout(() => {
          this.erfolg = ''
        }, 3000)
      } catch (error) {
        this.fehler = error.response?.data?.message || 'Fehler beim Speichern'
        console.error(error)
      }
    }
  }
}
</script>
