<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue';
import NavButton from './NavButton.vue';

</script>

<template>
    <nav class="nav-bar">
        <LogoIcon />
        <NavButton to="/">Домашка</NavButton>
        <NavButton to="/calls">Звонки</NavButton>
        <NavButton to="/timetable">Уроки</NavButton>
        <NavButton to="/about">Че это</NavButton>
    </nav>
</template>

<style scoped>
.nav-bar {
    position: fixed;
    top: 1rem;
    left: 1rem;

    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    width: max-content;
}

html.mobile .nav-bar {
    overflow-x: scroll;
    width: 100vw;
    top: 0;
    left: 0;
    padding: 0.5rem;
    backdrop-filter: blur(8px);
}
</style>
