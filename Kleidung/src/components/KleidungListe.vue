<script setup lang="ts">
import { ref, onMounted } from 'vue'

const kleidung = ref<{ id: number; [key: string]: unknown }[]>([])


onMounted(() => {
  fetch("http://localhost:8080/api/kleidung")
    .then(r => r.json())
    .then(d => (kleidung.value = d))
    .catch(e => console.error("Fehler beim Laden der Kleidung:", e))
})
</script>

<template>
  <div>
    <h2>Inventar</h2>
    <ul>
      <li v-for="item in kleidung" :key="item.id">
        {{ item.name }} (Größe: {{ item.groesse }}, Lager: {{ item.lager }})
      </li>
    </ul>
  </div>
</template>
