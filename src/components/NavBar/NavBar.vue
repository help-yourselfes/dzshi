<template>
    <nav class="nav-bar">

        <AboutButton></AboutButton>

        <ViewSelector v-if="isMobile" :choices @change="onViewChange" />
        <Container v-else>
            <NavButton v-for="choice in choices" :to="choice.to" :key="choice.to">
                <component :is="choice.component" />
            </NavButton>
        </Container>
    </nav>
</template>

<script setup lang="ts">
import AboutButton from './AboutButton.vue'

import state from '@/store';
import ViewSelector from './ViewSelector.vue';
import { useRoute } from 'vue-router';
import { computed, shallowRef, watch } from 'vue';
import CallsText from './CallsText.vue';
import TasksText from './TasksText.vue';
import Container from '../primitives/Container.vue';
import NavButton from './NavButton.vue';
import type { choice } from '@/data/types';
import router from '@/router';

const choices = shallowRef<choice[]>([
    {
        to: 'calls', component: CallsText,
    },
    {
        to: 'tasks', component: TasksText
    }
]);

const onViewChange = (newChoice: choice) => {
    router.push({ path: newChoice.to})
}

const isMobile = computed(() => state.isMobile);
const route = useRoute()

watch(() => route.path, (newPath) => {
    console.log('route changed to', newPath)
})
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
    box-shadow: 0 0 0 0 black;
}

html.mobile .nav-bar {
    overflow: visible;
    width: 100vw;
    top: 0;
    left: 0;
    padding: 1rem;
    padding-left: 0.5rem;
    backdrop-filter: blur(8px);
    justify-content: space-between;
}

.back-button {
    color: black;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    width: 100%;
}
</style>
