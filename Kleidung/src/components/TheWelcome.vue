<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Dokumentation</template>

    Die <a href="https://vuejs.org/" target="_blank" rel="noopener">offizielle Dokumentation</a> von Vue bietet Ihnen
    alle Informationen, die Sie benötigen, um loszulegen.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Werkzeugunterstützung</template>


    Dieses Projekt wird mit <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>
    bereitgestellt und gebündelt. Die empfohlene IDE-Konfiguration ist
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>.
    Wenn Sie Ihre Komponenten und Webseiten testen müssen, schauen Sie sich
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> und
    <a href="https://on.cypress.io/component" target="_blank" rel="noopener"
    >Cypress Component Testing</a> an.
    <br> Weitere Anweisungen finden Sie in der <code>README.md</code>.

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Holen Sie sich offizielle Werkzeuge und Bibliotheken für Ihr Projekt:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, und
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>.
    Wenn Sie weitere Ressourcen benötigen, empfehlen wir einen Besuch bei
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Stecken geblieben? Stellen Sie Ihre Frage auf
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, unserem offiziellen Discord-Server,
    oder auf
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>.
    Sie sollten auch unseren <a href="https://news.vuejs.org" target="_blank" rel="noopener">E-Mail-Newsletter</a>
    abonnieren und dem offiziellen
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>-Twitter-Account folgen,
    um die neuesten Nachrichten aus der Vue-Welt zu erhalten.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    Als unabhängiges Projekt ist Vue auf die Unterstützung der Gemeinschaft angewiesen, um nachhaltig zu sein.
    Sie können uns unterstützen, indem Sie
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">Sponsor werden</a>.
  </WelcomeItem>
</template>
