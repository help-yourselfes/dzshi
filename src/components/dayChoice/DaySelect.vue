<template>
    <div class="days-container">
        <DayButton v-for="day in days" :day="day" :key="day.number" :selected="selectedDay" @update="setDay" />
    </div>
</template>

<script setup lang="ts">
import api from '@/data/functions/Api';
import type { dayInfo } from '@/data/types';
import { onMounted, ref, watch } from 'vue';
import DayButton from './DayButton.vue';

const props = defineProps({
    selectedDayId: {
        required: true,
        type: Number
    }
})

const days = ref<dayInfo[]>();
const selectedDayId = ref<number>(props.selectedDayId);
const selectedDay = ref<dayInfo>();

const getDays = async () => {
    days.value = await api.getAviableDays();
    if (!selectedDay.value) {
        selectedDay.value = days.value.find(d => d.number === props.selectedDayId)
    }
}

const setDay = (newDayId: number) => {
    if (!days.value) return
    const day = days.value.find(d => d.number === newDayId);
    if (day) selectedDay.value = day
}

onMounted(() => {
    setDay(props.selectedDayId)
    getDays();
})
watch(() => selectedDayId, (newDayId) => {
    if (!days.value) return
    const day = days.value.find(d => d.number === newDayId.value)
    if (day) selectedDay.value = day
})

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