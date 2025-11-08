<!-- 
    have not implement
    calendar yet    :(
-->
<template>
    <div class="component">
        <span class="header">
            Выбранный день: <span class="selected-day">
                {{ dayName }}, {{ date.day }}
            </span>
        </span>
        <div class="body">
            <div class="option">
                <div class="dot custom"></div>
                <div class="date-select">
                    <span class="day"> {{ date.day }}</span>
                    <span class="month-name"> {{ date.month }}</span>
                    <span class="year"> {{ date.year }}</span>
                </div>
            </div>
            <div class="option">
                <div class="dot tommorow"></div>
                <div class="option-description">
                    Завтра
                    <span class="date-text"><DateText :date="tomorrowD"/></span>
                </div>
            </div>
            <div class="option">
                <div class="dot after-tommorow"></div>
                <div class="option-description">
                    Послезавтра 
                    <span class="date-text"><DateText :date="afterTomorrowD"/></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DateText from '@/components/primitives/DateText.vue';
import api from '@/data/functions/Api';
import { getDayName } from '@/data/functions/time';
import type { date } from '@/data/types';
import { computed } from 'vue';

const props = defineProps<{
    date: date
}>()

const dayName = computed(() => getDayName(api.getDateDayId(props.date)))

const tomorrowD = computed<date>(() => ({ day: 9, month: 11, year: 2025}))
const afterTomorrowD = computed<date>(() => ({ day: 10, month: 11, year: 2025}))
</script>

<style scoped>
.dot{
    content: '';
    height: 0.5rem;
    aspect-ratio: 1;
    background-color: var(--input);
    border-radius: 100%;
}
</style>