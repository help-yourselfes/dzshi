<script setup lang="ts">
import IconText from '@/components/NavBar/IconText.vue';
import NavBarChoices from '@/components/NavBar/NavBarChoices.vue';
import LogoIcon from '@/icons/LogoIcon.vue';

</script>

<template>
        <div class="title">
            <LogoIcon />
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
</style>

<style scoped>
.title {
    display: flex;
    flex-direction: column;
}
</style>