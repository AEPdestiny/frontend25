<script setup lang="ts">

</script>

<template>

</template>

<style scoped>

</style>
<template>
  <div>
    <h1 class="mb-4">Willkommen, {{ benutzer.vorname }}!</h1>

    <div class="row">
      <!-- Statistik Karten -->
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Gesamtbestand</h5>
            <p class="card-text display-6">{{ statistik.gesamtLagerbestand }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card bg-warning text-white">
          <div class="card-body">
            <h5 class="card-title">Niedriger Bestand</h5>
            <p class="card-text display-6">{{ statistik.niedrigerLagerbestand.length }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card bg-danger text-white">
          <div class="card-body">
            <h5 class="card-title">Ausverkauft</h5>
            <p class="card-text display-6">{{ statistik.ausverkaufteArtikel }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Artikel insgesamt</h5>
            <p class="card-text display-6">{{ statistik.alleArtikel.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Artikel mit niedrigem Lagerbestand -->
    <div class="card mb-4">
      <div class="card-header bg-warning text-white">
        <h5>Artikel mit niedrigem Lagerbestand</h5>
      </div>
      <div class="card-body">
        <div v-if="statistik.niedrigerLagerbestand.length === 0" class="alert alert-info">
          Keine Artikel mit niedrigem Lagerbestand
        </div>
        <table v-else class="table">
          <thead>
          <tr>
            <th>Bezeichnung</th>
            <th>Größe</th>
            <th>Lagerbestand</th>
            <th>Aktion</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="artikel in statistik.niedrigerLagerbestand" :key="artikel.id">
            <td>{{ artikel.bezeichnung }}</td>
            <td>{{ artikel.groesse }}</td>
            <td>{{ artikel.lagerbestand }}</td>
            <td>
              <router-link :to="`/kleidung/bearbeiten/${artikel.id}`" class="btn btn-sm btn-outline-primary">
                Bearbeiten
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Schnellzugriffe -->
    <div class="d-flex justify-content-between mb-4">
      <router-link to="/kleidung/neu" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Neues Kleidungsstück
      </router-link>
      <router-link to="/kleidung" class="btn btn-outline-secondary">
        Alle Artikel anzeigen
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      benutzer: JSON.parse(localStorage.getItem('user')),
      statistik: {
        gesamtLagerbestand: 0,
        niedrigerLagerbestand: [],
        ausverkaufteArtikel: 0,
        alleArtikel: []
      }
    }
  },
  async created() {
    await this.ladeStatistik()
  },
  methods: {
    async ladeStatistik() {
      try {
        const response = await axios.get('/dashboard')
        this.statistik = response.data
      } catch (error) {
        console.error('Fehler beim Laden der Statistik:', error)
      }
    }
  }
}
</script>
