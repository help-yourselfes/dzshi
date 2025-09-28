<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import NavBar from './components/NavBar.vue';

function updateViewportClass() {
  if (window.innerWidth < 700) {
    document.documentElement.classList.add('mobile');
  } else {
    document.documentElement.classList.remove('mobile');
  }
}

onMounted(() => {
  window.addEventListener('resize', updateViewportClass);
  updateViewportClass(); // Initial check
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportClass);
});
</script>

<template>
  <NavBar />
  <div class="view">
    <RouterView />
  </div>
</template>

<style scoped>
.view {
  padding: 0.65rem;
  padding-top: 3rem;
  min-height: 100vh;
  min-width: 100vw;
}

html.mobile .view {}
</style>
