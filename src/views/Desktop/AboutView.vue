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
    <div class="tools-container">
        <p class="tool">
            Написана на <span class="vuejs">
                <VueIcon />
                Vue.js
            </span>
        </p>
        <p class="tool">
            с использованием <span class="ts">
                <TSIcon />
                TypeScript
            </span>
        </p>
        <p class="tool">
            и сборкой через <span class="vite">
                <ViteIcon />
                Vite
            </span>
        </p>
    </div>
</template>

<style>
.info-block {
    background-color: var(--middle);

    .logo-picture {
        fill: var(--accent)
    }

    .logo-text {
        fill: var(--text)
    }
}
</style>

<style scoped></style>