<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import NavBar from './components/NavBar/NavBar.vue';
import { useRoute } from 'vue-router';

function updateViewportClass() {
  if (window.innerWidth < 768) {
    document.documentElement.classList.add('mobile');
  } else {
    document.documentElement.classList.remove('mobile');
  }
}

const route = useRoute()

onMounted(() => {
  window.addEventListener('resize', updateViewportClass);
  updateViewportClass(); // Initial check
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportClass);
});
</script>

<template>
  <NavBar v-if="route.path !== '/about'" />
  <div class="view" :class="route.path === '/about' ? 'about-view' : ''">
    <RouterView />
  </div>
</template>

<style scoped>
.view {
  padding: 0.65rem;
  padding-top: 4rem;
  min-height: 100vh;
  min-width: 100vw;
}

.about-view {
  padding-top: 0.65rem;
}

html.mobile .view {}
</style>
