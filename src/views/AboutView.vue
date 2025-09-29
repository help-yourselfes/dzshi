<script setup lang="ts">
import IconText from '@/components/NavBar/IconText.vue';
import NavBarChoices from '@/components/NavBar/NavBarChoices.vue';
import LogoIcon from '@/icons/LogoIcon.vue';

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
        <p>
            Написана на Vue.js
        </p>
        <p>
            с использованием TypeScript
        </p>
        <p>
            и сборкой через Vite
        </p>
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

}
</style>