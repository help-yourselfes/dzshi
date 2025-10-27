<template>
    <nav class="nav-bar">

        <AboutButton></AboutButton>

        <PropsSelect v-if="isMobile" :choices="choices" @change="onViewChange" />
        <Container v-else>
            <NavButton v-for="page in pages" :to="page.path" :key="page.path">
                <component :is="page.component" />
            </NavButton>
        </Container>
    </nav>
</template>

<script setup lang="ts">
import AboutButton from './AboutButton.vue'

import state from '@/store';
import { useRoute } from 'vue-router';
import { computed, watch, type Component } from 'vue';
import CallsText from './CallsText.vue';
import TasksText from './TasksText.vue';
import Container from '../primitives/Container.vue';
import NavButton from './NavButton.vue';
import router from '@/router';
import PropsSelect from '../primitives/selects/PropsSelect.vue';
import SlotsSelect from '../primitives/selects/SlotsSelect.vue';
import IconText from './IconText.vue';
import CallsIcon from '@/icons/CallsIcon.vue';
const route = useRoute()
const isMobile = computed(() => state.isMobile);

const pages: { component: Component, path: string }[] = [
    {
        component: CallsText,
        path: '/calls'
    },
    {
        component: TasksText,
        path: '/'
    }
]
const choices = computed(() => pages.map(v => v.component))

const onViewChange = (newChoice: Component) => {
    const n = pages.find(v => v.component === newChoice);
    if (!n) return;
    const path = n.path;
    router.push({ path })
}


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
