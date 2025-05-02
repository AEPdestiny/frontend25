<script setup lang="ts">
import { ref, onMounted } from 'vue'

const kleidung = ref([])

onMounted(() => {
  fetch("/api/kleidung")
    .then(r => r.json())
    .then(d => (kleidung.value = d))
    .catch(e => console.error("Fehler beim Laden der Kleidung:", e))
})
</script>

<template>
  <div>
    <h2>Inventar</h2>
    <ul>
      <li v-for="k in kleidung" :key="k.id">
        {{ k.name }} (Lager: {{ k.lager }})
      </li>
    </ul>
  </div>
</template>
