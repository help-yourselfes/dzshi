<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue';
import TSIcon from '@/icons/tools/TSIcon.vue';
import ViteIcon from '@/icons/tools/ViteIcon.vue';
import VueIcon from '@/icons/tools/VueIcon.vue';

</script>

<template>
    <div class="info-block">
        <LogoIcon />
        <p class="description">
            Небольшая статичная
            страничка с расписанием и
            домашними заданиями
        </p>
    </div>
    <div class="tools-block">
        <p class="tool">
            Написана на <span class="vuejs">
                <VueIcon class="tool-icon" />
                Vue.js
            </span>
        </p>
        <p class="tool">
            с использованием <span class="ts">
                <TSIcon class="tool-icon" />
                TypeScript
            </span>
        </p>
        <p class="tool">
            и сборкой через <span class="vite">
                <ViteIcon class="tool-icon" />
                Vite
            </span>
        </p>
    </div>
</template>

<style>
.view {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;

    gap: 2.25rem;
}

.info-block {
    .logo {
        height: 6.75rem;
    }

    .logo-picture {
        fill: var(--accent)
    }

    .logo-text {
        fill: var(--text)
    }
}
</style>

<style scoped>
.info-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--middle);
    padding: 2rem;
    border-radius: 2rem;
    width: min-content;
}


.description {
    text-align: center;
}

.tools-block {
    width: max-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.tool {
    display: inline-flex;
    gap: 0.5rem;

    span {
        display: inline-flex;
        gap: 0.25rem;
    }
}

.tool-icon {
    height: 1.5rem;
}

.vuejs {
    color: #41B883;
}

.ts {
    color: #3178C6;
}

.vite {
    color: #9862FE;
}
</style>