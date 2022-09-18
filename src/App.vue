<template>
  <Top />
  <router-view v-slot="{ Component, route }">
    <transition name="opac" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import Top from './components/Top.vue';
</script>

<style lang="scss">
html {
  height: 100%;
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  @extend %scroll
}

#app {
  max-width: 145rem;
  margin: 0 auto;

  img {
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
  }
}

.opac-enter-active,
.opac-leave-active {
  transition: opacity 0.2s ease;
}

.opac-enter-from,
.opac-leave-to {
  opacity: 0;
}
</style>