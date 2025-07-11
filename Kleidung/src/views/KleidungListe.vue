<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Kleidungsstücke</h1>
      <router-link to="/kleidung/neu" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Neu
      </router-link>
    </div>

    <!-- Such- und Filterfunktionen -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Suche nach Bezeichnung, Farbe oder Beschreibung..."
              v-model="suche"
              @input="filterKleidung"
            >
          </div>
          <div class="col-md-3 mb-3">
            <select class="form-select" v-model="groesse" @change="filterKleidung">
              <option value="">Alle Größen</option>
              <option v-for="g in groessen" :value="g" :key="g">{{ g }}</option>
            </select>
          </div>
          <div class="col-md-3 mb-3">
            <select class="form-select" v-model="kategorie" @change="filterKleidung">
              <option value="">Alle Kategorien</option>
              <option v-for="k in kategorien" :value="k" :key="k">{{ k }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Kleidungsliste -->
    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Laden...</span>
      </div>
    </div>

    <div v-else-if="gefilterteKleidung.length === 0" class="alert alert-info">
      Keine Kleidungsstücke gefunden
    </div>

    <div v-else class="row">
      <div class="col-md-6 col-lg-4 mb-4" v-for="item in gefilterteKleidung" :key="item.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ item.bezeichnung }}</h5>
            <p class="card-text text-muted">{{ item.beschreibung }}</p>

            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item d-flex justify-content-between">
                <span>Größe:</span>
                <span class="fw-bold">{{ item.groesse }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Kategorie:</span>
                <span class="fw-bold">{{ item.kategorie }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Lagerbestand:</span>
                <span :class="{'text-danger': item.lagerbestand === 0, 'text-warning': item.lagerbestand <= 5}">
                  {{ item.lagerbestand }}
                </span>
              </li>
            </ul>

            <div class="d-flex justify-content-between">
              <router-link :to="`/kleidung/bearbeiten/${item.id}`" class="btn btn-sm btn-outline-primary">
                Bearbeiten
              </router-link>
              <button @click="loescheKleidung(item.id)" class="btn btn-sm btn-outline-danger">
                Löschen
              </button>
            </div>
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
      kleidung: [],
      gefilterteKleidung: [],
      isLoading: true,
      suche: '',
      groesse: '',
      kategorie: '',
      groessen: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      kategorien: ['HEMD', 'HOSE', 'KLEID', 'JACKE', 'SCHUHE', 'ACCESSOIRES', 'SONSTIGES']
    }
  },
  async created() {
    await this.ladeKleidung()
  },
  methods: {
    async ladeKleidung() {
      try {
        const response = await axios.get('/api/kleidung')
        this.kleidung = response.data
        this.gefilterteKleidung = [...this.kleidung]
      } catch (error) {
        console.error('Fehler beim Laden der Kleidung:', error)
      } finally {
        this.isLoading = false
      }
    },
    filterKleidung() {
      this.gefilterteKleidung = this.kleidung.filter(item => {
        const matchesSuche = !this.suche ||
          item.bezeichnung.toLowerCase().includes(this.suche.toLowerCase()) ||
          (item.beschreibung && item.beschreibung.toLowerCase().includes(this.suche.toLowerCase())) ||
          (item.farbe && item.farbe.toLowerCase().includes(this.suche.toLowerCase()))

        const matchesGroesse = !this.groesse || item.groesse === this.groesse
        const matchesKategorie = !this.kategorie || item.kategorie === this.kategorie

        return matchesSuche && matchesGroesse && matchesKategorie
      })
    },
    async loescheKleidung(id) {
      if (confirm('Möchten Sie dieses Kleidungsstück wirklich löschen?')) {
        try {
          await axios.delete(`/api/kleidung/${id}`)
          this.kleidung = this.kleidung.filter(item => item.id !== id)
          this.filterKleidung()
        } catch (error) {
          console.error('Fehler beim Löschen:', error)
        }
      }
    }
  }
}
</script>
