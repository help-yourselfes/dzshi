<template>
    <div class="day-select">
        Выбери день:
        <WaitASecond v-if="loading" />
        <ErrorBox v-else-if="error" :error />
        <div v-else class="day-list">
            <DayLink v-for="day in days" :day :is-selected="day.number === dayId" :key="day.number"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import DayLink from './DayLink.vue';
import WaitASecond from '@/components/primitives/Spinner/WaitASecond.vue';
import ErrorBox from '@/components/primitives/ErrorBox.vue';

defineProps<{
    dayId: number
}>();

const { data: days, error, loading } = useData(() => api.getAviableDays())
</script>

<style scoped>
.day-select {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
}

.day-list {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 1rem;
    background-color: var(--middle);
}
</style>