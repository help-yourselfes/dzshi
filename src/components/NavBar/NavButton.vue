<template>
  <RouterLink :to="to" class="nav-button">
    <span v-if="$slots.icon" class="nav-button__icon">
      <slot name="icon" />
    </span>
    <span class="nav-button__text">
      <slot />
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  to: RouteLocationRaw;
}>();
</script>

<style scoped>
.nav-button {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
    backdrop-filter: blur(2px);
    background: rgba(255, 255, 255, 0.5);
    width: max-content;
}

.nav-button:hover {
    backdrop-filter: blur(5px);
    /* background-color: #f0f0f0; */
}

.nav-button__icon {
    height: 100%;
    display: flex;
    align-items: center;
}

.nav-button__text {
    width: max-content;
}
</style>