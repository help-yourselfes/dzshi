<script setup lang="ts">
import AboutTool from '@/components/AboutTool.vue';
import NavBarChoices from '@/components/NavBar/NavBarChoices.vue';
import LogoIcon from '@/icons/LogoIcon.vue';
import TSIcon from '@/icons/tools/TSIcon.vue';
import ViteIcon from '@/icons/tools/ViteIcon.vue';
import VueIcon from '@/icons/tools/VueIcon.vue';

</script>

<template>
    <div class="title">
        <LogoIcon class="logo" />
        Небольшая статичная страничка с расписанием и домашними заданиями
    </div>
    <div class="links">
        <NavBarChoices />
    </div>

    <div class="tools">
        <AboutTool>
            Написана на
            <template #icon>
                <VueIcon /> Vue.js
            </template>
        </AboutTool>
        <AboutTool>
            с использованием
            <template #icon>
                <TSIcon /> TypeScript
            </template>
        </AboutTool>
        <AboutTool>
            и сборкой через
            <template #icon>
                <ViteIcon /> Vite
            </template>
        </AboutTool>
    </div>
</template>

<style>
.about-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.nav-button {
    padding: 1rem;
    background-color: lightgray;
}
</style>

<style scoped>
.logo {
    height: 5rem;
    margin-bottom: 1.5rem;
}

.title,
.tools {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    background-color: lightgrey;
    padding: 1.5rem;
    border-radius: 2rem;
    margin: 1rem;
    font-size: 1.5rem;
    text-align: center;
}

.links {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.tools {
    margin-top: 30%;
    font-size: 1rem;

    gap: 0.5rem;
}
</style>