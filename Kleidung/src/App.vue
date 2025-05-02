<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>
    <img
      alt="LagerLogistics logo"
      class="logo"
      src="./assets/LagerLogisticsLogoOhneHintergrun.png"
    />
    <div class="wrapper">
      <HelloWorld msg="Geschafft!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/suche">Suche</RouterLink>
        <RouterLink to="/kleidung">Kleidung</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

</template>
