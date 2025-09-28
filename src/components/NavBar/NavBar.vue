<template>
    <nav class="nav-bar">

        <AboutButton></AboutButton>

        <ViewSelector v-if="isMobile">
            <template #selected>
                <TasksText v-if="path === '/'" />
                <CallsText v-else-if="path === '/calls'" />
            </template>

            <template #values>
                <NavBarChoices />
            </template>
        </ViewSelector>
        <NavBarChoices v-else />
    </nav>
</template>

<script setup lang="ts">
import AboutButton from './AboutButton.vue'

import state from '@/store';
import ViewSelector from './ViewSelector.vue';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import NavBarChoices from './NavBarChoices.vue';
import CallsText from './CallsText.vue';
import TasksText from './TasksText.vue';

const isMobile = computed(() => state.isMobile);
const route = useRoute()

watch(() => route.fullPath, (newPath) => {
    console.log('route changed to', newPath)
})

const path = computed(() => route.path);
</script>

<style scoped>
.nav-bar {
    position: fixed;
    top: 1rem;
    left: 1rem;
    height: 4rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    width: max-content;
}

html.mobile .nav-bar {
    overflow: visible;
    width: 100vw;
    top: 0;
    left: 0;
    padding:  1rem;
    backdrop-filter: blur(8px);
    justify-content: space-between;
}
</style>
