<template>
    <RouterLink :to="`/calls/${day.number}`" class="day-button">
        {{ day.name }}
        <Transition >
            <div v-if="isSelected" class="background" />
        </Transition>
    </RouterLink>
</template>

<script setup lang="ts">
import type { weekDayInfo } from '@/data/types';

defineProps<{
    day: weekDayInfo,
    isSelected: boolean
}>()

</script>

<style scoped>
.day-button {
    position: relative;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    /* background-color: var(--middle); */
    text-decoration: none;
    color: var(--text);
    z-index: 1;
    overflow: hidden;
}

.background{
    content: '';
    position: absolute;
    box-sizing: content-box;
    top: 0;
    left: -10rem;
    height: 100%;
    width: 100%;
    padding: 0 10rem;
    background: linear-gradient(80deg, var(--middle), var(--accent) 30%, var(--accent) 70%, var(--middle) 100%);
    z-index: -1;
    transition: all 300ms ease-in-out;
}

.v-enter-from {
    transform: translateX(-100%);
}
.v-leave-to {
    transform: translateX(100%);
}
.v-enter-active {
    transform-origin: left center;
    
}
.v-leave-active {
    transform-origin: right center;
}

.v-enter-active,
.v-leave-active {
    transition: all 300ms ease-out;
}
</style>