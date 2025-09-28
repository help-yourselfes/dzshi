<template>
    <nav class="nav-bar">
        
        <AboutButton></AboutButton>

        <ViewSelector v-if="isMobile">
            <template #selected>
                
            </template>

            <template #values>
                <NavBarChoices />
            </template>
        </ViewSelector>
        <NavBarChoices v-else />
    </nav>
</template>

<script setup lang="ts">
import NavButton from './NavButton.vue';
import AboutButton from './AboutButton.vue'

import TasksIcon from '@/icons/TasksIcon.vue';
import CallsIcon from '@/icons/CallsIcon.vue';

import state from '@/store';
import ViewSelector from './ViewSelector.vue';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import NavBarChoices from './NavBarChoices.vue';

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
    padding: 0.5rem;
    backdrop-filter: blur(8px);
}
</style>
