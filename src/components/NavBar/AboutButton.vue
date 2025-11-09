<template>
    <RouterLink to="/about" class="about-button nav-button">
        <img src="/src/icons/dzshi/Logo 48x.png" />
    </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import LogoIcon from '@/icons/LogoIcon.vue';
</script>

<style scoped>
.about-button {
    height: 2rem;
    box-sizing: content-box;
    padding: 0.5rem;
    border-radius: 1rem;
    background: white;
}
.about-button__icon {
    height: 100%;
    fill: black
}
</style>