<template>
    <RouterLink class="day-button" :class="isSelected ? 'current' : ''" :to="`/calls/${day.number}`" @click="handleClick">
        {{ isSelected ? fullName : shortName }}
    </RouterLink>
</template>
<script setup lang="ts">
import type { weekDayInfo } from '@/data/types';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    day: weekDayInfo,
    isSelected: boolean
}>()

const emit = defineEmits<{
    update: [newDayId: number]
}>();

const handleClick = () => {
    emit("update", props.day.number)
}

const shortName = computed(() => props.day['short-name'])
const fullName = computed(() => props.day.name)

</script>

<style scoped>
.day-button {
    text-decoration: none;
    transition: all 300ms;
    border-radius: 999px;
    color: var(--light);
    font-weight: var(--f_light);
    cursor: pointer;
    padding: 0 0.75rem;
}

.current {
    font-weight: var(--f_bold);
    background-color: var(--top);
    color: var(--text);
    height: 3rem;
    display: inline-flex;
    padding: 0 2rem;
    align-items: center;
}
</style>