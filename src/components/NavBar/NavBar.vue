<template>
    <nav class="nav-bar" :class="isMobile ? 'mobile' : 'desktop'">


        <RouterLink to="/about" class="about-button">
            <LogoIcon v-if="isMobile" class="logo-svg" />
            <img src="/src/icons/dzshi/Logo 48x.png" class="logo-img" v-else />
        </RouterLink>

        <PropsSelect v-if="isMobile" :choices="choices" @change="onViewChange">
            <template v-slot:choice>
                <component :is="currentView" />
            </template>
            <template v-slot>
                <component v-for="page in pages" :is="page.component" />
            </template>
        </PropsSelect>
        <Container v-else>
            <NavButton v-for="page in pages" :to="page.path[0]" :key="page.path[0]">
                <component :is="page.component" />
            </NavButton>
        </Container>
    </nav>
</template>

<script setup lang="ts">
import state from '@/store';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, watch, type Component } from 'vue';
import CallsText from './CallsText.vue';
import TasksText from './TasksText.vue';
import Container from '../primitives/Container.vue';
import NavButton from './NavButton.vue';
import router from '@/router';
import PropsSelect from '../primitives/selects/PropsSelect.vue';
import LogoIcon from '@/icons/LogoIcon.vue';
const route = useRoute()
const isMobile = computed(() => state.isMobile);

const pages: { component: Component, path: string[] }[] = [
    {
        component: CallsText,
        path: ['/calls']
    },
    {
        component: TasksText,
        path: ['/', '/tasks']
    }
]
const choices = computed(() => pages.map(v => v.component))
const currentViewId = ref(0);
const currentView = computed(() => choices.value[currentViewId.value])

const onViewChange = (newChoice: Component) => {
    const index = pages.findIndex(v => v.component === newChoice);
    if (index === -1) return;
    const n = pages[index];
    currentViewId.value = index;
    const path = n.path[0];
    router.push({ path })
}

const updateView = () => {
    const newPath = route.path.split('/').splice(-1,1)[0];
    const index = pages.findIndex(v => v.path.includes( '/'+newPath));
    if (index === -1) return;
    currentViewId.value = index;
}
onMounted(updateView)
watch(() => route.path, updateView)
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


.nav-bar.desktop {
    background: var(--middle-back);
    border-radius: 1rem;
    gap: 0.5rem;
    padding-right: 0.75rem;
}

.nav-bar.mobile {
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

.about-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 1rem;
    background: var(--middle);
}

.about-button__icon {
    height: 100%;
    fill: black
}

.logo-svg {
    fill: var(--text);
    height: 2rem;
}
</style>
