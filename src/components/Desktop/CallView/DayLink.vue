<template>
    <RouterLink :to="`/calls/${day.number}`" class="day-button" :class="{ 'selected': isSelected }">
        {{ day.name }}
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
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background-color: var(--middle);
    text-decoration: none;
    color: var(--text);
}

.selected {
    background-color: var(--accent);
    
}
</style>