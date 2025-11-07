<template>
    <div class="day-button">
        <RouterLink :to="`/calls/${day.number}`">
            <div class="day-link" 
            :class="{'selected-day-link' : isSelected}"
            :key="day.number">
                {{ day.name }}
            </div>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { weekDayInfo } from '@/data/types';

const props = defineProps<{
    day: weekDayInfo,
    isSelected: boolean
}>()

</script>