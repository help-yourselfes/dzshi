<script setup lang="ts">
import AboutTool from '@/components/AboutTool.vue';
import NavBarChoices from '@/components/NavBar/NavBarChoices.vue';
import LogoIcon from '@/icons/LogoIcon.vue';
import TSIcon from '@/icons/tools/TSIcon.vue';
import ViteIcon from '@/icons/tools/ViteIcon.vue';
import VueIcon from '@/icons/tools/VueIcon.vue';

</script>

<template>
    <div class="main-info">
        <div class="title">
            <LogoIcon class="logo" />
            Небольшая статичная<br />
            страничка с расписанием и<br />
            домашними заданиями
        </div>
    </div>
    <div class="add-info">
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
    </div>
</template>

<style>
.about-view {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4rem;


    .nav-button {
        padding: 0.5rem 1rem;   
        background-color: lightgray;
    }

    .nav-button:hover {
        scale: 1.05;
    }
}

html.mobile {
    .about-view {
        gap: 0;
        flex-direction: column;
    }
}
</style>

<style scoped>
.main-info,
.add-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

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
    font-size: 1rem;
    margin-top: 2rem;
    gap: 0.5rem;
}

html.mobile {
    .tools {
        margin-top: 30%;
    }
}
</style>