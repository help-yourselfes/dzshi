<template>
    <div class="days-container">
        <DayButton v-for="day in days" :day="day" :key="day.number" :selected="selectedDay" @update="setDay"/>
    </div>
</template>

<script setup lang="ts">
import api from '@/data/functions/Api';
import type { dayInfo } from '@/data/types';
import { onMounted, ref } from 'vue';
import DayButton from './DayButton.vue';

const days = ref<dayInfo[]>();
const selectedDay = ref<dayInfo>();

const getDays = async () => {
    days.value = await api.getAviableDays();
    if (!selectedDay.value) {
        selectedDay.value = days.value[0]
    }
}

const setDay = (newDayId: number) => {
    if (!days.value) return
    selectedDay.value = days.value.find(d => d.number === newDayId);
}

onMounted(() => {
    getDays();
})

</script>

<style scoped>
.days-container {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
}

html.mobile {
    .days-container {
        width: 100%;
        justify-content: space-around  ;
    }
}
</style>