<template>
    <div v-if="_days.loading.value">
        <Spinner />
    </div>
    <div v-if="_days.error.value">
        <ErrorBox :error="_days.error" />
    </div>
    <div class="days-container" v-else>
        <DayButton v-for="day in _days.data.value" :day="day" :key="day.number"
            :isSelected=" selectedDayId === day.number"/>
    </div>
</template>

<script setup lang="ts">
import api from '@/data/functions/Api';
import DayButton from './DayButton.vue';
import useData from '@/data/functions/useData';
import Spinner from '../primitives/Spinner/Spinner.vue';
import ErrorBox from '../primitives/ErrorBox.vue';

const props = defineProps<{
    selectedDayId: number
}>()

const _days = useData(() => api.getAviableDays());

</script>

<style scoped>
.days-container {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    overflow-x: scroll;
    gap: 0.5rem;
}

html.mobile {
    .days-container {
        width: 100%;
        justify-content: space-around;
    }
}
</style>